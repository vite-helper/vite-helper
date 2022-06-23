import fs from "fs";

import { downloadFile } from "../utils/downloadFile";
import { errLog } from "../utils/logs";

export const reactRouterDom = async (isTypescriptProject: boolean) => {
  const extension = isTypescriptProject ? "ts" : "js";

  fs.mkdirSync("src/router");

  await downloadFile(`router/${extension}/index.${extension}x`, "/src/router");

  fs.readFile(`./src/main.${extension}x`, "utf8", (err, data) => {
    if (err) return errLog(err);

    const replaced = data
      .replace("<App />", "<AppRouter />")
      .replace(
        `import App from "./pages/Home"`,
        `import AppRouter from "./router"`,
      );

    fs.writeFileSync(`./src/main.${extension}x`, replaced);
  });

  return {
    devDependencies: [],
    dependencies: ["react-router-dom"],
  };
};
