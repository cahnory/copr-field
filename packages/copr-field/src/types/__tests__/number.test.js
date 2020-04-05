import NumberType, {
  isEqual,
  isGreater,
  isInteger,
  isLower,
  isModulo,
  isNegative,
  isPositive,
} from '../number';

describe('NumberType.validate', () => {
  it('handles integers expressed as number', () => {
    expect(NumberType.validate(-1)).toBe(true);
    expect(NumberType.validate(0)).toBe(true);
    expect(NumberType.validate(1)).toBe(true);
  });
  it('handles integers expressed as string', () => {
    expect(NumberType.validate('-1')).toBe(true);
    expect(NumberType.validate('0')).toBe(true);
    expect(NumberType.validate('1')).toBe(true);
  });
  it('handles floats expressed as number', () => {
    expect(NumberType.validate(-1.23)).toBe(true);
    expect(NumberType.validate(0.12)).toBe(true);
    expect(NumberType.validate(1.23)).toBe(true);
  });
  it('handles floats expressed as string', () => {
    expect(NumberType.validate('-1.23')).toBe(true);
    expect(NumberType.validate('0.12')).toBe(true);
    expect(NumberType.validate('1.23')).toBe(true);
  });
  it('rejects non number inputs', () => {
    expect(NumberType.validate('abc')).toBe(false);
    expect(NumberType.validate('')).toBe(false);
    expect(NumberType.validate(NaN)).toBe(false);
    expect(NumberType.validate(null)).toBe(false);
    expect(NumberType.validate(undefined)).toBe(false);
    expect(NumberType.validate(true)).toBe(false);
    expect(NumberType.validate(false)).toBe(false);
  });
});

describe('NumberType.parse', () => {
  it('handles integers expressed as number', () => {
    expect(NumberType.parse(-1)).toEqual(-1);
    expect(NumberType.parse(0)).toEqual(0);
    expect(NumberType.parse(1)).toEqual(1);
  });
  it('handles integers expressed as string', () => {
    expect(NumberType.parse('-1')).toEqual(-1);
    expect(NumberType.parse('0')).toEqual(0);
    expect(NumberType.parse('1')).toEqual(1);
  });
  it('handles floats expressed as number', () => {
    expect(NumberType.parse(-1.23)).toEqual(-1.23);
    expect(NumberType.parse(0.12)).toEqual(0.12);
    expect(NumberType.parse(1.23)).toEqual(1.23);
  });
  it('handles floats expressed as string', () => {
    expect(NumberType.parse('-1.23')).toEqual(-1.23);
    expect(NumberType.parse('0.12')).toEqual(0.12);
    expect(NumberType.parse('1.23')).toEqual(1.23);
  });
  it('returns undefined for non number inputs', () => {
    expect(NumberType.parse('')).toEqual(undefined);
    expect(NumberType.parse(NaN)).toEqual(undefined);
    expect(NumberType.parse(null)).toEqual(undefined);
    expect(NumberType.parse(undefined)).toEqual(undefined);
    expect(NumberType.parse(true)).toEqual(undefined);
    expect(NumberType.parse(false)).toEqual(undefined);
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
