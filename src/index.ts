import { addDependencies } from "./utils/addDependencies";
import { execScript } from "./utils/execScript";
import { isReactViteProject, isTypescript } from "./utils/identify";
import { makeQuestions } from "./utils/makeQuestions";

const main = async () => {
  const { isScratch, tools, projectDetails } = await makeQuestions();

  let isTypescriptProject = projectDetails?.isTypescript ?? false;

  if (!isScratch) {
    if (!isReactViteProject())
      return console.log(
        "Error identifying that you are in a react project with vite, please check your directory",
      );

    isTypescriptProject = isTypescript();
  }

  let dependenciesArr: string[] = [];
  let devDependenciesArr: string[] = [];

  tools.forEach(tool => {
    const { dependencies, devDependencies } = execScript(
      tool,
      isTypescriptProject,
    );

    dependenciesArr = [...dependenciesArr, ...dependencies];
    devDependenciesArr = [...devDependenciesArr, ...devDependencies];
  });

  await addDependencies({
    dependencies: dependenciesArr,
    devDependencies: devDependenciesArr,
  });
};

main();
