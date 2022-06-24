import { mv } from "shelljs";

import { IDependencies } from "../interfaces/Dependencies";
import { downloadFile } from "../utils/downloadFile";

export const eslintPrettierEditorConfig = async (
  isTypescript: boolean,
): Promise<IDependencies> => {
  const folder = isTypescript ? "ts" : "js";

  await Promise.all([
    downloadFile("editorConfig/.editorconfig"),
    downloadFile("prettier/.prettierignore"),
    downloadFile("prettier/.prettierrc"),
    downloadFile(`eslint/.eslintignore`),
    downloadFile(`eslint/${folder}/_.eslintrc.json`),
  ]);

  mv("_.eslintrc.json", ".eslintrc.json");

  const typescriptDependencies = isTypescript
    ? ["@typescript-eslint/eslint-plugin", "@typescript-eslint/parser"]
    : [];

  return {
    devDependencies: [
      "prettier",
      "eslint",
      "eslint-config-prettier",

      "eslint-plugin-prettier",
      "eslint-plugin-react",
      "eslint-plugin-react-hooks",
      "eslint-config-standard",
      "eslint-plugin-n",
      "eslint-plugin-promise",
      ...typescriptDependencies,
    ],
    dependencies: [],
  };
};
