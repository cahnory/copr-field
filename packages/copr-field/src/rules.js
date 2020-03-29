import {
  INVALIDE_RULE,
  INVALIDE_RULE_ARGS,
  INVALIDE_RULE_META,
  INVALIDE_RULE_OPERATOR,
  INVALIDE_RULE_TEST,
  INVALIDE_TEST_RETURN,
  VALIDATION_RULE,
} from './errors';

export const forceRuleList = rule => (!Array.isArray(rule) ? [rule] : rule);

export const prepareRule = rule => {
  if (typeof rule === 'function') {
    return prepareTest({ test: rule });
  }

  if (!rule || typeof rule !== 'object' || Array.isArray(rule)) {
    throw new Error(INVALIDE_RULE);
  }

  return typeof rule.test === 'function'
    ? prepareTest(rule)
    : prepareLogic(rule);
};

export const prepareRuleList = rules => forceRuleList(rules).map(prepareRule);

export const prepareLogic = rule => {
  const logicRule = {
    meta: prepareRuleMeta(rule.meta),
    operator: prepareLogicOperator(rule.operator),
    rules: [].concat(rule.rules).map(prepareRule),
  };
  logicRule.validate = (value, context, observer) =>
    runLogicRule(logicRule, value, context, observer);

  return logicRule;
};

export const prepareTest = rule => {
  const test = {
    getArgs: prepareRuleGetArgs(rule.getArgs || rule.args),
    meta: prepareRuleMeta(rule.meta),
    test: prepareRuleTest(rule.test),
  };
  test.validate = (value, context, observer) =>
    runTestRule(test, value, context, observer);

  return test;
};

export const prepareRuleGetArgs = (args = () => []) => {
  if (typeof args === 'function') {
    return args;
  }

  if (!Array.isArray(args)) {
    throw new Error(INVALIDE_RULE_ARGS);
  }

  return () => args;
};

export const prepareRuleMeta = (meta = {}) => {
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) {
    throw new Error(INVALIDE_RULE_META);
  }

  return meta;
};

export const prepareRuleTest = test => {
  if (typeof test !== 'function') {
    throw new Error(INVALIDE_RULE_TEST);
  }

  return test;
};

export const prepareLogicOperator = operator => {
  if (typeof operator === 'function') {
    return operator;
  }

  if (operator) {
    throw new Error(INVALIDE_RULE_OPERATOR);
  }

  return allOperator;
};

export const runRuleList = (value, ruleList, context, observer) => {
  const results = collectRuleResults(value, ruleList, context, {
    next: nextResult =>
      observer.next({
        content: nextResult.content,
        ...allOperator(nextResult),
      }),
    complete: observer.complete,
  });

  return {
    content: results.content,
    ...allOperator(results),
  };
};

export const runLogicRule = (rule, value, context, observer) =>
  runLogicOperator(
    rule,
    value,
    collectRuleResults(value, rule.rules, context, {
      next: nextResult =>
        observer.next(runLogicOperator(rule, value, nextResult)),
      complete: observer.complete,
    }),
  );

export const runTestRule = (rule, value, context, observer) => {
  const isValid = rule.test(value, ...rule.getArgs(context));
  const isPending = typeof isValid !== 'boolean';

  if (isPending) {
    Promise.resolve(isValid).then(asyncPass => {
      const passIsValid = typeof asyncPass === 'boolean';
      observer.next({
        content: [],
        error: asyncPass ? undefined : VALIDATION_RULE,
        isEmpty: false,
        isPending: false,
        isValid: passIsValid && asyncPass,
        node: rule,
        nodeType: 'test',
        value,
      });
      observer.complete();

      if (!passIsValid) {
        throw new Error(INVALIDE_TEST_RETURN);
      }
    });
  }

  return {
    content: [],
    error: !isPending && isValid ? undefined : VALIDATION_RULE,
    isEmpty: false,
    isPending,
    isValid: !isPending && isValid,
    node: rule,
    nodeType: 'test',
    value,
  };
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

export const collectRuleResults = (value, rules, context, observer) => {
  let pendings = 0;
  let result = rules.reduce(
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
      const subResult = rule.validate(value, context, subObserver);

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

  return result;
};

export const allOperator = ({ isPending, failures }) => ({
  isPending,
  isValid: !failures,
});

export const notOperator = ({ isPending, failures }) => ({
  isPending,
  isValid: !!failures,
});

export const oneOfOperator = ({ isPending, passes }) => ({
  isPending: !!passes || isPending,
  isValid: !!passes,
});

export const all = allRule =>
  prepareLogic({
    ...allRule,
    operator: allOperator,
  });

export const not = notRule =>
  prepareLogic({
    ...notRule,
    operator: notOperator,
  });

export const oneOf = oneOfRule =>
  prepareLogic({
    ...oneOfRule,
    operator: oneOfOperator,
  });
