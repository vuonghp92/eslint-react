import dedent from "dedent";

import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./component-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "<Test_component />",
      errors: [{ messageId: "COMPONENT_NAME" }],
    },
    {
      code: "<TestComponent />",
      errors: [{ messageId: "COMPONENT_NAME" }],
      options: [{ rule: "CONSTANT_CASE" }],
    },
    {
      code: "<TestComponent />",
      errors: [{ messageId: "COMPONENT_NAME" }],
      options: ["CONSTANT_CASE"],
    },
    {
      code: dedent`
        function APP_HOME() {
            return <div>foo</div>
        }
      `,
      errors: [{ messageId: "COMPONENT_NAME" }],
    },
    {
      code: dedent`
        function AppHome() {
            return <div>foo</div>
        }
      `,
      errors: [{ messageId: "COMPONENT_NAME" }],
      options: [{ rule: "CONSTANT_CASE" }],
    },
  ],
  valid: [
    ...allFunctions,
    "<testcomponent />",
    "<testComponent />",
    "<test_component />",
    "<TestComponent />",
    "<CSSTransitionGroup />",
    "<BetterThanCSS />",
    "<TestComponent><div /></TestComponent>",
    "<Test1Component />",
    "<TestComponent1 />",
    "<T3StComp0Nent />",
    "<Éurströmming />",
    "<Año />",
    "<Søknad />",
    "<T />",
    "<Modal.Header />",
    "<qualification.T3StComp0Nent />",
    "<Modal:Header />",
    "<H1>Hello!</H1>",
    "<Typography.P />",
    "<motion.div />",
    "<FULLUPPERCASE />",
    {
      code: "<_TestComponent />",
      options: ["PascalCase"],
    },
    {
      code: "<_TEST_COMPONENT />",
      options: ["CONSTANT_CASE"],
    },
    {
      code: "<_TestComponent />",
      options: [{ rule: "PascalCase" }],
    },
    {
      code: "<_TEST_COMPONENT />",
      options: [{ rule: "CONSTANT_CASE" }],
    },
    dedent`
      function AppHome() {
          return <div>foo</div>
      }
    `,
    {
      code: dedent`
        function APP_HOME() {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "CONSTANT_CASE" }],
    },
    dedent`
      const AppHome = () => {
          return <div>foo</div>
      }
    `,
    {
      code: dedent`
        const APP_HOME = () => {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "CONSTANT_CASE" }],
    },
    {
      code: dedent`
        const AppHome = function () {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "PascalCase" }],
    },
    {
      code: dedent`
        const AppHome = function () {
            return <div>foo</div>
        }
      `,
      options: [{
        excepts: [
          "AppHome",
        ],
        rule: "CONSTANT_CASE",
      }],
    },
  ],
});
