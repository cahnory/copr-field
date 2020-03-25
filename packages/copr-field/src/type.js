import { INVALIDE_TYPE } from './errors';

export const createType = ({ parse, validate }) => {
  if (typeof parse !== 'function' || typeof validate !== 'function') {
    throw new Error(INVALIDE_TYPE);
  }

  const safeValidate = input => !isEmptyValue(input) && validate(input);

  return {
    parse: input => (safeValidate(input) ? parse(input) : undefined),
    validate: safeValidate,
  };
};

export const isEmptyValue = input =>
  input === '' || input === null || input === undefined || Number.isNaN(input);
