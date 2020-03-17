export const parse = input => input;

export const validate = input => true;

export default {
  parse,
  validate,
};

export const isEqual = (value, sup) => value === sup;
export const isLonger = (value, inf) => value.length > inf;
export const isNegative = value => value > 0;
export const isPositive = value => value > 0;
export const isShorter = (value, sup) => value.length < sup;
export const isSized = (value, sup) => value.length === sup;
