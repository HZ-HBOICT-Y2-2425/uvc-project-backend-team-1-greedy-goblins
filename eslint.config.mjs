import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
import visualComplexity from "eslint-plugin-visual-complexity";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: {
      pluginJest: pluginJest,
      pluginJs: pluginJs,
      visual: visualComplexity
    },
    rules: {
      "visual/complexity": ["error", { max: 6 }],
      complexity: 0, // <- disable core complexity rule
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        jest: true,
        describe: true,
        expect: true,
        it: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
      },
    },
  },
];
