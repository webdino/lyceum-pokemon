import withNuxt from "./.nuxt/eslint.config.mjs";
import prettier from "eslint-config-prettier";

export default withNuxt([
  { ignores: [".tsup-output/*"] },
  {
    files: ["utils/trimAvoidCharacters.js"],
    rules: { "no-control-regex": "off" },
  },
  {
    files: ["pages/new.vue", "pages/trainer/\\[name\\]/*.vue"],
    rules: { "no-irregular-whitespace": "off" },
  },
  prettier,
]);
