import { accounts } from "../../../mongo";

export const evo_admin_2FA_remove = async (_, args) => {
  try {
    const { username } = args as { username: string };
    const account = accounts.findOne({ slug: username });
  } catch (e) {
    throw e;
  }
};
