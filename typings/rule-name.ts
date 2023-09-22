// Rule name primitive definition

export type Namespace = "debug" | "hooks" | "jsx" | "naming-convention";

type No = "no";

export type PositiveModifier = "ensure" | "prefer" | "strict";

export type NegativeModifier = "prevent" | No;

export type Modifier = NegativeModifier | PositiveModifier;

export type NegativeDescriptive =
    | "complicated"
    | "confusing"
    | "danger"
    | "deprecated"
    | "duplicate"
    // | "falsely"
    // | "forbidden"
    // | "incompatible"
    // | "inlined"
    // | "invalid"
    | "leaked"
    | "legacy"
    // | "misleading"
    | "missing"
    | "misused"
    // | "mixing"
    // | "outdated"
    // | "redundant"
    // | "restricted"
    // | "suppressing"
    | "suspicious"
    | "unescaped"
    // | "uninitialized"
    // | "unknown"
    // | "unreachable"
    | "unneeded"
    | "unsafe"
    | "unstable"
    | "unused"
    | "useless";

export type PositiveDescriptive = "explicit" | "optimal" | "optimized" | "standard" | "strict";

export type NeutralDescriptive =
    | "access"
    | "calling"
    | "constructed"
    | "empty"
    | "extra"
    | "implicit"
    | "inside"
    | "outside"
    | "shorthand";

export type Descriptive = NegativeDescriptive | NeutralDescriptive | PositiveDescriptive;

// Comment out unused terms to reduce the type checking overhead
export type Term =
    // | "any"
    // | "api"
    | "argument"
    | "array"
    | "array-index"
    | "arrow-function"
    | "attribute"
    // | "block"
    | "boolean"
    | "cache"
    | "callback"
    // | "case"
    // | "catch"
    | "children"
    | "class"
    | "class-component"
    | "class-method"
    | "class-property"
    | "clone-element"
    | "comment"
    | "component"
    | "computed"
    | "computed-property"
    | "conditional-rendering"
    | "const"
    | "constant"
    | "constructor"
    | "context"
    // | "context-consumer"
    // | "context-provider"
    // | "context-value"
    | "createRef"
    | "default-props"
    | "deps"
    | "destructuring"
    | "destructuring-assignment"
    | "direct-mutation"
    | "display-name"
    // | "document"
    | "effect"
    | "element"
    | "entities"
    // | "error"
    | "event"
    | "event-handler"
    | "exhaustive-deps"
    | "expression"
    // | "extends"
    // | "external"
    // | "false"
    | "filename"
    | "forward-ref"
    | "fragment"
    | "function"
    | "function-component"
    | "function-name"
    // | "global"
    | "handler"
    // | "hook"
    // | "html"
    | "id"
    | "index"
    // | "index-signature"
    // | "inferred"
    // | "inferred-type"
    | "input"
    // | "instance"
    // | "interface"
    | "key"
    // | "keyword"
    // | "label"
    // | "length"
    // | "let"
    | "literal"
    // | "local"
    // | "loop"
    | "map"
    // | "member"
    | "memo"
    | "memoized-function"
    | "method"
    // | "module"
    | "name"
    | "namespace"
    // | "native"
    | "nested-components"
    // | "new"
    // | "node"
    // | "null"
    // | "number"
    // | "object"
    // | "override"
    | "parameter"
    // | "private"
    | "prop"
    // | "public"
    // | "pure"
    // | "pure-function"
    // | "query"
    | "react"
    // | "readonly"
    | "ref"
    // | "regexp"
    | "render"
    | "return"
    // | "set"
    // | "setter"
    | "shorthand"
    // | "source"
    | "spread"
    | "state"
    // | "static"
    | "string"
    | "string-refs"
    | "style"
    // | "symbol"
    // | "tag"
    | "ternary"
    | "textnodes";
// | "type"
// | "undefined"
// | "use-callback"
// | "use-context"
// | "use-effect"
// | "use-imperative-handle"
// | "use-layout-effect"
// | "use-memo"
// | "use-reducer"
// | "use-ref"
// | "use-state"
// | "value"
// | "variable";

export type Additional = string;

export type RuleName =
    | `${NegativeModifier}-${NegativeDescriptive | NeutralDescriptive}-${Term}`
    | `${NegativeModifier}-${NegativeDescriptive | NeutralDescriptive}-${Term}-${Additional}`
    | `${No}-${Term}`
    | `${No}-${Term}-${Additional}`
    | `${PositiveModifier}-${NeutralDescriptive | PositiveDescriptive}-${Term}`
    | `${PositiveModifier}-${NeutralDescriptive | PositiveDescriptive}-${Term}-${Additional}`
    | `${PositiveModifier}-${Term}`
    | `${PositiveModifier}-${Term}-${Additional}`;
