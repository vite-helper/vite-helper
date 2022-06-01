import fs from "fs";
import shell from "shelljs";

import { downloadFile } from "../utils/downloadFile";
import { errLogs } from "../utils/logs";

export const tailwindConfig = (isTypescriptProject: boolean) => {
  const extension = isTypescriptProject ? "ts" : "js";

  const syncDownload = async () => {
    await downloadFile("tailwind/tailwind.config.txt", "");
    const existsTailwind = fs.existsSync("tailwind.config.txt");
    existsTailwind &&
      fs.renameSync("tailwind.config.txt", "tailwind.config.js");

    await downloadFile("tailwind/globals.txt", "");
    const existsGlobals = fs.existsSync("globals.txt");
    existsGlobals && fs.renameSync("globals.txt", "globals.css");

    await downloadFile("tailwind/postcss.config.txt", "");
    const existsPostcss = fs.existsSync("postcss.config.txt");
    existsPostcss && fs.renameSync("postcss.config.txt", "postcss.config.js");

    const globals = fs.existsSync("./src/globals.css");
    globals
      ? fs.readFile("./src/globals.css", (err, data) => {
          if (err) {
            errLogs(err);
          }

          const result =
            "@tailwind base;\n\r @tailwind components;\n\r @tailwind utilities;\n\r" +
            data;

          fs.writeFile("./src/globals.css", result, err => {
            if (err) {
              errLogs(err);
            }
          });
        })
      : shell.mv("globals.css", "./src");

    fs.readFile(`./src/main.${extension}x`, "utf8", (err, data) => {
      if (err) {
        errLogs(err);
      }

      const result = "import './globals.css';\n\r" + data;

      fs.writeFile(`./src/main.${extension}x`, result, "utf8", err => {
        if (err) {
          errLogs(err);
        }
      });
    });
  };

  syncDownload();

  const defaultDependencies = ["tailwindcss", "postcss", "autoprefixer"];

  return {
    devDependencies: [...defaultDependencies],
    dependencies: [],
  };
};
