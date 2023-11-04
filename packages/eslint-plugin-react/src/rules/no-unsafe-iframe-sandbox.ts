import { NodeType } from "@eslint-react/ast";
import { findPropInAttributes, findPropInProperties, getPropValue, isCreateElementCall } from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { isString } from "effect/Predicate";
import type { ConstantCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const unsafeCombinations = [
  ["allow-scripts", "allow-same-origin"],
  // ...
] as const;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow unsafe iframe sandbox attribute combinations",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_UNSAFE_IFRAME_SANDBOX: "Unsafe iframe sandbox attribute combination",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (!isCreateElementCall(node, context)) {
          return;
        }

        const [name, props] = node.arguments;

        if (!isMatching({ type: NodeType.Literal, value: "iframe" }, name)) {
          return;
        }

        if (!props || props.type !== NodeType.ObjectExpression) {
          return;
        }

        const maybeSandboxProperty = findPropInProperties(props.properties, context)("sandbox");

        if (O.isNone(maybeSandboxProperty)) {
          return;
        }

        const maybeUnsafeSandboxValue = F.pipe(
          maybeSandboxProperty,
          O.filter(isMatching({
            type: NodeType.Property,
            value: {
              type: NodeType.Literal,
              value: P.string,
            },
          })),
          O.flatMapNullable(v => v.value.value),
          O.map(v => v.split(" ")),
          O.filter(values =>
            unsafeCombinations.some(combinations => combinations.every(unsafeValue => values.includes(unsafeValue)))
          ),
        );

        if (O.isNone(maybeUnsafeSandboxValue)) {
          return;
        }

        context.report({
          messageId: "NO_UNSAFE_IFRAME_SANDBOX",
          node,
        });
      },
      JSXElement(node) {
        const { name } = node.openingElement;

        if (name.type !== NodeType.JSXIdentifier || name.name !== "iframe") {
          return;
        }

        const { attributes } = node.openingElement;

        const maybeTypeAttribute = findPropInAttributes(attributes, context)("sandbox");

        if (O.isNone(maybeTypeAttribute)) {
          return;
        }

        const isSafeSandboxValue = F.pipe(
          getPropValue(maybeTypeAttribute.value, context),
          O.flatMapNullable(v => v?.value),
          O.filter(isString),
          O.map((value) => value.split(" ")),
          O.filter(values =>
            unsafeCombinations.some(combinations => combinations.every(unsafeValue => values.includes(unsafeValue)))
          ),
          O.isNone,
        );

        if (isSafeSandboxValue) {
          return;
        }

        context.report({
          messageId: "NO_UNSAFE_IFRAME_SANDBOX",
          node,
        });
      },
    };
  },
});