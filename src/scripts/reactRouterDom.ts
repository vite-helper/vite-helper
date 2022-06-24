import fs from "fs";

import { IDependencies } from "../interfaces/Dependencies";
import { downloadFile } from "../utils/downloadFile";
import { replaceFileText } from "../utils/manipulateFiles";

export const reactRouterDom = async (
  isTypescript: boolean,
): Promise<IDependencies> => {
  const folder = isTypescript ? "ts" : "js";
  const extension = folder + "x";

  fs.mkdirSync("src/router");

  await downloadFile(`router/${folder}/index.${extension}`, "/src/router");

  replaceFileText(
    `./src/main.${extension}`,
    ["<App />", `import App from "./pages/Home"`],
    ["<AppRouter />", `import AppRouter from "./router"`],
  );

  return {
    devDependencies: [],
    dependencies: ["react-router-dom"],
  };
};
