export const parse = input => new Date(input);

export const validate = input => !Number.isNaN(new Date(input).getTime());

export default {
  parse,
  validate,
};

export const isAfter = (value, inf) => value > inf;

export const isBefore = (value, sup) => value < sup;

export const isEqual = (value, inf) => value.getTime() === inf.getTime();

export const isSameYear = (value, other) =>
  value.getFullYear() === other.getFullYear();

export const isSameMonth = (value, other) =>
  isSameYear(value, other) && isSameMonthOfYear(value, other);

export const isSameMonthOfYear = (value, other) =>
  value.getMonth() === other.getMonth();

export const isSameDayOfWeek = (value, other) =>
  value.getDay() === other.getDay();

export const isSameDayOfMonth = (value, other) =>
  value.getDate() === other.getDate();

export const isSameDay = (value, other) =>
  isSameMonth(value, other) && isSameDayOfMonth(value, other);
