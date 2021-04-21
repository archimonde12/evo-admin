import { TxInMongo, TxType } from "../../../models/TX";
import { betDetails, convertHistories, TXs } from "../../../mongo";
import { BetDetailInMongo } from "../../../models/BetDetail";
import { ConvertHistoryInMongo } from "../../../models/ConvertHistory";

export const evo_admin_user_action_history_check = async (_,args) => {
    try {
        const { username } = args as { username: string };
        const allTransactionData=await TXs.find({slug:username}).toArray() as TxInMongo[]
        const allConvertData=await convertHistories.find({slug:username}).toArray() as ConvertHistoryInMongo[]
        const allGameTransaction=await betDetails.find({slug:username}).toArray() as BetDetailInMongo[]
        return {
            withdrawData:allTransactionData.filter(el=>el.action===TxType.withdraw),
            depositData:allTransactionData.filter(el=>el.action===TxType.deposit),
            transferData:allTransactionData.filter(el=>el.action===TxType.transfer||el.action===TxType.receiveTransfer),
            gameTransactionData:allGameTransaction
        }
    } catch (e) {
        throw e
    }
}