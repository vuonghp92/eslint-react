import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-misused-comment-in-textnode";

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

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    "<App foo='test'>{/* valid */}</App>",
    "<strong>&nbsp;https://www.example.com/attachment/download/1</strong>",
    "<App /* valid */ placeholder={'foo'}/>",
    "</* valid */></>",
  ],
  invalid: [
    {
      code: "<div>// invalid</div>",
      errors: [{ messageId: "NO_MISUSED_COMMENT_IN_TEXTNODE" }],
    },
    {
      code: "<>// invalid</>",
      errors: [{ messageId: "NO_MISUSED_COMMENT_IN_TEXTNODE" }],
    },
    {
      code: "<div>/* invalid */</div>",
      errors: [{ messageId: "NO_MISUSED_COMMENT_IN_TEXTNODE" }],
    },
    {
      code: dedent`
        <div>
        // invalid
        </div>
      `,
      errors: [{ messageId: "NO_MISUSED_COMMENT_IN_TEXTNODE" }],
    },
    {
      code: dedent`
        <div>
        abcdef
        /* invalid */
        foo
        </div>
      `,
      errors: [{ messageId: "NO_MISUSED_COMMENT_IN_TEXTNODE" }],
    },
    {
      code: dedent`
        <div>
        {'abcdef'}
        // invalid
        {'foo'}
        </div>
      `,
      errors: [{ messageId: "NO_MISUSED_COMMENT_IN_TEXTNODE" }],
    },
    {
      code: "<span>/*</span>",
      errors: [{ messageId: "NO_MISUSED_COMMENT_IN_TEXTNODE" }],
    },
  ],
});
