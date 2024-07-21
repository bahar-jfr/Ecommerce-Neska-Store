import { fixupConfigRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
];
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};


module.exports = {
       root: true,
       parser: '@typescript-eslint/parser',
       parserOptions: {
         ecmaVersion: 2020,
         sourceType: 'module',
         ecmaFeatures: {
           jsx: true,
         },
       },
       settings: {
         react: {
           version: 'detect',
         },
       },
       env: {
         browser: true,
         node: true,
         es6: true,
       },
       extends: [
         'standard',
         'plugin:react/recommended',
         'plugin:@typescript-eslint/recommended',
         'plugin:react-hooks/recommended',
       ],
       plugins: [
         'react',
         'react-hooks',
         '@typescript-eslint',
         'tailwindcss',
       ],
       rules: {
         'react/react-in-jsx-scope': 'off',
         '@typescript-eslint/explicit-function-return-type': 'off',
         '@typescript-eslint/no-explicit-any': 'off',
         'tailwindcss/classnames-order': 'warn',
         'tailwindcss/enforces-shorthand': 'warn',
         'tailwindcss/migration-from-tailwind-2': 'warn',
         'tailwindcss/no-arbitrary-value': 'warn',
         'tailwindcss/no-custom-classname': 'off',
       },
      }