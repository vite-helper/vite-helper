import * as fs from "fs";

export const isTypescript = () => {
  return fs.existsSync(`${process.cwd()}/tsconfig.json`);
};

export const isReactViteProject = () => {
  let isValid = false;
  const packageJson = fs.readFileSync(`${process.cwd()}/package.json`);
  const { dependencies, devDependencies } = JSON.parse(packageJson.toString());
  if (dependencies.react && devDependencies.vite) {
    isValid = true;
  }
  return isValid;
};
