import { DownloaderHelper } from "node-downloader-helper";

import { errLogs } from "./logs";

export const downloadFile = async (assetName: string, path: string) => {
  const baseUrl =
    "https://raw.githubusercontent.com/wesleyara/vite-helper/develop/assets/";

  const dl = new DownloaderHelper(
    `${baseUrl}${assetName}`,
    `${process.cwd()}${path}`,
  );
  await dl.on("error", err => console.log("Download Failed", err));
  await dl.start().catch(err => errLogs(err));
};
