import shell from "shelljs";

export const createCommit = async (commitName: string) => {
  shell.exec(`git commit -m "${commitName}"`);
  console.log("Commit feito");
};
