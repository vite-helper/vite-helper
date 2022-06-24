import { IDependencies } from "../interfaces/Dependencies";
import * as script from "../scripts";

export const execScript = async (toolName: string, isTypescript: boolean) => {
  let dependencies: IDependencies = {
    devDependencies: [],
    dependencies: [],
  };

  switch (toolName) {
    case "ESlint, Prettier and Editorconfig":
      dependencies = await script.eslintPrettierEditorConfig(isTypescript);
      break;
    case "React Router Dom":
      dependencies = await script.reactRouterDom(isTypescript);
      break;
    case "Tailwind":
      dependencies = await script.tailwindConfig(isTypescript);
      break;
    case "Vitest":
      dependencies = await script.vitest(isTypescript);
      break;
    default:
      console.log("This tool was not found");
  }
  return dependencies;
};
