import { cd, exec, mkdir } from "shelljs";

export const silentExec = (command: string) => {
  exec(command, { silent: true });
};

export const mkdirCd = (folder: string) => {
  mkdir(folder);
  cd(folder);
};
