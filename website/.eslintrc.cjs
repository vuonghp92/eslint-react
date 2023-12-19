// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: true,
    sourceType: "module",
  },
  extends: [
    "with-tsconfig",
    "next",
    "next/core-web-vitals",
  ],
  plugins: ["react-hooks"],
  rules: {
    "unicorn/new-for-builtins": "off",
    "unicorn/no-keyword-prefix": "off",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/template-indent": [
      "warn",
      {
        indent: 2,
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:react-hooks/recommended",
        // Using all preset here because we also use it for testing purposes, not recommended for normal projects
        "plugin:@eslint-react/all-legacy",
      ],
      rules: {
        "@eslint-react/naming-convention/filename": ["warn", "kebab-case"],
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "spaced-comment": "off",
      },
    },
    {
      files: ["*.mdx"],
      extends: ["plugin:mdx/recommended"],
    },
  ],
});
