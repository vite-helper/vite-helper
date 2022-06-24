import { mkdir } from "shelljs";

import { IDependencies } from "../interfaces/Dependencies";
import { downloadFile } from "../utils/downloadFile";
import { getTsConfig, writeTsConfig } from "../utils/manipulateFiles";

export const vitest = async (isTypescript: boolean): Promise<IDependencies> => {
  const folder = isTypescript ? "ts" : "js";

  mkdir("src/.vitest");

  await Promise.all([
    downloadFile(`vitest/${folder}/setup.${folder}`, "/src/.vitest"),
    downloadFile(`vitest/${folder}/vitest.config.${folder}`),
  ]);

  if (isTypescript) {
    const tsconfigJson = await getTsConfig();
    tsconfigJson.compilerOptions.types = ["vitest/globals"];
    writeTsConfig(tsconfigJson);
  }

  return {
    devDependencies: ["c8", "jsdom", "vitest"],
    dependencies: [],
  };
};
