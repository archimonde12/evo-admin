import { CaptureException } from "./sentry"
import { SERVER_CONFIG } from "./config"

export const ErrMsg = (msg: string) => {
    return new Error(`${SERVER_CONFIG.ServerCode}:${msg}`)
}

export const EvoApiErrCodeMessage = {
    EA000: "Action fail because unexpected error",
    EA100: "Username must be provided",
    EA101: "Invalid username",
    EA102: "Invalid password",
    EA103: "Can not be referenced by the same username",
    EA104: "Username already exists",
    EA105: "Username not found",
    EA106: "Account already locked",
    EA107: "Password was not corrected",
    EA108: "Token has not found",
    EA109: "Invalid token",
    EA110: "Token was expired",
    EA111: "Email mail must be provided",
    EA112: "invalid email",
    EA113: "email already in use",
    EA114: "email not found",
    EA115: "on time out",
    EA116: "TFA code must be provided",
    EA117: "TFA code invalid",
    EA118: "New password same old password",
    EA119: "Please generate QR Code to enable two authentication",
    EA120: "User already active TFA",
    EA121: "User not active TFA",
    EA122: "Email must be verify",
    EA123: "Verify token invalid",
    EA124: "Email already verify",
    EA125: "Email already verify and in use",
    EA126: "Refer not found",
    //==========SYSTEM==========
    EA200: "invalid params",
    EA201: "empty history",
    EA202: "Fail to send to Kafka",
    EA203: "Params missing",
    EA204: "Function temporary locking",
    //==========GAME PLAY==========
    EA300: "already joined table",
    EA301: "not in this table",
    EA302: "not join any table",
    EA303: "server get new rate fail",
    EA304: "Table Id not found",
    //==========ASSET==========
    EA400: "Cannot transfer for your self",
    EA401: "Receiver not found",
    EA402: "Balance insufficient",
    EA403: "Address missing",
    EA404: "Address invalid",
    EA405: "Amount too small",
    EA406: "Cannot convert same coin",
    EA407: "Rate not exist",
    EA408: "Fail to get fee",
    EA409: "Address internal",
    EA410: "Transaction id already exist",
    //==========EVO CONNECT==========
    EA500: "evo response not found",
    EA501: "evo auth fail because some reason",
    //==========BRICK MASTER CONNECT==========
    EA600: "debit fail",
    EA601: "credit fail",
    EA602: "withdraw fail",
    EA603: "server uuid not exist",
    EA604: "server event not exist",
    EA605: "create new account fail",
    EA606: "Not support system type",
    EA607: "get main account information fail"
}

/**
 * Show the error and capture exception to Sentry
 * @param e error 
 * @param args params of user 
 * @param funcName Name of function
 */

export function ErrorHandler(e: any, args: any, funcName: string) {
    const { message } = e
    const { password, ...params } = args
    if (message.startsWith("EA:") || message.startsWith("BM:")) {
        const errCode = message.substring(0, 2) + message.substring(3);
        console.log('\n========================================================================================\n')
        console.log('\x1b[33m%s\x1b[0m', `⚠️  WARNING : EXPECTED ERROR HAPPENED!\n`)
        console.log('Function:', funcName)
        console.log(e)
        console.log(`Argument:`, JSON.parse(JSON.stringify(params)))
        console.log(`Message:`, EvoApiErrCodeMessage[errCode] ? EvoApiErrCodeMessage[errCode] : message.substring(3))
        console.log('\n========================================================================================')
        throw new Error(message)
    } else {
        console.log('\n========================================================================================\n')
        console.log('\x1b[31m%s\x1b[0m', `🔥  🔥  🔥  DANGER : UNEXPECTED ERROR HAPPENED!\n `)
        console.log('Function:', funcName)
        console.log(e)
        console.log(`Argument:`, JSON.parse(JSON.stringify(params)))
        console.log('\n========================================================================================')
        CaptureException(e, { args: JSON.parse(JSON.stringify(args)) })
        throw ErrMsg(EA_ERROR_CODE.UNEXPECTED_ERROR)
    }
}

export const EA_ERROR_CODE = {
    //==========USER==========
    UNEXPECTED_ERROR: '000',
    MISSING_USERNAME: '100',
    USERNAME_INVALID: '101',
    PASSWORD_INVALID: '102',
    REFER_SAME_USERNAME: '103',
    USERNAME_ALREADY_EXIST: '104',
    USER_NOT_EXIST: '105',
    USER_LOCKED: '106',
    WRONG_PASSWORD: '107',
    MISSING_TOKEN: '108',
    TOKEN_INVALID: '109',
    TOKEN_EXPIRED: '110',
    EMAIL_MISSING: '111',
    INVALID_EMAIL: '112',
    EMAIL_ALREADY_IN_USE: '113',
    EMAIL_NOT_FOUND: '114',
    EMAIL_FORGOT_ON_TIME: '115',
    TFA_CODE_MISSING: '116',
    TFA_CODE_INVALID: '117',
    PASSWORD_SAME: '118',
    GENERATE_QR_CODE_REQUIRE: '119',
    ALREADY_ACTIVE_TFA: '120',
    NOT_ACTIVE_TFA: '121',
    EMAIL_MUST_VERIFY: '122',
    VERIFY_TOKEN_INVALID: '123',
    EMAIL_ALREADY_VERIFY: '124',
    EMAIL_IN_USE_AND_ALREADY_VERIFY: '125',
    REFER_NOT_FOUND:'126',
    //==========SYSTEM==========
    INVALID_PARAMS: '200',
    EMPTY_HISTORY: '201',
    FAIL_TO_SEND_KAFKA: '202',
    PARAMS_MISSING: '203',
    TEMPORARY_LOCK_FUNCTION: '204',
    //==========GAME PLAY==========
    ALREADY_JOINED_TABLE: '300',
    NOT_IN_THIS_TABLE: '301',
    FREE_TO_JOIN: '302',
    FAIL_TO_GET_RATE: '303',
    TABLE_ID_NOT_FOUND: '304',
    //==========ASSET==========
    TRANSFER_YOURSELF: '400',
    RECEIVER_NOT_EXIST: '401',
    BALANCE_INSUFFICIENT: '402',
    ADDRESS_MISSING: '403',
    ADDRESS_INVALID: '404',
    AMOUNT_MIN_LIMIT: '405',
    CONVERT_SAME: '406',
    RATE_NOT_EXIST: '407',
    FAIL_TO_GET_FEE: '408',
    ADDRESS_INTERNAL: '409',
    TRANSACTION_ID_EXIST: '410',
    //==========EVO CONNECT==========
    EVO_RESPONSE_NOT_FOUND: '500',
    EVO_AUTH_FAILED: (msg: string) => `501 - ${msg}`,
    //==========BRICK MASTER CONNECT==========
    BM_DEBIT_FAIL: '600',
    BM_CREDIT_FAIL: '601',
    BM_WITHDRAW_FAIL: '602',
    BM_UUID_NOT_EXIST: '603',
    BM_EVENT_NOT_EXIST: '604',
    BM_CREAT_SUB_FAIL: '605',
    BM_NOT_SUPPORT_SYSTEM_TYPE: (msg: string) => `606-${msg}`,
    BM_GET_MAIN_ACC_INFO_MAIL: '607',
}