import { accounts } from "../../../mongo";

export const evo_admin_verify_email = async (parents, args) => {
  try {
    const { username } = args as { username: string };
    const account=accounts.findOne({slug:username})
    return "OK";
  } catch (e) {
    throw e;
  }
};
