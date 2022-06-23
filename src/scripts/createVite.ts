import fs from "fs";
import { cd } from "shelljs";

import { downloadFile } from "../utils/downloadFile";
import { silentExec } from "../utils/shell";

interface ICreateViteData {
  isTypescript: boolean;
  projectName: string;
}

export const createVite = async ({
  isTypescript,
  projectName,
}: ICreateViteData) => {
  const folder = isTypescript ? "ts" : "js";

  silentExec(
    `npm create vite@latest ${projectName} -- --template react${
      isTypescript ? "-ts" : ""
    }`,
  );

  cd(projectName);

  fs.rmSync("src", { recursive: true });

  fs.mkdirSync("src");
  fs.mkdirSync("src/pages");
  fs.mkdirSync("src/pages/Home");

  await Promise.all([
    downloadFile(`viteTemplate/${folder}/main.tsx`, "/src"),
    downloadFile(`viteTemplate/${folder}/index.tsx`, "/src/pages/Home"),
    isTypescript
      ? downloadFile(`viteTemplate/${folder}/vite-env.d.ts`, "/src")
      : null,
  ]);
};
