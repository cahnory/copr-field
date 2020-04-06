import { INVALIDE_TYPE } from './errors';

const createType = ({ parse, validate }) => {
  if (typeof parse !== 'function' || typeof validate !== 'function') {
    throw new Error(INVALIDE_TYPE);
  }

  return {
    parse,
    validate,
  };
};

export default createType;

export const typeParse = (type, input) =>
  typeValidate(type, input) ? type.parse(input) : undefined;

export const typeValidate = (type, input) =>
  !isEmptyValue(input) && type.validate(input);

export const isEmptyValue = input =>
  input === '' || input === null || input === undefined;
