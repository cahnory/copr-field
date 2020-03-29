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

  if (!rule || typeof rule !== 'object' || Array.isArray(rule)) {
    throw new Error(INVALIDE_RULE);
  }

  const { test, meta = {} } = rule;
  let getArgs;
  const { args: fixedArgs = [], getArgs: unsafeGetArgs } = rule;

  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) {
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

  if (typeof unsafeGetArgs !== 'function') {
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

export const runPreparedRuleList = (value, ruleList, context, observer) =>
  subResultsToRuleListResult(
    collectSubResults(value, ruleList, context, {
      next: result => observer.next(subResultsToRuleListResult(result)),
      complete: observer.complete,
    }),
  );

export const runPreparedRule = (value, rule, context, observer) => {
  if (rule.all) {
    return runPreparedRuleIntersection(value, rule, context, observer);
  }
  if (rule.not) {
    return runPreparedRuleNot(value, rule, context, observer);
  }
  if (rule.oneOf) {
    return runPreparedRuleUnion(value, rule, context, observer);
  }
  const testResult = rule.test(value, ...rule.getArgs(context));

  let pass = testResult;
  const isPending = typeof testResult !== 'boolean';

  if (isPending) {
    pass = false;
    Promise.resolve(testResult).then(asyncPass => {
      observer.next({
        content: [],
        isPending: false,
        pass: asyncPass,
        rule,
      });
      observer.complete();
    });
  }

  return {
    content: [],
    isPending,
    pass,
    rule,
  };
};

export const runPreparedRuleIntersection = (value, rule, context, observer) =>
  subResultsToRuleIntersectionResult(
    rule,
    collectSubResults(value, rule.all, context, {
      next: result => subResultsToRuleIntersectionResult(rule, result),
      complete: observer.complete,
    }),
  );

export const runPreparedRuleNot = (value, rule, context, observer) =>
  subResultsToRuleNotResult(
    rule,
    collectSubResults(value, rule.not, context, {
      next: result => subResultsToRuleNotResult(rule, result),
      complete: observer.complete,
    }),
  );

export const runPreparedRuleUnion = (value, rule, context, observer) =>
  subResultsToRuleUnionResult(
    rule,
    collectSubResults(value, rule.oneOf, context, {
      next: result => subResultsToRuleUnionResult(rule, result),
      complete: observer.complete,
    }),
  );

export const collectSubResults = (value, rules, context, observer) => {
  let pendings = 0;
  let result = rules.reduce(
    (acc, rule, index) => {
      const subResult = runPreparedRule(value, rule, context, {
        next: asyncSubResult => {
          if (!asyncSubResult.isPending) {
            pendings -= 1;
          }
          result = {
            failures: result.failures - (asyncSubResult.pass ? 1 : 0),
            passes: result.passes + (asyncSubResult.pass ? 1 : 0),
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
      });

      if (subResult.isPending) {
        acc.isPending = true;
        pendings += 1;
      }

      acc[subResult.pass ? 'passes' : 'failures'] += 1;
      acc.content.push(subResult);

      return acc;
    },
    { failures: 0, passes: 0, isPending: false, content: [] },
  );

  return result;
};

export const subResultsToRuleListResult = ({
  isPending,
  failures,
  content,
}) => ({ content, isPending, pass: !failures });

export const subResultsToRuleIntersectionResult = (
  rule,
  { isPending, failures, content },
) => ({ content, isPending, pass: !failures, rule });

export const subResultsToRuleNotResult = (
  rule,
  { isPending, failures, content },
) => ({ content, isPending, pass: !!failures, rule });

export const subResultsToRuleUnionResult = (
  rule,
  { isPending, passes, content },
) => ({
  content,
  isPending,
  pass: !!passes,
  rule,
});
