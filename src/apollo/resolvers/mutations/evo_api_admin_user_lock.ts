import { Lock } from "../../../models/Account";
import { accounts } from "../../../mongo";

enum lockActionEnum {
  all = "all",
  withdraw = "withdraw",
  transfer = "transfer",
  convert = "convert",
  playGame = "playGame",
}
export const evo_admin_user_lock = async (_, args, ctx) => {
  const { username, action, isLock } = args as {
    username: string;
    action: string[];
    isLock: boolean;
  };
  const adminKey = ctx.req.headers.adminKey
  const lockStatus: Lock = {
    id: Math.floor(Math.random() * 1000000).toString(),
    lockByAdmin:adminKey,
    lockDate:new Date().getTime(),
    status:

  };
  await accounts.findOneAndUpdate();
};
