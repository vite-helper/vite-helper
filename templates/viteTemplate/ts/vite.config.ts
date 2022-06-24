import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPath from "vite-tsconfig-paths";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsconfigPath(),
    checker({ typescript: true }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
});
