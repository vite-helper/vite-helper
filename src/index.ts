import { execScript } from "./utils/execScript";
import { isReactViteProject, isTypescript, pkgManager } from "./utils/identify";
import { makeQuestions } from "./utils/makeQuestions";

const main = async () => {
  const { isScratch, tools } = await makeQuestions();

  if (!isScratch) {
    if (!isReactViteProject())
      console.log(
        "Error identifying that you are in a react project with vite, please check your directory",
      );

    const packageManager = pkgManager();
    const isTypescriptProject = isTypescript();

    tools.forEach(tool => {
      execScript(tool, packageManager, isTypescriptProject);
    });

    return;
  }

  console.log("Logic if it's a project from scratch");
};

main();
