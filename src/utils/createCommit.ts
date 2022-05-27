import shell from "shelljs";
import { silentExec } from "./shell";

export const createCommit = async (commitName: string) => {
  silentExec(`git commit -m "${commitName}"`);
};
