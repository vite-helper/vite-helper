export const finalLogs = (projectName: string) => {
  console.log("");
  console.log("Done! Now run:");
  console.log("");
  console.log(`cd ${projectName}`);
  console.log(`"npm install" or "yarn"`);
  console.log(`"npm run dev" or "yarn dev"`);
  console.log("");
};

export const errLogs = (err: NodeJS.ErrnoException | null) => {
  console.log("Error: " + err);
};
