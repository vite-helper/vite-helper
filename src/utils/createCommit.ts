import shell from "shelljs";
import { silentExec } from "./silentExec";

export const createCommit = async (commitName: string) => {
  silentExec(`git commit -m "${commitName}"`);
};
