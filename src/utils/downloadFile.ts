import { DownloaderHelper } from "node-downloader-helper";

export const downloadFile = (assetName: string, path: string) => {
  const baseUrl =
    "https://raw.githubusercontent.com/vite-helper/vite-helper/develop/assets/";

  const dl = new DownloaderHelper(
    `${baseUrl}${assetName}`,
    `${process.cwd()}${path}`,
  );
  dl.on("error", err => console.log("Download Failed", err));
  dl.start().catch(err => console.error(err));
};
