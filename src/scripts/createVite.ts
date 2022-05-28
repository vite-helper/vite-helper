import fs from "fs";
import shell from "shelljs";

import { errLogs } from "../utils/logs";
import { silentExec } from "../utils/silentExec";

type CreateViteProp = {
  isTypescript: boolean;
  packageName: string;
};

export const createVite = async ({
  isTypescript,
  packageName,
}: CreateViteProp) => {
  const extension = isTypescript ? "ts" : "js";

  silentExec(
    `git clone https://github.com/vite-helper/vite-with-react-${extension} ${packageName}`,
  );

  shell.cd(packageName);

  fs.readFile("./package.json", "utf8", (err, data) => {
    if (err) {
      errLogs(err);
      return;
    }

    const result = data.replace(`vite-with-react-${extension}`, packageName);

    fs.writeFile("./package.json", result, "utf8", err => {
      if (err) {
        errLogs(err);
      }
    });
  });

  fs.rmSync(".github", { recursive: true });
  fs.rmSync(".git", { recursive: true });
};
