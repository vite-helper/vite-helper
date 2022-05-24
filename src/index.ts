import inquirer from "inquirer";

const main = async () => {
  const isScratchAsk = await inquirer.prompt({
    type: "confirm",
    name: "action",
    message: "Do you want to create a project from scratch?",
  });

  const fullProject = async () => {
    const response = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your project?",
        default: "my-project",
      },
      {
        type: "confirm",
        name: "typescript",
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

    return response;
  };

  isScratchAsk.action && (await fullProject());

  const tools = await inquirer.prompt({
    type: "checkbox",
    name: "tools",
    message: "Which tools do you want to use?",
    choices: ["ESlint, Prettier and Editorconfig", "Jest"],
  });

  console.log(isScratchAsk, "isScratchAsk");
  console.log(fullProject, "fullProject");
  console.log(tools, "tools");
};

main();
