import { ObjectID } from "bson";
import { IndexSpecification } from "mongodb";
import { Coin } from "./Account";

export type ConvertHistory = {
    uuid: string,
    userId: string,
    slug: string,
    from: Coin,
    to: Coin,
    rate: number,
    rateUpdatedAt: Date,
    amount: number,
    convertAmount: number,
    createdAt: Date,
    fee: number,
    debitTransactionId?:string
    creditTransactionId?:string
}

export type ConvertHistoryInMongo = {
    _id: ObjectID
    uuid: string
    userId: string,
    slug: string,
    from: Coin,
    to: Coin,
    rate: number,
    rateUpdatedAt: Date,
    amount: number,
    convertAmount: number,
    createdAt: Date,
    fee: number,
    debitTransactionId?:string
    creditTransactionId?:string
}

export const ConvertHistoryIndexes: IndexSpecification[] = [
    { key: { slug: 1 }, background: true },
    { key: { createdAt: -1 }, background: true },
    { key: { from: 1 }, background: true },
    { key: { to: 1 }, background: true },
    { key: { amount: 1 }, background: true },
]