import { getSlugJwt, passwordRegex, usernameRegex, verifySlugJwt } from "../../../auth";
import { EA_ERROR_CODE, ErrorHandler, ErrMsg } from "../../../error_handler";
import { accounts, mongo, tempAccounts } from "../../../mongo";
import { compare } from "bcrypt";
import speakeasy from 'speakeasy'
import { TempAccountInMongo } from "../../../models/TempAccount";
import { timer } from "../../../utils";
import { AccountInMongo, Status } from "../../../models/Account";

const verifyTFA = ({ code, secret }) => {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: code
    })
}

export const evo_api_auth_login = async (parent, args, ctx, info) => {
    timer.start()
    const session = mongo.startSession()
    try {
        const { username, password, code } = args;
        // const ipAddress = getClientIp(ctx.req)
        if (!username) throw ErrMsg(EA_ERROR_CODE.MISSING_USERNAME)
        // if (!usernameRegex.test(username)) throw ErrMsg(EA_ERROR_CODE.USERNAME_INVALID)
        // if (password !== null && password !== undefined && !passwordRegex.test(password)) throw ErrMsg(EA_ERROR_CODE.PASSWORD_INVALID)
        const authToken = ctx.req.headers.authorization

        if (authToken != null && authToken != undefined) {
            const slug = verifySlugJwt(authToken).slug
            await session.withTransaction(async () => {
                const { value } = await accounts.findOneAndUpdate({ slug }, { $set: { lastLogin: new Date() } }, { returnOriginal: true, session }) as { value: AccountInMongo }
                if (!value) throw ErrMsg(EA_ERROR_CODE.USER_NOT_EXIST)
                if (value.lock?.status) throw ErrMsg(EA_ERROR_CODE.USER_LOCKED)
                if (value.status===Status.suspended) throw ErrMsg(EA_ERROR_CODE.USER_LOCKED)
            })
            return getSlugJwt(slug)
        }

        const slug = username.toLowerCase()
        await session.withTransaction(async () => {
            const { value } = await accounts.findOneAndUpdate({ slug }, { $set: { lastLogin: new Date() } }, { returnOriginal: true, session })
            // console.log({value})
            const tempAccount = await tempAccounts.findOne({ slug }) as TempAccountInMongo
            if (!value && !tempAccount) throw ErrMsg(EA_ERROR_CODE.USER_NOT_EXIST)
            if (tempAccount) {
                const byEmailFoundAccount = await accounts.findOne({ "email.address": tempAccount.email.address, "email.verifiedAt": { $exists: true } }, { session })
                if (byEmailFoundAccount) throw ErrMsg(EA_ERROR_CODE.EMAIL_IN_USE_AND_ALREADY_VERIFY)
            }
            if (! await compare(password, value ? value.hashedPassword : tempAccount.hashedPassword)) throw ErrMsg(EA_ERROR_CODE.WRONG_PASSWORD)
            if (tempAccount) throw ErrMsg(EA_ERROR_CODE.EMAIL_MUST_VERIFY)
            if (value.lock?.status) throw ErrMsg(EA_ERROR_CODE.USER_LOCKED)
            if (value.status===Status.suspended) throw ErrMsg(EA_ERROR_CODE.USER_LOCKED)
            if (value.isTwoFA) {
                if (!code) throw ErrMsg(EA_ERROR_CODE.TFA_CODE_MISSING)
                if (!verifyTFA({ code, secret: value.twoFASecret })) throw ErrMsg(EA_ERROR_CODE.TFA_CODE_INVALID)
            }
        })
        console.log(`execution time:${timer.end()}`)
        return getSlugJwt(slug)

    } catch (e) {
        console.log(`execution time:${timer.end()}`)
        if (session.inTransaction()) await session.abortTransaction()
        ErrorHandler(e, args, evo_api_auth_login.name)
    } finally {
        await session.endSession()
    }

}