import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./filename-extension";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: rootDir,
  },
});

const withJSXElement = "const App = () => <div><div /></div>";
const withJSXFragment = "const App = () => <></>";
const withoutJSX = "";

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      filename: "react.tsx",
      code: withJSXElement,
    },
    {
      filename: "react.tsx",
      code: withJSXFragment,
    },
    {
      filename: "file.ts",
      code: withoutJSX,
    },
    {
      filename: "react.tsx",
      code: withoutJSX,
    },
  ],
  invalid: [
    {
      filename: "react.tsx",
      code: withoutJSX,
      options: [{ rule: "as-needed" }],
      errors: [
        {
          messageId: "UNEXPECTED",
        },
      ],
    },
  ],
});