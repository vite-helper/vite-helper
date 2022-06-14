import fs from "fs";
import shell from "shelljs";

import { downloadFile } from "../utils/downloadFile";
import { errLogs } from "../utils/logs";

export const addReactRouter = (isTypescriptProject: boolean) => {
  const extension = isTypescriptProject ? "ts" : "js";

  const syncReactRouter = async () => {
    fs.mkdirSync("src/router", { recursive: true });

    await downloadFile(`router/index.txt`, ``);

    const exists = fs.existsSync("index.txt");

    if (exists) {
      fs.renameSync("index.txt", `index.${extension}x`);

      fs.readFile(`./src/main.${extension}x`, "utf8", (err, data) => {
        if (err) {
          errLogs(err);
        }

        const replaced = data
          .replace("<App />", "<AppRouter />")
          .replace(
            "import App from './App'",
            `import AppRouter from './router'`,
          );

        fs.writeFileSync(`./src/main.${extension}x`, replaced);
      });

      shell.mv(`index.${extension}x`, "src/router");
    }
  };

  syncReactRouter();

  const defaultDependencies = ["react-router-dom"];

  return {
    devDependencies: [],
    dependencies: [...defaultDependencies],
  };
};
