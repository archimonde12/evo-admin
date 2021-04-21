import { IndexSpecification, ObjectId } from "mongodb";
import { AUTH_CONFIG } from "../config"
/**
 * @username
 * @slug
 * @hashedPassword
 * @email
 * @twoFASecret
 * @ipAddress
 * @refBy
 * @createdAt
 */
export interface TempAccount {
    username: string
    slug: string
    hashedPassword: string
    email: {
        address: string
    }
    ipAddress?: string
    refBy?: string,
    createdAt: Date
}

export interface TempAccountInMongo {
    _id: ObjectId
    username: string
    slug: string
    hashedPassword: string
    email: {
        address: string
    }
    ipAddress?: string
    refBy?: string,
    createdAt: Date
}


export const TempAccountIndexes: IndexSpecification[] = [
    { key: { slug: 1 }, unique: true, background: true },
    { key: { "email.address": 1 }, background: true },
    { key: { slug: 1, "email.address": 1 }, background: true },
    { key: { createdAt: 1 }, expireAfterSeconds: AUTH_CONFIG.JWT.VERIFY_EMAIL_EXPIRATION }
]