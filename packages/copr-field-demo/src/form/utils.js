export const onChange = test => {
  const testRule = typeof test === 'function' ? { test } : test;
  const getArgs =
    (testRule.args && (() => testRule.args)) || testRule.getArgs || (() => []);

  return {
    ...testRule,
    test: (value, previous, changed, args) =>
      changed ? testRule.test(...args) : previous,
    getArgs: options => {
      const ruleResult = getRulePrevResult(options);

      return [
        !!ruleResult && ruleResult.isValid,
        !ruleResult ||
          ruleResult.isPending ||
          options.fieldPath.reduce(
            (value, name) => value[name],
            options.context.value,
          ) !== ruleResult.value,
        getArgs(options),
      ];
    },
  };
};

export const getRulePrevResult = ({ fieldPath, rulePath, context }) => {
  const { prevResult } = context;

  if (!prevResult) {
    return undefined;
  }

  const coprResult =
    prevResult &&
    fieldPath.reduce((result, name) => result.content[name], prevResult);

  return rulePath.reduce((result, index) => result.content[index], coprResult);
};

export const getRuleValue = options =>
  options.fieldPath.reduce((value, name) => value[name], options.context.value);
