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
    let observed = formEntries.length;
    let isEmpty = true;
    let error;
    const value = {};
    const observer = observerFromOption(observerOption);

    let content = formEntries.reduce((acc, [name, field]) => {
      const fieldResult = field.validate(input[name], {
        context,
        observer: {
          next: asyncResult => {
            if (asyncResult.pass) {
              failures -= 1;
            }

            content = {
              ...content,
              [name]: {
                ...asyncResult,
                field,
              },
            };

            observed -= 1;
            observer.next({
              content,
              error: error || (failures ? VALIDATION_CONTENT : undefined),
              isEmpty,
              pass: !failures,
              value,
            });
          },
          complete: () => {
            if (!observed) {
              observer.complete();
            }
          },
        },
      });

      if (!fieldResult.pass) {
        failures += 1;
      }

      if (!fieldResult.isEmpty) {
        isEmpty = false;
      }

      value[name] = fieldResult.value;
      acc[name] = { ...fieldResult, field };

      return acc;
    }, {});

    if (isEmpty && !allowEmpty) {
      error = VALIDATION_EMPTY;
    }

    return {
      content,
      error: error || (failures ? VALIDATION_CONTENT : undefined),
      isEmpty,
      pass: !failures,
      value,
    };
  };

  return {
    fields,
    meta,
    getValue,
    parse,
    validate,
  };
};

export default createCopperSet;
