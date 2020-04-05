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

  const getArgs = Array.isArray(rule.args) ? () => rule.args : rule.getArgs;

  if (typeof getArgs !== 'function') {
    throw new Error(INVALIDE_TEST_ARGS);
  }

  const testRule = {
    getArgs,
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
