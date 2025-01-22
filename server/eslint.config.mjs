// @ts-check

import eslint from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
const eslintPluginImport = await import("eslint-plugin-import");

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierRecommended,
  {
    languageOptions: {
      globals: {
        Buffer: "readonly", // This tells ESLint 'Buffer' is a global variable and should not be modified
        URL: "readonly", // This tells ESLint 'URL' is a global variable and should not be modified
        URLSearchParams: "readonly", // This tells ESLint 'URL' is a global variable and should not be modified
        fetch: "readonly", // This tells ESLint 'fetch' is a global variable and should not be modified
        process: "readonly", // This tells ESLint that 'process' is a global variable and should not be modified
        console: "readonly", // Declare 'console' as a global variable (readonly means it should not be reassigned)
      },
    },
    ignores: [
      "dist",
      ".next",
      ".vscode",
      "__tests__",
      "scripts",
      "node_modules",
      "*.mjs",
      "*.js",
    ],
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Disable the 'no-explicit-any' rule
      "no-unused-vars": "off", // Disable the native 'no-unused-vars' rule
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);
