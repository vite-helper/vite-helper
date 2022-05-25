import { IPkgManagers } from "../interfaces/PkgManager";
import { eslintPrettierEditorConfig, svgr } from "../scripts";

export const execScript = (
  toolName: string,
  packageManager: IPkgManagers,
  isTypescriptProject: boolean,
) => {
  switch (toolName) {
    case "ESlint, Prettier and Editorconfig":
      eslintPrettierEditorConfig(packageManager, isTypescriptProject);
      break;
    case "Vite Svgr":
      svgr(packageManager, isTypescriptProject);
      break;
    default:
      console.log("This tool was not found");
  }
};
