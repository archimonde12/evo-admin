export enum TxType {
    transfer = "transfer",
    receiveTransfer = "receive-transfer",
    deposit = "deposit",
    withdraw = "withdraw",
    convertFrom = "convertFrom",
    convertTo = "convertTo",
    commission = "commission",
    depositPromotion="depositPromotion"
}


import { Double, IndexSpecification, ObjectID } from "mongodb";
/**
 * @slug unique name each user
 * @amount amount of transaction
 * @fee fee of transaction
 * @coin coin code
 * @action
 * @id using for tracing
 * @refId using for link transaction
 * @time when transaction success
 */
export interface Tx {
    slug: string
    sender: string
    receiver: string
    amount: Double
    fee: number
    amountWithFee: Double
    coin: string
    action: TxType
    id: string
    refId: string
    status?: string
    time: Date
    withdrawTxid?: string
    depositTxid?: string
}
/**
 * @_id unique objectID in mongo
 * @slug unique name each user
 * @amount amount of transaction
 * @fee fee of transaction
 * @coin coin code
 * @action
 * @id using for tracing
 * @refId using for link transaction
 * @time when transaction success
 */
export interface TxInMongo {
    _id: ObjectID
    slug: string
    sender: string
    receiver: string
    amount: number
    fee: number
    amountWithFee: number
    coin: string
    action: TxType
    id: string
    refId: string
    status?: string
    time: Date
    withdrawTxid?: string
    depositTxid?: string
}


export const TxIndexes: IndexSpecification[] = [
    { key: { slug: 1 }, background: true },
    { key: { action: 1 }, background: true },
    { key: { client: 1 }, background: true },
    { key: { slug: 1, client: 1 }, background: true },
    { key: { id: 1 }, background: true },
    { key: { time: 1 }, background: true },
]