import chalk from "chalk";

export const finalLogs = (projectName: string) => {
  console.log("");
  console.log(chalk.green("Done! Now run:"));
  console.log("");
  console.log(chalk.blue(`cd ${projectName}`));
  console.log(`${chalk.blue("npm install")} or ${chalk.blue("yarn")}`);
  console.log(`${chalk.blue("npm run dev")} or ${chalk.blue("yarn dev")}`);
  console.log("");
};

export const errLogs = (err: NodeJS.ErrnoException | null) => {
  console.log("Error: " + chalk.red(err));
};
