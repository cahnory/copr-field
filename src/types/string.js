export const parse = input => `${input}`;

export const validate = input => typeof input === 'string';

export default {
  parse,
  validate,
};

export const isEqual = (value, sup) => value === sup;

export const isLonger = (value, inf) => value.length > inf;

export const isShorter = (value, sup) => value.length < sup;

export const isSized = (value, sup) => value.length === sup;
