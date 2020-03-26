import { createType } from '../type';

export default createType({
  parse: input => parseFloat(input, 10),
  validate: input =>
    Number.isFinite(1 + parseFloat(input, 10) && Number(input)),
});

export const isEqual = (value, sup) => value === sup;

export const isGreater = (value, inf) => value > inf;

export const isInteger = value => value % 1 === 0;

export const isLower = (value, sup) => value < sup;

export const isModulo = (value, mod) => value % mod === 0;

export const isPositive = value => value > 0;

export const isNegative = value => value < 0;
