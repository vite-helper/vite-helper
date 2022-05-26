import { IDependencies } from "../interfaces/Dependencies";
import { eslintPrettierEditorConfig, svgr } from "../scripts";

export const execScript = (toolName: string, isTypescriptProject: boolean) => {
  let dependencies = {} as IDependencies;
  switch (toolName) {
    case "ESlint, Prettier and Editorconfig":
      dependencies = eslintPrettierEditorConfig(isTypescriptProject);
      break;
    case "Vite svgr":
      dependencies = svgr(isTypescriptProject);
      break;
    default:
      console.log("This tool was not found");
  }
  return dependencies;
};
