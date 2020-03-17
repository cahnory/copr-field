import { VALIDATION_RULE, VALIDATION_TYPE } from './errors';

import { runPreparedRuleList, prepareRuleList } from './rules';

const createParser = (type, ruleList = []) => {
  const rules = prepareRuleList(ruleList);

  const parse = input => {
    if (!type.validate(input)) {
      throw new Error(VALIDATION_TYPE);
    }

    return type.parse(input);
  };

  const validate = (value, context) => {
    const { content, pass } = runPreparedRuleList(value, rules, context);

    if (!pass) {
      return { value, content, error: VALIDATION_RULE };
    }

    return { value, content };
  };

  return {
    rules,
    parse,
    validate,
    process: (input, context) => {
      let value;

      try {
        value = parse(input);
      } catch (e) {
        return { content: [], error: VALIDATION_TYPE };
      }

      return validate(value, context);
    },
  };
};

export default createParser;
