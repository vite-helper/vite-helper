import shell from "shelljs";

import { downloadFile } from "../utils/downloadFile";

export const eslintPrettierEditorConfig = (isTypescriptProject: boolean) => {
  const defaultDependencies = [
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
  ];
  const typescriptDependencies = isTypescriptProject
    ? ["@typescript-eslint/eslint-plugin", "@typescript-eslint/parser"]
    : [];

  const folder = isTypescriptProject ? "ts" : "js";

  downloadFile("editorconfig/.editorconfig", "");
  downloadFile("prettier/.prettierrc", "");
  downloadFile("prettier/.prettierignore", "");

  downloadFile(`eslint/.eslintignore`, "");
  downloadFile(`eslint/${folder}/_.eslintrc.json`, "");
  shell.mv("_.eslintrc.json", ".eslintrc.json");

  return {
    devDependencies: [...defaultDependencies, ...typescriptDependencies],
    dependencies: [],
  };
};
