import "dotenv/config";
import { DownloaderHelper } from "node-downloader-helper";

import { errLog } from "./logs";

export const downloadFile = async (
  assetPath: string,
  destinationPath = "",
): Promise<void> => {
  const username = process.env.GITHUB_USERNAME ?? "vite-helper";
  const repo = process.env.GITHUB_REPO ?? "vite-helper";
  const branch = process.env.GITHUB_BRANCH ?? "main";

  const baseUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/templates/`;

  return new Promise((resolve, reject) => {
    const dl = new DownloaderHelper(
      `${baseUrl}${assetPath}`,
      `${process.cwd()}${destinationPath}`,
    );

    console.log(`Downloading: ${assetPath}`);

    dl.on("end", () => resolve());

    dl.start().catch(err => {
      errLog(assetPath + String(err).replace("Error:", ", "));
      reject(err);
    });

    dl.on("error", err => {
      errLog(assetPath + String(err).replace("Error:", ", "));
      reject(err);
    });
  });
};
