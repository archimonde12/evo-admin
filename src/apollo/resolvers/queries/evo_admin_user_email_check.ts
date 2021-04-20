import { ErrMsg } from "../../../error_handler"
import { AccountInMongo } from "../../../models/Account"
import { accounts } from "../../../mongo"

export const evo_admin_user_email_check = async (parent, args) => {
    try {
        const { username } = args as { username: string }
        console.log({username})
        const account = await accounts.findOne({slug:username}) as AccountInMongo
        if(!account) throw ErrMsg(`username not found`)
        return account.email.address
    } catch (e) {
        throw e
    }
}