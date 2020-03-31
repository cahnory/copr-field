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
import { prepareRuleList, runRuleList } from './rules';
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

  const validate = (
    input,
    { context, observer: observerOption } = {},
    _root = fieldCopr,
    _path = [],
  ) => {
    const observer = observerFromOption(observerOption);
    let value;

    if (isEmptyValue(input)) {
      const result = createResult({
        content: [],
        error: allowEmpty ? undefined : VALIDATION_EMPTY,
        isEmpty: true,
        isPending: false,
        value: undefined,
      });

      Promise.resolve().then(() => {
        observer.next(result);
        observer.complete();
      });

      return result;
    }

    try {
      value = parse(input);
    } catch (e) {
      const result = createResult({
        content: [],
        error: VALIDATION_TYPE,
        isEmpty: false,
        isPending: false,
        value: undefined,
      });

      Promise.resolve().then(() => {
        observer.next(result);
        observer.complete();
      });

      return result;
    }

    let result;

    Promise.resolve().then(() => {
      observer.next(result);
      if (!result.isPending) {
        observer.complete();
      }
    });

    const { content, isPending, isValid } = runRuleList(
      value,
      rules,
      { context, field: fieldCopr, fieldPath: _path, root: _root },
      {
        ...observer,
        next: asyncResult => {
          if (result.isPending) {
            observer.next(
              createResult({
                content: asyncResult.content,
                error: !asyncResult.isValid ? VALIDATION_RULE : undefined,
                isEmpty: false,
                isPending: asyncResult.isPending,
                value,
              }),
            );
          }
        },
      },
    );

    result = createResult({
      content,
      error: !isValid ? VALIDATION_RULE : undefined,
      isEmpty: false,
      isPending,
      value,
    });

    return result;
  };

  const createResult = ({ content, error, isEmpty, isPending, value }) => ({
    content,
    error,
    isEmpty,
    isPending,
    isValid: !error,
    node: fieldCopr,
    nodeType: 'field',
    value,
  });

  const fieldCopr = {
    allowEmpty,
    getValue,
    meta,
    parse,
    rules,
    type,
    validate,
  };

  return fieldCopr;
};

export default createCopperField;
