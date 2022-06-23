import fs from "fs";
import { mkdir } from "shelljs";

import { downloadFile } from "../utils/downloadFile";
import { errLog } from "../utils/logs";

export const tailwindConfig = async (isTypescriptProject: boolean) => {
  const extension = isTypescriptProject ? "ts" : "js";

  mkdir("src/styles");

  await Promise.all([
    downloadFile("tailwind/globals.css", "/src/styles"),
    downloadFile("tailwind/tailwind.config.js", ""),
    downloadFile("tailwind/postcss.config.js", ""),
  ]);

  fs.readFile(`./src/main.${extension}x`, "utf8", (err, data) => {
    if (err) return errLog(err);

    const result = "import './styles/globals.css';\n\r" + data;

    fs.writeFile(`./src/main.${extension}x`, result, "utf8", err => {
      if (err) return errLog(err);
    });
  });

  return {
    devDependencies: ["tailwindcss", "postcss", "autoprefixer"],
    dependencies: [],
  };
};
