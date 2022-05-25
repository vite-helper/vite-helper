import shell from "shelljs";

import { IPkgManagers } from "../interfaces/PkgManager";

export const addDependencies = (
  depArray: string[],
  pkgManager: IPkgManagers,
  isDev = false,
) => {
  let pkgCommand = "";
  switch (pkgManager) {
    case "yarn":
      pkgCommand = isDev ? "yarn add -D" : "yarn add";
      break;
    default:
      pkgCommand = isDev ? "npm add -D" : "npm add";
  }

  const dependencies = depArray.join(" ");
  const command = `${pkgCommand} ${dependencies}`;

  if (shell.exec(command).code !== 0) {
    shell.echo(`Error adding dependencies ${dependencies} with ${pkgManager}`);
    shell.exit(1);
  }
};
