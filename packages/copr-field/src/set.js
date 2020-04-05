import {
  INVALIDE_COPR,
  VALIDATION_CONTENT,
  VALIDATION_EMPTY,
  VALIDATION_TYPE,
} from './errors';

import createObserver from './observer';

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

  const validate = (
    input,
    { context, observer: observerOption } = {},
    _root = setCopr,
    _path = [],
  ) => {
    let failures = 0;
    let pendings = 0;
    let isEmpty = true;
    let result;
    let initPendingSkipped = false;
    const value = {};
    const observer = createObserver(observerOption);

    Promise.resolve().then(() => {
      observer.next(result);
      if (!pendings) {
        observer.complete();
      }
    });

    let content = formEntries.reduce((acc, [name, field]) => {
      const fieldResult = field.validate(
        input[name],
        {
          context,
          observer: {
            next: asyncResult => {
              if (fieldResult.isPending) {
                if (!initPendingSkipped) {
                  initPendingSkipped = true;
                  return;
                }
                if (!asyncResult.isPending) {
                  if (asyncResult.isValid) {
                    failures -= 1;
                  }

                  pendings -= 1;
                }

                content = {
                  ...content,
                  [name]: asyncResult,
                };

                const asyncError =
                  (isEmpty && !allowEmpty && VALIDATION_EMPTY) ||
                  (failures ? VALIDATION_CONTENT : undefined);

                observer.next(
                  createResult({
                    content,
                    error: asyncError,
                    isEmpty,
                    isPending: !isEmpty && !!pendings,
                    value,
                  }),
                );
              }
            },
            complete: () => {
              if (!pendings && fieldResult.isPending) {
                observer.complete();
              }
            },
          },
        },
        _root,
        _path.concat(name),
      );

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
      acc[name] = fieldResult; // SEEEEEEEE

      return acc;
    }, {});

    const error =
      (isEmpty && !allowEmpty && VALIDATION_EMPTY) ||
      (failures ? VALIDATION_CONTENT : undefined);

    result = createResult({
      content,
      error,
      isEmpty,
      isPending: !isEmpty && !!pendings,
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
    node: setCopr,
    nodeType: 'set',
    value,
  });

  const setCopr = {
    allowEmpty,
    fields,
    getValue,
    meta,
    parse,
    validate,
  };

  return setCopr;
};

export default createCopperSet;
