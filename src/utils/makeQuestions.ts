import inquirer from "inquirer";

interface IQuestionsData {
  tools: string[];
  projectDetails: {
    projectName: string;
    isTypescript: boolean;
  };
}

export const makeQuestions = async (): Promise<IQuestionsData> => {
  const projectDetails = await inquirer.prompt([
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
  ]);

  const { tools } = await inquirer.prompt({
    type: "checkbox",
    name: "tools",
    message: "Which tools do you want to use?",
    choices: [
      "🧑‍💻 | ESlint, Prettier and Editorconfig",
      "🧑‍💻 | Vite svgr",
      "✨ | React Router Dom",
      "🎨 | Tailwind",
    ],
  });

  return { tools, projectDetails };
};
