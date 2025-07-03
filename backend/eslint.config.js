import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
];
