import { IndexSpecification, ObjectId } from "mongodb";
import { Game } from "./EVORequests";

type BetDetail = {
    slug: string
    username: string
    avatarUri: String
    game: Game
    refId: string
    profit:number
    betAmount:number
    currency: string
    createdAt: Date
}

type BetDetailInMongo = {
    _id: ObjectId
    slug: string
    username: string
    avatarUri: String
    game: Game
    refId: string
    profit:number
    betAmount:number
    currency: string
    createdAt: Date
}

const BetDetailIndexes: IndexSpecification[] = [
    { key: { slug: 1 }, background: true },
    { key: { profit: 1 }, background: true },
    { key: { createdAt: -1 }, background: true }, 
]

export { BetDetail, BetDetailInMongo,BetDetailIndexes}