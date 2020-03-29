import { VALIDATION_TYPE } from './errors';

import { observerFromOption } from './observer';

const createCopperSet = ({ fields, meta = {} }) => {
  const formEntries = Object.entries(fields);

  const parse = (inputs = {}) => {
    if (!inputs || typeof inputs !== 'object' || Array.isArray(inputs)) {
      throw new Error(VALIDATION_TYPE);
    }

    return formEntries.reduce((acc, [name, copper]) => {
      acc[name] = copper.parse(inputs[name]);

      return acc;
    }, {});
  };

  const getValue = (rawInputs = {}) => {
    const inputs =
      rawInputs && typeof rawInputs === 'object' && !Array.isArray(rawInputs)
        ? rawInputs
        : {};

    return formEntries.reduce((acc, [name, copper]) => {
      acc[name] = copper.getValue(inputs[name]);

      return acc;
    }, {});
  };

  const runMethod = (
    methodName,
    value,
    { context, observer: observerOption } = {},
  ) => {
    let failures = 0;
    let observed = formEntries.length;
    const observer = observerFromOption(observerOption);

    let content = formEntries.reduce((acc, [name, field]) => {
      const fieldResult = field[methodName](value[name], {
        context,
        observer: {
          next: result => {
            if (result.pass) {
              failures -= 1;
            }

            content = {
              ...content,
              [name]: {
                ...result,
                field,
              },
            };

            observed -= 1;
            observer.next({ padd: !failures, content });
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

      acc[name] = { ...fieldResult, field };

      return acc;
    }, {});

    return { pass: !failures, content };
  };

  const validate = (value, options) => runMethod('validate', value, options);

  const process = (value, options) => runMethod('process', value, options);

  return {
    fields,
    meta,
    getValue,
    parse,
    validate,
    process,
  };
};

export default createCopperSet;
