import NumberType, {
  isEqual,
  isGreater,
  isInteger,
  isLower,
  isModulo,
  isNegative,
  isPositive,
} from '../number';
import { typeParse, typeValidate } from '../../type';

describe('NumberType.validate', () => {
  it('handles integers expressed as number', () => {
    expect(typeValidate(NumberType, -1)).toBe(true);
    expect(typeValidate(NumberType, 0)).toBe(true);
    expect(typeValidate(NumberType, 1)).toBe(true);
  });
  it('handles integers expressed as string', () => {
    expect(typeValidate(NumberType, '-1')).toBe(true);
    expect(typeValidate(NumberType, '0')).toBe(true);
    expect(typeValidate(NumberType, '1')).toBe(true);
  });
  it('handles floats expressed as number', () => {
    expect(typeValidate(NumberType, -1.23)).toBe(true);
    expect(typeValidate(NumberType, 0.12)).toBe(true);
    expect(typeValidate(NumberType, 1.23)).toBe(true);
  });
  it('handles floats expressed as string', () => {
    expect(typeValidate(NumberType, '-1.23')).toBe(true);
    expect(typeValidate(NumberType, '0.12')).toBe(true);
    expect(typeValidate(NumberType, '1.23')).toBe(true);
  });
  it('rejects non number inputs', () => {
    expect(typeValidate(NumberType, 'abc')).toBe(false);
    expect(typeValidate(NumberType, '')).toBe(false);
    expect(typeValidate(NumberType, NaN)).toBe(false);
    expect(typeValidate(NumberType, null)).toBe(false);
    expect(typeValidate(NumberType, undefined)).toBe(false);
    expect(typeValidate(NumberType, true)).toBe(false);
    expect(typeValidate(NumberType, false)).toBe(false);
  });
});

describe('NumberType.parse', () => {
  it('handles integers expressed as number', () => {
    expect(typeParse(NumberType, -1)).toEqual(-1);
    expect(typeParse(NumberType, 0)).toEqual(0);
    expect(typeParse(NumberType, 1)).toEqual(1);
  });
  it('handles integers expressed as string', () => {
    expect(typeParse(NumberType, '-1')).toEqual(-1);
    expect(typeParse(NumberType, '0')).toEqual(0);
    expect(typeParse(NumberType, '1')).toEqual(1);
  });
  it('handles floats expressed as number', () => {
    expect(typeParse(NumberType, -1.23)).toEqual(-1.23);
    expect(typeParse(NumberType, 0.12)).toEqual(0.12);
    expect(typeParse(NumberType, 1.23)).toEqual(1.23);
  });
  it('handles floats expressed as string', () => {
    expect(typeParse(NumberType, '-1.23')).toEqual(-1.23);
    expect(typeParse(NumberType, '0.12')).toEqual(0.12);
    expect(typeParse(NumberType, '1.23')).toEqual(1.23);
  });
  it('returns undefined for non number inputs', () => {
    expect(typeParse(NumberType, '')).toEqual(undefined);
    expect(typeParse(NumberType, NaN)).toEqual(undefined);
    expect(typeParse(NumberType, null)).toEqual(undefined);
    expect(typeParse(NumberType, undefined)).toEqual(undefined);
    expect(typeParse(NumberType, true)).toEqual(undefined);
    expect(typeParse(NumberType, false)).toEqual(undefined);
  });
});

describe('number rule', () => {
  it('isEqual', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(1, -1)).toBe(false);
  });
  it('isGreater', () => {
    expect(isGreater(1, -1)).toBe(true);
    expect(isGreater(1, 1)).toBe(false);
    expect(isGreater(1, 2)).toBe(false);
  });
  it('isInteger', () => {
    expect(isInteger(0)).toBe(true);
    expect(isInteger(1)).toBe(true);
    expect(isInteger(0.12)).toBe(false);
  });
  it('isLower', () => {
    expect(isLower(1, 2)).toBe(true);
    expect(isLower(1, -1)).toBe(false);
    expect(isLower(1, 1)).toBe(false);
  });
  it('isModulo', () => {
    expect(isModulo(3, 2)).toBe(false);
    expect(isModulo(8, 2)).toBe(true);
  });
  it('isPositive', () => {
    expect(isPositive(1)).toBe(true);
    expect(isPositive(0)).toBe(false);
    expect(isPositive(-1)).toBe(false);
  });
  it('isNegative', () => {
    expect(isNegative(-1)).toBe(true);
    expect(isNegative(0)).toBe(false);
    expect(isNegative(1)).toBe(false);
  });
});
