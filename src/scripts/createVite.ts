import fs from "fs";
import shell from "shelljs";

type CreateViteProp = {
  isTypescript: boolean;
  packageName: string;
};

export const createVite = async ({
  isTypescript,
  packageName,
}: CreateViteProp) => {
  if (isTypescript) {
    shell.exec("git clone https://github.com/vite-helper/vite-with-react-ts");

    fs.renameSync("vite-with-react-ts", packageName);

    shell.cd(packageName);

    fs.readFile("./package.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }

      const result = data.replace(/vite-with-react-ts/g, packageName);

      fs.writeFile("./package.json", result, "utf8", err => {
        if (err) throw err;
      });
    });
  } else {
    shell.exec("git clone https://github.com/vite-helper/vite-with-react-js");

    fs.renameSync("vite-with-react-js", packageName);

    shell.cd(packageName);

    fs.readFile("./package.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }

      const result = data.replace(/vite-with-react-ts/g, packageName);

      fs.writeFile("./package.json", result, "utf8", err => {
        if (err) throw err;
      });
    });
  }
};
