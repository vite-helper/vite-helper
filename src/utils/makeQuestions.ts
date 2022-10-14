import inquirer from "inquirer";
import treePrompt from "inquirer-tree-prompt";

import { availableToolsThree } from "../data/tools";
import { IDependencies } from "../interfaces/Dependencies";
import { IProjectDetails } from "../interfaces/ProjectDetails";

type ITool = (isTypescript: boolean) => Promise<IDependencies>;

inquirer.registerPrompt("tree", treePrompt);

export const makeQuestions = async () => {
  const projectDetails = await inquirer.prompt<IProjectDetails>([
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
      type: "confirm",
      name: "installTools",
      message: "Do you want to add additional tools?",
      default: false,
    },
  ]);

  if (projectDetails.installTools) {
    console.log("");
    console.log(
      "Use the side arrows on the keyboard to open or close a tree, the up and down arrows to navigate through categories and the spacebar to select a tool",
    );
    console.log("");

    const { tools } = await inquirer.prompt<{ tools: ITool[] }>(
      availableToolsThree,
    );
    return { tools, projectDetails };
  }

  return { tools: [], projectDetails };
};
