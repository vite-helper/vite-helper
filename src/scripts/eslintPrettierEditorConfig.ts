import { mv } from "shelljs";

import { downloadFile } from "../utils/downloadFile";

export const eslintPrettierEditorConfig = async (
  isTypescriptProject: boolean,
) => {
  const typescriptDependencies = isTypescriptProject
    ? ["@typescript-eslint/eslint-plugin", "@typescript-eslint/parser"]
    : [];

  const folder = isTypescriptProject ? "ts" : "js";

  await Promise.all([
    downloadFile("editorConfig/.editorconfig", ""),
    downloadFile("prettier/.prettierignore", ""),
    downloadFile("prettier/.prettierrc", ""),
    downloadFile(`eslint/.eslintignore`, ""),
    downloadFile(`eslint/${folder}/_.eslintrc.json`, ""),
  ]);

  mv("_.eslintrc.json", ".eslintrc.json");

  return {
    devDependencies: [
      "prettier",
      "eslint",
      "eslint-config-prettier",
      "eslint-plugin-import",
      "eslint-plugin-import-helpers",
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
