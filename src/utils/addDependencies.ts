import { exec } from "shelljs";

import { IDependencies } from "../@types";

export const addDependencies = async ({
  dependencies,
  devDependencies,
}: IDependencies) => {
  console.log("");

  if (dependencies.length) {
    exec(`npx add-dependencies ${dependencies.join(" ")}`);
    console.log("");
  }

  if (devDependencies.length) {
    exec(`npx add-dependencies ${devDependencies.join(" ")} -D`);
  }
};
