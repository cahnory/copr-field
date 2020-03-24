import {
  INVALIDE_COPPER,
  INVALIDE_COPPER_ALLOW_EMPTY,
  INVALIDE_COPPER_META,
  INVALIDE_COPPER_RULES,
  INVALIDE_COPPER_TYPE,
  VALIDATION_EMPTY,
  VALIDATION_RULE,
  VALIDATION_TYPE,
} from './errors';

import { runPreparedRuleList, prepareRuleList } from './rules';
import { isEmptyValue } from './type';

const createCopperField = copper => {
  if (typeof copper !== 'object') {
    throw new Error(INVALIDE_COPPER);
  }

  const { type, meta = {}, rules: ruleList = [], allowEmpty = false } = copper;

  if (!Array.isArray(ruleList)) {
    throw new Error(INVALIDE_COPPER_RULES);
  }

  if (typeof allowEmpty !== 'boolean') {
    throw new Error(INVALIDE_COPPER_ALLOW_EMPTY);
  }

  if (typeof meta !== 'object') {
    throw new Error(INVALIDE_COPPER_META);
  }

  if (
    typeof type !== 'object' ||
    typeof type.parse !== 'function' ||
    typeof type.validate !== 'function'
  ) {
    throw new Error(INVALIDE_COPPER_TYPE);
  }

  const rules = prepareRuleList(ruleList);

  const parse = input => {
    if (isEmptyValue(input)) {
      return undefined;
    }

    if (!type.validate(input)) {
      throw new Error(VALIDATION_TYPE);
    }

    return type.parse(input);
  };

  const validate = (value, context) => {
    if (isEmptyValue(value)) {
      return createResult({
        isEmpty: true,
        error: allowEmpty ? undefined : VALIDATION_EMPTY,
      });
    }

    const { content, pass } = runPreparedRuleList(value, rules, context);

    if (!pass) {
      return createResult({ value, content, error: VALIDATION_RULE });
    }

    return createResult({ value, content });
  };

  const process = (input, context) => {
    let value;

    try {
      value = parse(input);
    } catch (e) {
      return createResult({ error: VALIDATION_TYPE });
    }

    return validate(value, context);
  };

  return {
    allowEmpty,
    type,
    meta,
    rules,
    parse,
    validate,
    process,
  };
};

export default createCopperField;

export const createResult = ({
  content = [],
  error,
  isEmpty = false,
  value,
}) => ({ content, error, isEmpty, value });
