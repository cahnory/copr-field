import {
  INVALIDE_COPR,
  INVALIDE_COPR_ALLOW_EMPTY,
  INVALIDE_COPR_META,
  INVALIDE_COPR_RULES,
  INVALIDE_COPR_TYPE,
  VALIDATION_EMPTY,
  VALIDATION_RULE,
  VALIDATION_TYPE,
} from './errors';

import { observerFromOption } from './observer';
import { runPreparedRuleList, prepareRuleList } from './rules';
import { isEmptyValue } from './type';

const createCopperField = copr => {
  if (typeof copr !== 'object') {
    throw new Error(INVALIDE_COPR);
  }

  const { allowEmpty = false, meta = {}, rules: ruleList = [], type } = copr;

  if (!Array.isArray(ruleList)) {
    throw new Error(INVALIDE_COPR_RULES);
  }

  if (typeof allowEmpty !== 'boolean') {
    throw new Error(INVALIDE_COPR_ALLOW_EMPTY);
  }

  if (typeof meta !== 'object') {
    throw new Error(INVALIDE_COPR_META);
  }

  if (
    typeof type !== 'object' ||
    typeof type.parse !== 'function' ||
    typeof type.validate !== 'function'
  ) {
    throw new Error(INVALIDE_COPR_TYPE);
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

  const getValue = input => {
    try {
      return parse(input);
    } catch (e) {
      return undefined;
    }
  };

  const validate = (value, { context, observer: observerOption } = {}) => {
    const observer = observerFromOption(observerOption);
    if (isEmptyValue(value)) {
      setTimeout(observer.complete);
      return createResult({
        isEmpty: true,
        error: allowEmpty ? undefined : VALIDATION_EMPTY,
      });
    }

    return ruleListToValidateResult(
      value,
      runPreparedRuleList(value, rules, context, {
        ...observer,
        next: result => {
          observer.next(ruleListToValidateResult(value, result));
        },
      }),
    );
  };

  const process = (input, { context, observer } = {}) => {
    let value;

    try {
      value = parse(input);
    } catch (e) {
      return createResult({ error: VALIDATION_TYPE });
    }

    return validate(value, { context, observer });
  };

  return {
    allowEmpty,
    type,
    meta,
    rules,
    getValue,
    parse,
    validate,
    process,
  };
};

export default createCopperField;

export const ruleListToValidateResult = (value, { content, pass }) => {
  if (!pass) {
    return createResult({ value, content, error: VALIDATION_RULE });
  }

  return createResult({ value, content });
};

export const createResult = ({
  content = [],
  error,
  isEmpty = false,
  value,
}) => ({ content, error, isEmpty, pass: !error, value });
