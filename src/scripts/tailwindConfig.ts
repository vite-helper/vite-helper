import { mkdir } from "shelljs";

import { IDependencies } from "../interfaces/Dependencies";
import { downloadFile } from "../utils/downloadFile";
import { addImport } from "../utils/manipulateFiles";

export const tailwindConfig = async (
  isTypescript: boolean,
): Promise<IDependencies> => {
  const folder = isTypescript ? "ts" : "js";
  const extension = folder + "x";

  mkdir("src/styles");

  await Promise.all([
    downloadFile("tailwind/globals.css", "/src/styles"),
    downloadFile("tailwind/tailwind.config.js"),
    downloadFile("tailwind/postcss.config.js"),
  ]);

  addImport(`./src/main.${extension}`, `import "./styles/globals.css"`);

  return {
    devDependencies: ["tailwindcss", "postcss", "autoprefixer"],
    dependencies: [],
  };
};
