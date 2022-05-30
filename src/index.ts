import { createVite } from "./scripts/createVite";
import { addDependencies } from "./utils/addDependencies";
import { createCommit } from "./utils/createCommit";
import { execScript } from "./utils/execScript";
import { isReactViteProject, isTypescript } from "./utils/identify";
import { finalLogs } from "./utils/logs";
import { makeQuestions } from "./utils/makeQuestions";
import { silentExec } from "./utils/silentExec";

const main = async () => {
  const { isScratch, tools, projectDetails } = await makeQuestions();

  let isTypescriptProject = projectDetails?.isTypescript ?? false;

  if (!isScratch) {
    if (!isReactViteProject())
      return console.log(
        "Error identifying that you are in a react project with vite, please check your directory",
      );

    isTypescriptProject = isTypescript();
  } else {
    projectDetails &&
      createVite({
        isTypescript: projectDetails.isTypescript,
        packageName: projectDetails.projectName,
      });
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

  setTimeout(() => {
    silentExec("git init");
    silentExec("git add .");
    createCommit("Initial commit from vite-helper");
    projectDetails && finalLogs(projectDetails.projectName);
  }, 3000);
};

main();
