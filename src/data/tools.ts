import * as script from "../scripts";

export const availableToolsThree: any = {
  type: "tree",
  name: "tools",
  loop: false,
  multiple: true,
  validate: (value: string | null) => !!value,
  message: "Which tools do you want to use? ()",
  tree: [
    {
      name: "🧑‍💻 | Improve Developer Experience",
      value: "",
      children: [
        {
          name: "ESlint, Prettier and Editorconfig",
          value: script.eslintPrettierEditorConfig,
        },
      ],
    },
    {
      name: "🎨 | Style Libraries",
      value: "",
      children: [
        {
          name: "Tailwind",
          value: script.tailwindConfig,
        },
      ],
    },
    {
      name: "🧪 | Tests",
      value: "",
      children: [
        {
          name: "Vitest",
          value: script.vitest,
        },
      ],
    },
    {
      name: "✨ | Others",
      value: "",
      children: [
        {
          name: "React Router Dom",
          value: script.reactRouterDom,
        },
      ],
    },
  ],
};
