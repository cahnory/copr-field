import {
  INVALIDE_RULE,
  INVALIDE_RULE_ARGS,
  INVALIDE_RULE_META,
  INVALIDE_RULE_TEST,
} from './errors';

export const forceRuleList = rule => (!Array.isArray(rule) ? [rule] : rule);

export const prepareRuleList = rules =>
  forceRuleList(rules).map(rule => prepareRule(rule));

export const prepareRule = rule => {
  if (typeof rule === 'function') {
    return prepareRule({ test: rule });
  }

  if (typeof rule !== 'object') {
    throw new Error(INVALIDE_RULE);
  }

  let { test, meta = {} } = rule;
  let getArgs;
  const { args: fixedArgs = [], getArgs: unsafeGetArgs } = rule;

  if (typeof meta !== 'object' || Array.isArray(meta)) {
    throw new Error(INVALIDE_RULE_META);
  }

  if (rule.all) {
    return {
      all: prepareRuleList(rule.all, meta),
      meta,
    };
  }

  if (rule.not) {
    return { not: prepareRuleList(rule.not), meta };
  }

  if (rule.oneOf) {
    return { oneOf: prepareRuleList(rule.oneOf), meta };
  }

  if (typeof test !== 'function') {
    throw new Error(INVALIDE_RULE_TEST);
  }

  if (!Array.isArray(fixedArgs)) {
    throw new Error(INVALIDE_RULE_ARGS);
  }

  if (typeof getArgs !== 'function') {
    getArgs = () => fixedArgs;
  } else {
    getArgs = context => {
      const args = unsafeGetArgs(context);

      if (!Array.isArray(args)) {
        throw new Error(INVALIDE_RULE_ARGS);
      }

      return args;
    };
  }

  return { test, getArgs, meta };
};

export const runPreparedRuleList = (value, ruleList, context) => {
  const { failures, content } = collectSubResults(value, ruleList, context);

  return { pass: !failures, content };
};

export const runPreparedRule = (value, rule, context) => {
  if (rule.all) {
    return runPreparedRuleIntersection(value, rule, context);
  } else if (rule.not) {
    return runPreparedRuleNot(value, rule, context);
  } else if (rule.oneOf) {
    return runPreparedRuleUnion(value, rule, context);
  } else {
    return {
      pass: rule.test(value, ...rule.getArgs(context)),
      rule,
      content: [],
    };
  }
};

export const runPreparedRuleIntersection = (value, rule, context) => {
  const { failures, content } = collectSubResults(value, rule.all, context);

  return { pass: !failures, rule, content };
};

export const runPreparedRuleNot = (value, rule, context) => {
  const { failures, content } = collectSubResults(value, rule.not, context);

  return { pass: !!failures, rule, content };
};

export const runPreparedRuleUnion = (value, rule, context) => {
  const { passes, content } = collectSubResults(value, rule.oneOf, context);

  return { pass: !!passes, rule, content };
};

export const collectSubResults = (value, rules, context) =>
  rules.reduce(
    (acc, rule) => {
      const result = runPreparedRule(value, rule, context);

      acc[result.pass ? 'passes' : 'failures'] += 1;
      acc.content.push(result);

      return acc;
    },
    { failures: 0, passes: 0, content: [] },
  );
