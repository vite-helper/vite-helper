import fs from "fs";
import { cd } from "shelljs";

import { IProjectDetails } from "../interfaces/projectDetails";
import { downloadFile } from "../utils/downloadFile";
import { silentExec } from "../utils/shell";

export const createVite = async ({
  isTypescript,
  projectName,
}: IProjectDetails) => {
  const folder = isTypescript ? "ts" : "js";
  const extension = folder + "x";

  silentExec(
    `npm create vite@latest ${projectName} -- --template react${
      isTypescript ? "-ts" : ""
    }`,
  );

  cd(projectName);

  fs.rmSync("src", { recursive: true });

  fs.mkdirSync("src");
  fs.mkdirSync("public");
  fs.mkdirSync("src/pages");
  fs.mkdirSync("src/pages/Home");

  await Promise.all([
    downloadFile(`viteTemplate/vercel.json`, ""),
    downloadFile(`viteTemplate/.gitattributes`, ""),
    downloadFile(`viteTemplate/_redirects`, "/public"),
    downloadFile(`viteTemplate/${folder}/main.${extension}`, "/src"),
    downloadFile(
      `viteTemplate/${folder}/index.${extension}`,
      "/src/pages/Home",
    ),
    isTypescript
      ? downloadFile(`viteTemplate/${folder}/vite-env.d.ts`, "/src")
      : null,
  ]);
};
