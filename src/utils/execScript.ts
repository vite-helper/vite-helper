import { IDependencies } from "../interfaces/Dependencies";
import {
  eslintPrettierEditorConfig,
  reactRouterDom,
  svgr,
  tailwindConfig,
} from "../scripts";

export const execScript = async (
  toolName: string,
  isTypescriptProject: boolean,
) => {
  let dependencies = {
    devDependencies: [],
    dependencies: [],
  } as IDependencies;

  switch (toolName) {
    case "ESlint, Prettier and Editorconfig":
      dependencies = await eslintPrettierEditorConfig(isTypescriptProject);
      break;
    case "Vite svgr":
      dependencies = await svgr(isTypescriptProject);
      break;
    case "React Router Dom":
      dependencies = await reactRouterDom(isTypescriptProject);
      break;
    case "Tailwind":
      dependencies = await tailwindConfig(isTypescriptProject);
      break;
    default:
      console.log("This tool was not found");
  }
  return dependencies;
};
