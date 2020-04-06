import createMeta from '../meta';
import createTestRule from './test';
import { INVALIDE_OPERATOR, INVALIDE_RULE, VALIDATION_RULE } from '../errors';

const createLogicRule = rule => {
  const logicRule = {
    meta: createMeta(rule.meta),
    operator: createOperator(rule.operator),
    rules: createRuleList(rule.rules),
  };
  logicRule.validate = (value, options, observer) =>
    validate(logicRule, value, options, observer);

  return logicRule;
};

export default createLogicRule;

export const createRule = rule => {
  if (typeof rule === 'function') {
    return createRule({ test: rule });
  }

  if (!rule || typeof rule !== 'object' || Array.isArray(rule)) {
    throw new Error(INVALIDE_RULE);
  }

  return typeof rule.test === 'function'
    ? createTestRule(rule)
    : createLogicRule(rule);
};

export const createRuleList = rules =>
  (!Array.isArray(rules) ? [rules] : rules).map(createRule);

export const createOperator = operator => {
  if (typeof operator !== 'function') {
    throw new Error(INVALIDE_OPERATOR);
  }

  return operator;
};

export const validate = (logic, value, options, observer) => {
  let pendings = 0;
  let result = logic.rules.reduce(
    (acc, rule, index) => {
      const subObserver = {
        next: asyncSubResult => {
          if (subResult.isPending && !asyncSubResult.isPending) {
            pendings -= 1;
          }

          result = {
            failures: result.failures - (asyncSubResult.isValid ? 1 : 0),
            passes: result.passes + (asyncSubResult.isValid ? 1 : 0),
            isPending: !!pendings,
            content: result.content
              .slice(0, index)
              .concat(asyncSubResult)
              .concat(result.content.slice(index + 1)),
          };
          observer.next(result);
        },
        complete: () => {
          if (!pendings) {
            observer.complete();
          }
        },
      };
      const subResult = rule.validate(
        value,
        {
          ...options,
          rule,
          rulePath: (options.rulePath || []).concat(index),
        },
        subObserver,
      );

      if (subResult.isPending) {
        acc.isPending = true;
        pendings += 1;
      }

      acc[subResult.isValid ? 'passes' : 'failures'] += 1;
      acc.content.push(subResult);

      return acc;
    },
    { failures: 0, passes: 0, isPending: false, content: [] },
  );

  return runLogicOperator(logic, value, result);
};

export const runLogicOperator = (logic, value, result) => {
  const { isPending, isValid } = logic.operator(result);

  return {
    content: result.content,
    error: isValid ? undefined : VALIDATION_RULE,
    isEmpty: false,
    isPending,
    isValid,
    node: logic,
    nodeType: 'logic',
    value,
  };
};
