import { ErrMsg } from "../../../error_handler";
import { AccountInMongo } from "../../../models/Account";
import { accounts, tempAccounts } from "../../../mongo";

export const evo_admin_user_email_check = async (parent, args) => {
  try {
    const { username } = args as { username: string };
    console.log({ username });
    const account = (await accounts.findOne({
      slug: username,
    })) as AccountInMongo;
    if (account) {
      return  { email: account.email.address, verifyStatus: "verified" };
    } else {
      const tempAccount = await tempAccounts.findOne({ slug: username });

      if (!tempAccount) throw ErrMsg(`username not found`);
      return { email: tempAccount.email.address, verifyStatus: "Not verify" };
    }
  } catch (e) {
    throw e;
  }
};
