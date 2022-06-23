import "dotenv/config";
import { DownloaderHelper } from "node-downloader-helper";

import { errLog } from "./logs";

export const downloadFile = async (assetName: string, path: string) => {
  console.log(`Downloading: ${assetName}`);

  const username = process.env.GITHUB_USERNAME ?? "vite-helper";
  const repo = process.env.GITHUB_REPO ?? "vite-helper";
  const branch = process.env.GITHUB_BRANCH ?? "main";

  const baseUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/assets/`;

  const dl = new DownloaderHelper(
    `${baseUrl}${assetName}`,
    `${process.cwd()}${path}`,
  );

  await dl.on("error", err => errLog(err));
  await dl.start().catch(err => errLog(err));
};
