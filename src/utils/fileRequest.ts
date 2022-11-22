import axios from "axios";
import fs from "fs";

import { IGithubFile } from "../@types";

interface IFileRequestProps {
  path: string;
  branch: string;
  file?: string;
}

export const fileRequest = async ({
  path,
  branch,
  file,
}: IFileRequestProps) => {
  const response = await axios.get(
    `https://api.github.com/repos/vite-helper/vite-helper/contents/${path}?ref=${branch}`,
  );

  const data = (await response.data) as IGithubFile;
  const content = Buffer.from(data.content, "base64").toString("utf-8");

  if (file) {
    return fs.writeFileSync(file, content);
  }

  return content;
};
