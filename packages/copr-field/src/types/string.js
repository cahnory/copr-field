import { createType } from '../type';

export default createType({
  parse: input => `${input}`,
  validate: input => typeof input === 'string',
});

export const isEqual = (value, sup) => value === sup;

export const isLonger = (value, inf) => value.length > inf;

export const isMatching = (value, regex) => Boolean(regex.test(value));

export const isShorter = (value, sup) => value.length < sup;

export const isSized = (value, sup) => value.length === sup;
