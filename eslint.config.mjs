import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        jest: true, // Add Jest globals
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
  pluginJs.configs.recommended,
  "plugin:jest/recommended",
];
