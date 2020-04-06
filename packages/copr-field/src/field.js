import createMeta from './meta';
import createObserver from './observer';
import { all } from './utils';
import createType, { isEmptyValue, typeParse, typeValidate } from './type';
import {
  INVALIDE_COPR,
  INVALIDE_COPR_ALLOW_EMPTY,
  VALIDATION_EMPTY,
  VALIDATION_RULE,
  VALIDATION_TYPE,
} from './errors';

const createCopperField = copr => {
  if (typeof copr !== 'object') {
    throw new Error(INVALIDE_COPR);
  }

  if (typeof copr.allowEmpty !== 'boolean') {
    throw new Error(INVALIDE_COPR_ALLOW_EMPTY);
  }

  const logic = all(copr.rules);
  const fieldCopr = {
    allowEmpty: copr.allowEmpty,
    getValue: input => getValue(fieldCopr, input),
    meta: createMeta(copr.meta),
    parse: input => parse(fieldCopr, input),
    rules: logic.rules,
    type: createType(copr.type),
    validate: (input, options, _root, _path) =>
      validate(fieldCopr, logic, input, options, _root, _path),
  };

  return fieldCopr;
};

export default createCopperField;

const validate = (
  field,
  logic,
  input,
  { context, observer: observerOption } = {},
  _root = field,
  _path = [],
) => {
  const observer = createObserver(observerOption);
  let value;

  if (isEmptyValue(input)) {
    const result = createResult(field, {
      content: [],
      error: field.allowEmpty ? undefined : VALIDATION_EMPTY,
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
    const result = createResult(field, {
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

  const { content, isPending, isValid } = logic.validate(
    value,
    { context, field, fieldPath: _path, root: _root },
    {
      ...observer,
      next: asyncResult => {
        if (result.isPending) {
          observer.next(
            createResult(field, {
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

  result = createResult(field, {
    content,
    error: !isValid ? VALIDATION_RULE : undefined,
    isEmpty: false,
    isPending,
    value,
  });

  return result;
};

const parse = (field, input) => {
  if (isEmptyValue(input)) {
    return undefined;
  }

  if (!typeValidate(field.type, input)) {
    throw new Error(VALIDATION_TYPE);
  }

  return typeParse(field.type, input);
};

const getValue = (field, input) => {
  try {
    return field.parse(input);
  } catch (e) {
    return undefined;
  }
};

const createResult = (
  field,
  { content, error, isEmpty, isPending, value },
) => ({
  content,
  error,
  isEmpty,
  isPending,
  isValid: !error,
  node: field,
  nodeType: 'field',
  value,
});
