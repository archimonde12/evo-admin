import { config } from "dotenv";

config()

//SERVER
if (!process.env.NODE_ENV) throw new Error(`NODE_ENV must be provided`)
if (!process.env.SERVER_NAME) throw new Error(`SEVER_NAME must be provided`)
if (!process.env.SERVER_CODE) throw new Error(`SERVER_CODE must be provided`)
export const SERVER_CONFIG = {
    ServerName:process.env.SERVER_NAME || 'evo-admin',
    ServerCode: process.env.SERVER_CODE || 'EAD',
    nodeEnv: process.env.NODE_ENV
}

//AUTH CONFIG 
if (!process.env.FORGOT_SECRET) throw new Error(`FORGOT_SECRET must be provided`)
const AUTH_CONFIG = {
    APP_SECRET: process.env.APP_SECRET || '4pp_s3cr3t',
    FORGOT_SECRET: process.env.FORGOT_SECRET,
    EMAIL_EXPIRE_TIME: Number(process.env.EMAIL_EXPIRE_TIME) || 86400,
    RESEND_EMAIL_PERIOD: Number(process.env.RESEND_EMAIL_PERIOD) || 180,
    JWT: {
        AUTH_EXPIRATION: parseInt(process.env.JWT_AUTH_EXPIRATION_SECONDS || '1296000'),
        VERIFY_EMAIL_EXPIRATION: parseInt(process.env.JWT_VERIFY_EMAIL_EXPIRATION_SECONDS || '10800'),
        RESET_PASSWORD_EXPIRATION: parseInt(process.env.JWT_RESET_PASSWORD_EXPIRATION_SECONDS || '300')
    }
}

//REDIS CONFIG
if (!process.env.REDIS_URI) throw new Error(`REDIS_URI must be provided`)
const REDIS_CONFIG = {
    URI: process.env.REDIS_URI
}

//COINGECKO CONFIG
if (!process.env.COINGECKO_URI) throw new Error(`COINGECKO_URI must be provided`)
export const COINGECKO_URI = process.env.COINGECKO_URI

//SENTRY CONFIG
if (!process.env.SENTRY_DNS) throw new Error(`SENTRY_DNS must be provided`)
const SENTRY_DNS = process.env.SENTRY_DNS
if (!process.env.SENTRY_SERVER_NAME) throw new Error(`SENTRY_SERVER_NAME must be provided`)
const SENTRY_SERVER_NAME = process.env.SENTRY_SERVER_NAME

//MONGO CONFIG
if (!process.env.MONGO_URI) throw new Error(`MONGO_URI must be provided`)
const MONGO_URI = process.env.MONGO_URI

//GRAPHQL CONFIG
if (!process.env.GRAPHQL_PORT) throw new Error(`GRAPHQL_PORT must be provided`)
const GRAPHQL_CONFIG = {
    port: process.env.GRAPHQL_PORT,
}

//KAFKA CONFIG
if (!process.env.EVO_KAFKA_CLIENT_ID) throw new Error(`EVO_KAFKA_CLIENT_ID must be provided`)
export const evoKafkaClientId = process.env.EVO_KAFKA_CLIENT_ID
if (!process.env.EVO_KAFKA_BROKERS?.split(',')?.length) throw new Error(`EVO_KAFKA_BROKERS must be provided`)
export const evoKafkaBrokers = process.env.EVO_KAFKA_BROKERS.split(',')
if (!process.env.EVO_KAFKA_GROUP_ID) throw new Error(`EVO_KAFKA_GROUP_ID must be provided`)
export const evoKafkaGroupId = process.env.EVO_KAFKA_GROUP_ID
if (!process.env.BRICK_MASTER_KAFKA_CLIENT_ID) throw new Error(`BRICK_MASTER_KAFKA_CLIENT_ID must be provided`)
export const brickMasterKafkaClientId = process.env.BRICK_MASTER_KAFKA_CLIENT_ID
if (!process.env.BRICK_MASTER_KAFKA_BROKER) throw new Error(`BRICK_MASTER_KAFKA_BROKER must be provided`)
export const brickMasterKafkaBroker = process.env.BRICK_MASTER_KAFKA_BROKER.split(',')
if (!process.env.BRICK_MASTER_KAFKA_GROUP_ID) throw new Error(`BRICK_MASTER_KAFKA_GROUP_ID must be provided`)
export const brickMasterKafkaGroupId = process.env.BRICK_MASTER_KAFKA_GROUP_ID

