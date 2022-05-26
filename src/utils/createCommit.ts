import shell from "shelljs";

export const createCommit = () => {
  shell.rm(".git");
  shell.exec("git init");
  shell.exec("git add .");
  shell.exec("git commit -m 'Initial commit from vite-helper'");
};
