import * as fs from "fs";

import { IPkgManagers } from "../interfaces/PkgManager";
import { addDependencies } from "../utils/addDependencies";

export const svgr = (
  pkgManager: IPkgManagers,
  isTypescriptProject: boolean,
) => {
  const basePath = process.cwd();
  const dependencies = ["vite-plugin-svgr"];
  let viteConfigPath = `${basePath}/vite.config.js`;

  addDependencies(dependencies, pkgManager, true);

  if (isTypescriptProject) {
    fs.appendFileSync(
      `${basePath}/src/vite-env.d.ts`,
      '/// <reference types="vite-plugin-svgr/client" />',
    );
    viteConfigPath = `${basePath}/vite.config.ts`;
  }

  fs.readFile(viteConfigPath, "utf8", (err, data) => {
    if (err) {
      console.log("Error: " + err);
      return;
    }

    const haveMoreOnePlugin = !(data.indexOf("[react()]") >= 0);
    data = data.replace(
      "react()",
      `react(), svgr()${haveMoreOnePlugin ? "," : ""}`,
    );
    const viteConfig = "import svgr from 'vite-plugin-svgr';\r\n" + data;

    fs.writeFile(viteConfigPath, viteConfig, err => {
      if (err) {
        console.log("Error: " + err);
      }
    });
  });
};
