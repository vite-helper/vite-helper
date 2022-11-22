import axios from "axios";

import { IGithubFile } from "../@types";

interface IFileRequestProps {
  path: string;
  branch: string;
}

export const fileRequest = async ({ path, branch }: IFileRequestProps) => {
  const response = await axios.get(
    `https://api.github.com/repos/vite-helper/vite-helper/contents/${path}?ref=${branch}`,
  );

  const data = (await response.data) as IGithubFile;
  const content = Buffer.from(data.content, "base64").toString("utf-8");

  return content;
};
