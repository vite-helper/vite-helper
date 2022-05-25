import { IPkgManagers } from "../interfaces/PkgManager";
import { addDependencies } from "../utils/addDependencies";
import { downloadFile } from "../utils/downloadFile";

export const eslintPrettierEditorConfig = (
  pkgManager: IPkgManagers,
  isTypescriptProject: boolean,
) => {
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
  const dependencies = [...defaultDependencies, ...typescriptDependencies];

  addDependencies(dependencies, pkgManager, true);

  const folder = isTypescriptProject ? "ts" : "js";

  downloadFile("editorconfig/.editorconfig", "");
  downloadFile("prettier/.prettierrc", "");
  downloadFile("prettier/.prettierignore", "");

  downloadFile(`eslint/.eslintignore`, "");
  downloadFile(`eslint/${folder}/.prettierrc`, "");
};
