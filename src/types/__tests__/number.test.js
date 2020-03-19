import numberType, {
  isEqual,
  isGreater,
  isInteger,
  isLower,
  isModulo,
  isPositive,
  isNegative,
} from '../number';

describe('numberType.validate', () => {
  it('handles integers expressed as number', () => {
    expect(numberType.validate(-1)).toBe(true);
    expect(numberType.validate(0)).toBe(true);
    expect(numberType.validate(1)).toBe(true);
  });
  it('handles integers expressed as string', () => {
    expect(numberType.validate('-1')).toBe(true);
    expect(numberType.validate('0')).toBe(true);
    expect(numberType.validate('1')).toBe(true);
  });
  it('handles floats expressed as number', () => {
    expect(numberType.validate(-1.23)).toBe(true);
    expect(numberType.validate(0.12)).toBe(true);
    expect(numberType.validate(1.23)).toBe(true);
  });
  it('handles floats expressed as string', () => {
    expect(numberType.validate('-1.23')).toBe(true);
    expect(numberType.validate('0.12')).toBe(true);
    expect(numberType.validate('1.23')).toBe(true);
  });
  it('rejects non number inputs', () => {
    expect(numberType.validate('abc')).toBe(false);
    expect(numberType.validate('')).toBe(false);
    expect(numberType.validate(NaN)).toBe(false);
    expect(numberType.validate(null)).toBe(false);
    expect(numberType.validate(undefined)).toBe(false);
    expect(numberType.validate(true)).toBe(false);
    expect(numberType.validate(false)).toBe(false);
  });
});

describe('numberType.parse', () => {
  it('handles integers expressed as number', () => {
    expect(numberType.parse(-1)).toEqual(-1);
    expect(numberType.parse(0)).toEqual(0);
    expect(numberType.parse(1)).toEqual(1);
  });
  it('handles integers expressed as string', () => {
    expect(numberType.parse('-1')).toEqual(-1);
    expect(numberType.parse('0')).toEqual(0);
    expect(numberType.parse('1')).toEqual(1);
  });
  it('handles floats expressed as number', () => {
    expect(numberType.parse(-1.23)).toEqual(-1.23);
    expect(numberType.parse(0.12)).toEqual(0.12);
    expect(numberType.parse(1.23)).toEqual(1.23);
  });
  it('handles floats expressed as string', () => {
    expect(numberType.parse('-1.23')).toEqual(-1.23);
    expect(numberType.parse('0.12')).toEqual(0.12);
    expect(numberType.parse('1.23')).toEqual(1.23);
  });
  it('returns undefined for non number inputs', () => {
    expect(numberType.parse('')).toEqual(undefined);
    expect(numberType.parse(NaN)).toEqual(undefined);
    expect(numberType.parse(null)).toEqual(undefined);
    expect(numberType.parse(undefined)).toEqual(undefined);
    expect(numberType.parse(true)).toEqual(undefined);
    expect(numberType.parse(false)).toEqual(undefined);
  });
});

describe('number rules', () => {
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
