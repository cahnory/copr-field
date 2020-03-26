import { VALIDATION_TYPE } from './errors';

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

  const validate = (values, context) => {
    let pass = true;

    const content = formEntries.reduce((acc, [name, field]) => {
      const result = field.validate(values[name], context);

      if (!result.pass) {
        pass = false;
      }

      acc[name] = { ...result, field };

      return acc;
    }, {});

    return { pass, content };
  };

  const process = (inputs, context) => {
    let pass = true;

    const content = formEntries.reduce((acc, [name, field]) => {
      const result = field.process(inputs[name], context);

      if (!result.pass) {
        pass = false;
      }

      acc[name] = { ...result, field };

      return acc;
    }, {});

    return { pass, content };
  };

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
