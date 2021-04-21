import { Double, IndexSpecification, ObjectId } from "mongodb";

export enum Language {
    en = 'en',
    vi = 'vi'
}

export const Languages = Object.keys(Language)

export enum Coin {
    usdt = 'usdt',
    eur = 'eur',
    trx = 'trx'
}

export enum Status {
    suspended = "suspended",
    active = "active",
    not_active = "not_active"
}

export const Coins = Object.keys(Coin)

export type Asset = {
    balance: Double
    address?: string,
    hashedPrivateKey?: {
        iv: string
        encrypted: string
    }
}

export type RecentGame = {
    tableId: string,
    gameType: string,
    updatedAt: Date
}

export type Lock={
    id: string
    status: boolean
    duration?: number
    lockDate: number
    lockReason?: string
    lockByAdmin: string
    lockWithdraw?:Boolean
    lockTransfer?:Boolean
    lockConvert?:Boolean
    unlockDate?: Date
    unlockReason?: string
    unlockByAdmin?: string
}

/**
 * @username
 * @slug
 * @hashedPassword
 * @assets
 */
export interface Account {
    username: string
    slug: string
    hashedPassword: string
    verify: number
    email: {
        address: string
        verifiedAt?: Date
    }
    phone?: {
        number: string
        verifiedAt: Date
    }
    isTwoFA: boolean
    twoFASecret?: string
    ipAddress?: string
    avatar?: string
    refBy?: string
    language: Language
    region?: string
    timezone?: string
    lastLogin?: Date
    social?: {
        telegram: { id: string } | null
        facebook: { userID: string } | null
        google: { email: string } | null
    }

    lock?: Lock
    status?: string
    // assets: {
    //     usdt: Asset
    //     eur: Asset
    // }
    createdAt: Date
    updateAt?: Date
    activeInTableId: string | null
    avatarUri: string
    lastTableId?: string
    lastGameType?: string
    recentGames: RecentGame[]
}

export interface AccountInMongo {
    _id: ObjectId
    username: string
    slug: string
    hashedPassword: string
    verify: number
    email: {
        address: string
        verifiedAt?: Date
    }
    phone?: {
        number: string
        verifiedAt: Date
    }
    isTwoFA: boolean
    twoFASecret?: string
    ipAddress?: string
    avatar?: string
    refBy?: string
    language: Language
    region?: string
    timezone?: string
    lastLogin?: Date
    social?: {
        telegram: { id: string } | null
        facebook: { userID: string } | null
        google: { email: string } | null
    }
    status?: string
    lock?: Lock

    // assets: {
    //     usdt: Asset
    //     eur: Asset
    // }
    createdAt: Date
    updateAt?: Date
    activeInTableId: string | null
    avatarUri: string
    lastTableId?: string
    lastGameType?: string
    recentGames: RecentGame[]
}

/**
 * @link https://spadebrick.uat1.evo-test.com/api/userauthentication/docs/v2/protocol.html
 */

export type EvoAuthPlayer = {
    id: string
    update: boolean
    firstName?: string
    lastName?: string
    nickname?: string
    country: string
    language: string
    currency: string
    session: {
        id: string
        ip: string
    }
    group?: {
        id?: string
        action: string
    }
}

export type EvoAuthConfig = {
    brand?: {
        id?: string
        skin?: string
    }
    game?: {
        category: string
        interface?: string
        table?: {
            id: string
            seat?: number
        }
    }
    channel: {
        wrapped: boolean
        mobile?: boolean
    }
    urls?: {
        cashier?: string
        responsibleGaming?: string
        lobby?: string
        sessionTimeout?: string
        gameHistory?: string
        realityCheckURL?: string
        rngGoLiveURL?: string
        rngGoLiveURLMobile?: string
        rngLobbyButton?: string
        rngCloseButton?: string
        rngHomeButton?: string
        rngSessionTimeout?: string
        rngErrorHandling?: string
        sweSelfTest?: string
        sweGameLimits?: string
        sweSelfExclusion?: string
    }
    freeGames?: boolean
}

/**
 * User authentication request body must be sent in following format:
 * @uuid Unique request id, that identifies concrete user authentication request (attempt)
 * @player  Object containing player details. 
 * @config Object containing game launch configuration options.
 */
export interface EvoAccount {
    uuid: string
    player: EvoAuthPlayer
    config: EvoAuthConfig
}

export interface EvoAccountSimple {
    uuid: string //Unique request id, that identifies concrete user authentication request (attempt).
    player: { //Object containing player details.
        id: string //Player’s ID. Unique identifier of a player, assigned by Licensee.
        update: boolean //Indicates if player details should be updated. True if system is asked to update player records. False if player data is relevant for current session only. Updates firstName, lastName, nickname, country, language values.
        country: string //Player’s country code (ISO 3166, 2 letter code)
        language: string //Player’s preferred language (ISO 639-1, 2 letter code)
        currency: string //Player’s currency (ISO 4217, 3 letter code)
        session: { //Object containing player session details.
            id: string //Player’s session ID, assigned by Licensee.
            ip: string //Player’s session IP address. Both IPv4 and IPv6 are acceptable formats.
        }
    }
    config: { //Object containing game launch configuration options.
        channel: { //Object containing game channel configuration options.
            wrapped: boolean //Specifies if client is wrapped or standalone. Should only be sent as true for standalone native or mobile apps.
        }
    }
}


export const AccountIndexes: IndexSpecification[] = [
    { key: { slug: 1 }, unique: true, background: true },
    { key: { verify: 1 }, background: true },
    { key: { "email.address": 1 }, unique: true, partialFilterExpression: { "email.address": { $exists: true } }, background: true },
    { key: { "phone.number": 1 }, unique: true, partialFilterExpression: { "phone.number": { $exists: true } }, background: true },
    { key: { "social.facebook.userID": 1 }, unique: true, partialFilterExpression: { "social.facebook.userID": { $exists: true } }, background: true },
    { key: { "social.google.email": 1 }, unique: true, partialFilterExpression: { "social.google.email": { $exists: true } }, background: true },
    { key: { "social.telegram.id": 1 }, unique: true, partialFilterExpression: { "social.telegram.id": { $exists: true } }, background: true },
    { key: { kyc: 1 }, partialFilterExpression: { phone: { $exists: true } }, background: true },
    { key: { refBy: 1 }, background: true },
    { key: { "lock.id": 1 }, partialFilterExpression: { "lock.id": { $exists: true }, background: true } },
    { key: { createdAt: 1 }, background: true },
    { key: { "email.verifiedAt": -1 }, background: true },
    { key: { "status": 1 }, background: true }
]