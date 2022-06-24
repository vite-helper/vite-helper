import fs from "fs";

import { errLog } from "./logs";

interface ITsConfig {
  compilerOptions: {
    [key: string]: string | object | string[];
  };
}

export const addImport = (file: string, importStatement: string[] | string) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) return errLog(err);

    const isMoreOneImport = Array.isArray(importStatement);
    const formattedData = isMoreOneImport
      ? importStatement.join(";\r\n") + ";\r\n" + data
      : importStatement + ";\r\n" + data;

    fs.writeFile(file, formattedData, "utf8", err => {
      if (err) return errLog(err);
    });
  });
};

export const addTypeReference = (
  file: string,
  reference: string | string[],
) => {
  const isMoreOneReference = Array.isArray(reference);
  const formattedReference = isMoreOneReference
    ? reference.join(";\r\n") + ";\r\n"
    : reference + ";\r\n";

  fs.appendFileSync(file, formattedReference);
};

export const replaceFileText = (
  file: string,
  oldImportStatement: string[] | string,
  newImportStatement: string[] | string,
) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) return errLog(err);

    const isMoreOneImport = Array.isArray(oldImportStatement);

    if (isMoreOneImport) {
      oldImportStatement.forEach((oldStatement, index) => {
        data = data.replace(oldStatement, newImportStatement[index]);
      });
    }

    fs.writeFileSync(file, data);
  });
};

export const addVitePlugin = (
  viteConfigPath: string,
  importsFunctions: string[] | string,
  importsPlugin: string[] | string,
) => {
  fs.readFile(viteConfigPath, "utf8", (err, data) => {
    if (err) return errLog(err);

    const isMoreOneImport = Array.isArray(importsFunctions);
    const formattedImport = isMoreOneImport
      ? importsFunctions.join(", ")
      : importsFunctions;
    const haveMoreOneImport = data.indexOf("[react()]") < 0;

    data = data.replace(
      "react()",
      `react(), ${formattedImport}${haveMoreOneImport ? ", " : ""}`,
    );

    fs.writeFile(viteConfigPath, data, err => {
      if (err) return errLog(err);
    });

    addImport(viteConfigPath, importsPlugin);
  });
};

export const getTsConfig = (): Promise<ITsConfig> => {
  const tsconfigJson = fs.readFileSync("tsconfig.json");
  const parsedTsconfig = JSON.parse(tsconfigJson.toString());

  return parsedTsconfig;
};

export const writeTsConfig = (tsConfig: ITsConfig) => {
  fs.writeFileSync("tsconfig.json", JSON.stringify(tsConfig, null, 2));
};
