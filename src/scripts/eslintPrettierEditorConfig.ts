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

  const syncDownload = async () => {
    await downloadFile("editorconfig/.editorconfig", "");
    await downloadFile("prettier/.prettierrc", "");
    await downloadFile("prettier/.prettierignore", "");

    await downloadFile(`eslint/.eslintignore`, "");
    await downloadFile(`eslint/${folder}/_.eslintrc.json`, "");
    shell.mv("_.eslintrc.json", ".eslintrc.json");
  };

  syncDownload();

  return {
    devDependencies: [...defaultDependencies, ...typescriptDependencies],
    dependencies: [],
  };
};
