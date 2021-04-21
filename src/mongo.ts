import { Collection, connect, MongoClient } from "mongodb";
import { errorConsoleLog, successConsoleLog } from "./color-log";
import { MONGO_URI } from "./config";
import { AccountIndexes } from "./models/Account";
// import { ConvertHistoryIndexes } from "./models/ConvertHistory";
// import { TempAccountIndexes } from "./models/TempAccount";
// import { TxIndexes, TxInMongo } from "./models/TX";
export let accounts: Collection
export let requestLogs: Collection
export let TXs: Collection
export let winners: Collection
export let convertHistories: Collection
export let brickMessages: Collection
export let tempAccounts: Collection
export let betDetails: Collection

let mongo: MongoClient

const collections = {
    accounts: 'accounts',
    requestLogs: 'requestLogs',
    TXs: 'TXs',
    winners: 'winners',
    convertHistories: 'convertHistories',
    brickMessages: 'brickMessages',
    tempAccounts: 'tempAccounts',
    betDetails: 'betDetails',
}

const connectMongo = async () => {
    try {
        mongo = await connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            ignoreUndefined: true // find: {xxx: {$exists: false}}
        })

        mongo.on('error', async (e) => {
            try {
                await mongo.close()
                await connectMongo()
            } catch (e) {
                setTimeout(connectMongo, 1000)
                throw e
            }
        })

        mongo.on('timeout', async () => {
            try {
                await mongo.close()
                await connectMongo()
            } catch (e) {
                setTimeout(connectMongo, 1000)
                throw e
            }
        })

        mongo.on('close', async () => {
            try {
                await connectMongo()
            } catch (e) {
                throw e
            }
        })

        const db = mongo.db()
        accounts = db.collection(collections.accounts)
        requestLogs = db.collection(collections.requestLogs)
        winners = db.collection(collections.winners)
        TXs = db.collection(collections.TXs)
        convertHistories = db.collection(collections.convertHistories)
        brickMessages = db.collection(collections.brickMessages)
        tempAccounts = db.collection(collections.tempAccounts)
        betDetails=db.collection(collections.betDetails)
        await Promise.all([
            accounts.createIndexes(AccountIndexes),
            // TXs.createIndexes(TxIndexes),
            // convertHistories.createIndexes(ConvertHistoryIndexes),
            // tempAccounts.createIndexes(TempAccountIndexes)
        ])

        successConsoleLog(`🚀 mongodb: connected`)
    } catch (e) {
        errorConsoleLog(`mongodb: disconnected`)
        await mongo?.close(true)
        setTimeout(connectMongo, 1000)
        throw e
    }
}

export {
    mongo,
    connectMongo,
    collections
}