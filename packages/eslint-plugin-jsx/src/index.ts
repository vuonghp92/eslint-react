// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import jsxNoArrayIndexKey from "./rules/no-array-index-key";
import jsxNoDuplicateKey from "./rules/no-duplicate-key";
import jsxNoLeakedConditionalRendering from "./rules/no-leaked-conditional-rendering";
import jsxNoMissingKey from "./rules/no-missing-key";
import jsxNoMisusedCommentInTextNode from "./rules/no-misused-comment-in-textnode";
import jsxNoScriptUrl from "./rules/no-script-url";
import jsxNoSpreadingKey from "./rules/no-spreading-key";
import jsxNoUselessFragment from "./rules/no-useless-fragment";
import jsxPreferShorthandJsxBoolean from "./rules/prefer-shorthand-boolean";

export { name } from "../package.json";

export const rules = {
  "no-array-index-key": jsxNoArrayIndexKey,
  "no-duplicate-key": jsxNoDuplicateKey,
  "no-leaked-conditional-rendering": jsxNoLeakedConditionalRendering,
  "no-missing-key": jsxNoMissingKey,
  "no-misused-comment-in-textnode": jsxNoMisusedCommentInTextNode,
  "no-script-url": jsxNoScriptUrl,
  "no-spreading-key": jsxNoSpreadingKey,
  "no-useless-fragment": jsxNoUselessFragment,
  "prefer-shorthand-boolean": jsxPreferShorthandJsxBoolean,
} as const;