interface ILinks {
  self: string;
  git: string;
  html: string;
}

export interface IGithubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: ILinks;
}

export interface IDependencies {
  dependencies: string[];
  devDependencies: string[];
}

export interface IProjectDetails {
  projectName: string;
  isTypescript: boolean;
  installTools: boolean;
}
