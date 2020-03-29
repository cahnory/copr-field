import {
  INVALIDE_COPR,
  VALIDATION_CONTENT,
  VALIDATION_EMPTY,
  VALIDATION_TYPE,
} from './errors';

import { observerFromOption } from './observer';

const createCopperSet = copr => {
  if (typeof copr !== 'object') {
    throw new Error(INVALIDE_COPR);
  }

  const { allowEmpty = false, fields, meta = {} } = copr;

  const formEntries = Object.entries(fields);

  const parse = (inputs = {}) => {
    if (!inputs || typeof inputs !== 'object' || Array.isArray(inputs)) {
      throw new Error(VALIDATION_TYPE);
    }

    return formEntries.reduce((acc, [name, subCopr]) => {
      acc[name] = subCopr.parse(inputs[name]);

      return acc;
    }, {});
  };

  const getValue = (rawInputs = {}) => {
    const inputs =
      rawInputs && typeof rawInputs === 'object' && !Array.isArray(rawInputs)
        ? rawInputs
        : {};

    return formEntries.reduce((acc, [name, subCopr]) => {
      acc[name] = subCopr.getValue(inputs[name]);

      return acc;
    }, {});
  };

  const validate = (input, { context, observer: observerOption } = {}) => {
    let failures = 0;
    let pendings = 0;
    let isEmpty = true;
    let result;
    const value = {};
    const observer = observerFromOption(observerOption);

    Promise.resolve(() => {
      observer.next(result);
      if (!formEntries.length) {
        observer.complete();
      }
    });

    let content = formEntries.reduce((acc, [name, field]) => {
      const fieldResult = field.validate(input[name], {
        context,
        observer: {
          next: asyncResult => {
            if (fieldResult.isPending && !asyncResult.isPending) {
              if (asyncResult.isValid) {
                failures -= 1;
              }

              pendings -= 1;
            }

            content = {
              ...content,
              [name]: {
                ...asyncResult,
                field,
              },
            };

            const asyncError =
              (isEmpty && !allowEmpty && VALIDATION_EMPTY) ||
              (failures ? VALIDATION_CONTENT : undefined);

            observer.next({
              content,
              error: asyncError,
              isEmpty,
              isPending: !isEmpty && !!pendings,
              isValid: !asyncError,
              value,
            });
          },
          complete: () => {
            if (!pendings) {
              observer.complete();
            }
          },
        },
      });

      if (!fieldResult.isValid) {
        failures += 1;
      }

      if (!fieldResult.isEmpty) {
        isEmpty = false;
      }

      if (fieldResult.isPending) {
        pendings += 1;
      }

      value[name] = fieldResult.value;
      acc[name] = { ...fieldResult, field };

      return acc;
    }, {});

    const error =
      (isEmpty && !allowEmpty && VALIDATION_EMPTY) ||
      (failures ? VALIDATION_CONTENT : undefined);

    result = {
      content,
      error,
      isEmpty,
      isPending: !isEmpty && !!pendings,
      isValid: !error,
      value,
    };

    return result;
  };

  return {
    allowEmpty,
    fields,
    getValue,
    meta,
    parse,
    validate,
  };
};

export default createCopperSet;
