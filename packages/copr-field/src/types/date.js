import { createType } from '../type';
import numberType from './number';

export default createType({
  parse: input =>
    new Date(numberType.validate(input) ? numberType.parse(input) : input),
  validate: input =>
    typeof input !== 'boolean' &&
    !Number.isNaN(
      new Date(
        numberType.validate(input) ? numberType.parse(input) : input,
      ).getTime(),
    ),
});

export const isAfter = (value, inf) => value > inf;

export const isBefore = (value, sup) => value < sup;

export const isEqual = (value, inf) => value.getTime() === inf.getTime();

export const isSameDay = (value, other) =>
  isSameMonth(value, other) && isSameDayOfMonth(value, other);

export const isSameDayOfMonth = (value, other) =>
  value.getDate() === other.getDate();

export const isSameDayOfWeek = (value, other) =>
  value.getDay() === other.getDay();

export const isSameMonth = (value, other) =>
  isSameYear(value, other) && isSameMonthOfYear(value, other);

export const isSameMonthOfYear = (value, other) =>
  value.getMonth() === other.getMonth();

export const isSameYear = (value, other) =>
  value.getFullYear() === other.getFullYear();
