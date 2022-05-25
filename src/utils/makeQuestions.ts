import inquirer from "inquirer";

interface IQuestionsData {
  isScratch: boolean;
  tools: string[];
  projectDetails?: {
    projectName: string;
    packageManager: string;
    isTypescript: boolean;
  };
}

export const makeQuestions = async (): Promise<IQuestionsData> => {
  const { isScratch } = await inquirer.prompt({
    type: "confirm",
    name: "isScratch",
    message: "Do you want to create a project from scratch?",
  });

  let projectDetails = null;
  if (isScratch) {
    projectDetails = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your project?",
        default: "my-project",
      },
      {
        type: "confirm",
        name: "isTypescript",
        message: "Do you want to use typescript?",
        default: false,
      },
      {
        type: "list",
        name: "packageManager",
        message: "Which package manager do you want to use?",
        choices: ["npm", "yarn"],
      },
    ]);
  }

  const { tools } = await inquirer.prompt({
    type: "checkbox",
    name: "tools",
    message: "Which tools do you want to use?",
    choices: ["ESlint, Prettier and Editorconfig", "Vite Svgr"],
  });

  return { isScratch, tools, projectDetails };
};
