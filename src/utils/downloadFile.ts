import "dotenv/config";
import { DownloaderHelper } from "node-downloader-helper";

import { errLog } from "./logs";

export const downloadFile = async (assetPath: string, destinationPath = "") => {
  const username = process.env.GITHUB_USERNAME ?? "vite-helper";
  const repo = process.env.GITHUB_REPO ?? "vite-helper";
  const branch = process.env.GITHUB_BRANCH ?? "develop";

  const baseUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/templates/`;

  const dl = new DownloaderHelper(
    `${baseUrl}${assetPath}`,
    `${process.cwd()}${destinationPath}`,
  );

  await dl.on("error", err =>
    errLog(assetPath + String(err).replace("Error:", ", ")),
  );
  await dl
    .start()
    .then(() => console.log(`Downloading: ${assetPath}`))
    .catch(err => errLog(assetPath + String(err).replace("Error:", ", ")));
};
