import fs from "fs";

import { downloadFile } from "../utils/downloadFile";

export const vitest = async (isTypescriptProject: boolean) => {
  const folder = isTypescriptProject ? "ts" : "js";

  await Promise.all([
    downloadFile(`vitest/${folder}/setup-test.${folder}`, ""),
    downloadFile(`vitest/${folder}/vitest.config.${folder}`, ""),
  ]);

  const tsconfigJson = fs.readFileSync(`${process.cwd()}/tsconfig.json`);
  const parsedTsconfig = JSON.parse(tsconfigJson.toString());

  parsedTsconfig.compilerOptions.types = ["vitest/globals"];

  fs.writeFileSync("tsconfig.json", JSON.stringify(parsedTsconfig, null, 2));

  return {
    devDependencies: ["c8", "jsdom", "vitest"],
    dependencies: [],
  };
};