if (!process.env.KAFKA_SIGNUP_TOPIC) throw new Error(`KAFKA_SIGNUP_TOPIC must be provided`)
if (!process.env.KAFKA_SEND_COMMISSION_TOPIC) throw new Error(`KAFKA_SEND_COMMISSION_TOPIC must be provided`)
export const KAFKA_SIGNUP_TOPIC=process.env.KAFKA_SIGNUP_TOPIC
export const KAFKA_SEND_COMMISSION_TOPIC=process.env.KAFKA_SEND_COMMISSION_TOPIC


//EVO CONFIG
if (!process.env.EVO_AUTH_TOKEN) throw new Error(`EVO_AUTH_TOKEN must be provided`)
const EVO_AUTH_TOKEN = process.env.EVO_AUTH_TOKEN
if (!process.env.EVO_HOST_NAME || !process.env.EVO_CASINO_KEY || !process.env.EVO_API_TOKEN || !process.env.EVO_SERVER_URI) throw new Error('EVO SERVER CONFIG must be provided')
if (!process.env.EVO_AUTHENTICATION_TOKEN) throw new Error(`EVO_AUTHENTICATION_TOKEN must be provided`)
if (!process.env.APP_DOMAIN) throw new Error(`APP_DOMAIN must be provided`)
export const APP_DOMAIN = process.env.APP_DOMAIN
export const evoServerConfig = {
    evo_host_name: process.env.EVO_HOST_NAME,
    evo_casino_key: process.env.EVO_CASINO_KEY,
    evo_api_token: process.env.EVO_API_TOKEN,
    evo_server_uri: process.env.EVO_SERVER_URI,
    evo_lobby_uri: process.env.APP_DOMAIN || 'https://evol.club/',
    evo_authentication_token: process.env.EVO_AUTHENTICATION_TOKEN
}

/**
 * @timeInterval how long re-get rate from Coingecko
 * @expiredRate Rate too old for calculate
 */
export const GET_RATE_CONFIG = {
    getInterval: 5, //seconds
    expiredRate: 60 //seconds
}

if (!process.env.WITHDRAWABLE) throw new Error(`WITHDRAWABLE must provided`)
if (!process.env.TRANSFERABLE) throw new Error(`TRANSFERABLE must provided`)
if (!process.env.PLAYABLE) throw new Error(`PLAYABLE must provided`)
if (!process.env.CONVERTABLE) throw new Error(`CONVERTABLE must provided`)
export const GAMEPLAY_CONFIG = {
    defaultAvatar: `this is default avatar`,
    assets_factor: 1000000,
    playWithEvoConfig: {
        currency: process.env.PLAY_EVO_CURRENCY || 'USD',
        tableActiveTimeout: 5
    },
    assetConfig: {
        convertMin: Number(process.env.CONVERT_MIN) || 1, //usdt
        convertFee: Number(process.env.CONVERT_FEE) || 0, //percent
        depositFee: Number(process.env.DEPOSIT_FEE) || 0, //percent
        withdrawFee: Number(process.env.WITHDRAW_FEE) || 0, //percent
        withdrawMin: Number(process.env.WITHDRAW_MIN) || 1, //usdt
        transferMin: Number(process.env.TRANSFER_MIN) || 1, //usdt
        transferFee: Number(process.env.TRANSFER_FEE) || 1//percent
    },
    lockConfig: {
        withdrawAble: JSON.parse(process.env.WITHDRAWABLE || 'true'),
        transferable: JSON.parse(process.env.TRANSFERABLE || 'true'),
        playable: JSON.parse(process.env.PLAYABLE || 'true'),
        convertable:JSON.parse(process.env.CONVERTABLE||'true')
    }
}

//BRICK CONFIG
if (!process.env.BRICK_API_KEY) throw new Error(`BRICK_API_KEY must be provided`)
if (!process.env.BRICK_PROVIDER) throw new Error(`BRICK_PROVIDER must be provided`)

export const BrickSDKConfig = {
    apiKey: process.env.BRICK_API_KEY,
    provider: process.env.BRICK_PROVIDER
}



export {
    SENTRY_DNS,
    SENTRY_SERVER_NAME,
    MONGO_URI,
    GRAPHQL_CONFIG,
    EVO_AUTH_TOKEN,
    REDIS_CONFIG,
    AUTH_CONFIG,
}