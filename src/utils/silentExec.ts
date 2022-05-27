import shell from "shelljs";

export const silentExec = (command: string) => {
  shell.exec(command, { silent: true });
};
