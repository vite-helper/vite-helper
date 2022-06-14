import { addDependencies } from "./utils/addDependencies";
import { createCommit } from "./utils/createCommit";
import { execScript } from "./utils/execScript";
import { finalLogs } from "./utils/logs";
import { makeQuestions } from "./utils/makeQuestions";
import { silentExec } from "./utils/silentExec";

const main = async () => {
  const {
    tools,
    projectDetails: { isTypescript, projectName },
  } = await makeQuestions();

  let dependenciesArr: string[] = [];
  let devDependenciesArr: string[] = [];

  tools.forEach(tool => {
    const { dependencies, devDependencies } = execScript(tool, isTypescript);

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
    finalLogs(projectName);
  }, 3000);
};

main();
