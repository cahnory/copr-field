export default {
  parse: input => `${input}`,
  validate: input => typeof input === 'string' || typeof input === 'number',
};

export const isEqual = (value, other) => value === other;

export const isLonger = (value, inf) => value.length > inf;

export const isMatching = (value, regex) => Boolean(regex.test(value));

export const isShorter = (value, sup) => value.length < sup;

export const isSized = (value, length) => value.length === length;
