import { prompt } from "inquirer";

import { IProjectDetails } from "../interfaces/ProjectDetails";

export const makeQuestions = async () => {
  const projectDetails = await prompt<IProjectDetails>([
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

  const { tools } = await prompt<{ tools: string[] }>({
    type: "checkbox",
    name: "tools",
    message: "Which tools do you want to use?",
    choices: [
      "ESlint, Prettier and Editorconfig",
      "React Router Dom",
      "Tailwind",
      "Vitest",
    ],
  });

  return { tools, projectDetails };
};
