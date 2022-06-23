import { IDependencies } from "../interfaces/Dependencies";
import * as script from "../scripts";

export const execScript = async (
  toolName: string,
  isTypescriptProject: boolean,
) => {
  let dependencies: IDependencies = {
    devDependencies: [],
    dependencies: [],
  };

  switch (toolName) {
    case "ESlint, Prettier and Editorconfig":
      dependencies = await script.eslintPrettierEditorConfig(
        isTypescriptProject,
      );
      break;
    case "Vite svgr":
      dependencies = await script.svgr(isTypescriptProject);
      break;
    case "React Router Dom":
      dependencies = await script.reactRouterDom(isTypescriptProject);
      break;
    case "Tailwind":
      dependencies = await script.tailwindConfig(isTypescriptProject);
      break;
    case "Vitest":
      dependencies = await script.vitest(isTypescriptProject);
      break;
    default:
      console.log("This tool was not found");
  }
  return dependencies;
};
