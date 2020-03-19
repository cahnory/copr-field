import { INVALIDE_TYPE } from './errors';

export const createType = ({ parse, validate }) => {
  if (typeof parse !== 'function' || typeof validate !== 'function') {
    throw new Error(INVALIDE_TYPE);
  }

  const safeValidate = input => !isEmpty(input) && validate(input);

  return {
    parse: input => (safeValidate(input) ? parse(input) : undefined),
    validate: safeValidate,
  };
};

export const isEmpty = input =>
  input === '' || input === null || input === undefined || Number.isNaN(input);
