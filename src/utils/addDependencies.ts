import shell from "shelljs";

import { IDependencies } from "../interfaces/Dependencies";

export const addDependencies = async ({
  dependencies,
  devDependencies,
}: IDependencies) => {
  console.log("");

  if (dependencies.length) {
    shell.exec(`npx add-dependencies ${dependencies.join(" ")}`);
    console.log("");
  }

  if (devDependencies.length) {
    shell.exec(`npx add-dependencies ${devDependencies.join(" ")} -D`);
  }
};
