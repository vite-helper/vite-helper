import { ErrorStats } from "node-downloader-helper";

export const finalLog = (projectName: string) => {
  console.log("");
  console.log("Now run:");
  console.log("");
  console.log(`cd ${projectName}`);
  console.log(`"npm install" or "yarn"`);
  console.log(`"npm run dev" or "yarn dev"`);
};

export const errLog = (err: NodeJS.ErrnoException | ErrorStats | string) => {
  console.log("Error: " + err);
};
