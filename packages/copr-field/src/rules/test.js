import createMeta from '../meta';
import {
  INVALIDE_TEST_ARGS,
  INVALIDE_TEST_FUNC,
  INVALIDE_TEST_RETURN,
  VALIDATION_RULE,
} from '../errors';

const createTestRule = rule => {
  if (typeof rule.test !== 'function') {
    throw new Error(INVALIDE_TEST_FUNC);
  }

  const testRule = {
    getArgs: createTestGetArgs(
      rule.args === undefined ? rule.getArgs : rule.args,
    ),
    meta: createMeta(rule.meta),
    test: rule.test,
  };
  testRule.validate = (value, options, observer) =>
    validate(testRule, value, options, observer);

  return testRule;
};

export default createTestRule;

export const validate = (rule, value, options, observer) => {
  const isValid = rule.test(value, ...rule.getArgs({ ...options, rule }));
  const isPending = typeof isValid !== 'boolean';

  if (isPending) {
    Promise.resolve(isValid).then(asyncPass => {
      const passIsValid = typeof asyncPass === 'boolean';

      if (!passIsValid) {
        observer.error(new Error(INVALIDE_TEST_RETURN));
      }

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

export const createTestGetArgs = (args = []) => {
  const getArgs = Array.isArray(args) ? () => args : args;

  if (typeof getArgs !== 'function') {
    throw new Error(INVALIDE_TEST_ARGS);
  }

  return getArgs;
};
