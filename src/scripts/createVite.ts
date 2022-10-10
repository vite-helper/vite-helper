import fs from "fs";
import { cd } from "shelljs";

import { IDependencies } from "../interfaces/Dependencies";
import { IProjectDetails } from "../interfaces/ProjectDetails";
import { createFolder } from "../utils/createFolder";
import { downloadFile } from "../utils/downloadFile";
import { silentExec } from "../utils/shell";

export const createVite = async ({
  isTypescript,
  projectName,
}: IProjectDetails): Promise<IDependencies> => {
  const folder = isTypescript ? "ts" : "js";
  const extension = folder + "x";
  const viteConfigName = `vite.config.${folder}`;

  silentExec(
    `npm create vite@latest ${projectName} -- --template react${
      isTypescript ? "-ts" : ""
    }`,
  );

  cd(projectName);

  fs.rmSync("src", { recursive: true });
  fs.rmSync(viteConfigName);

  ["src", "public", "src/pages", "src/pages/Home"].forEach(folder => {
    createFolder(folder);
  });

  await Promise.all([
    downloadFile("viteTemplate/vercel.json"),
    downloadFile("viteTemplate/.gitattributes"),
    downloadFile(`viteTemplate/${folder}/${viteConfigName}`),
    downloadFile("viteTemplate/_redirects", "/public"),
    downloadFile(`viteTemplate/${folder}/main.${extension}`, "/src"),
    downloadFile(
      `viteTemplate/${folder}/index.${extension}`,
      "/src/pages/Home",
    ),
    isTypescript
      ? downloadFile(`viteTemplate/${folder}/vite-env.d.ts`, "/src")
      : null,
  ]);

  const typescriptDevDependencies = isTypescript
    ? ["vite-tsconfig-paths", "vite-plugin-checker"]
    : [];

  return {
    dependencies: [],
    devDependencies: [
      "vite-plugin-svgr",
      "@vitejs/plugin-legacy",
      ...typescriptDevDependencies,
    ],
  };
};
