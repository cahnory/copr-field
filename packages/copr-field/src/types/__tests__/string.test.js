import stringType, { isEqual, isLonger, isShorter, isSized } from '../string';

describe('stringType.validate', () => {
  it('handles strings', () => {
    expect(stringType.validate('0')).toBe(true);
  });
  it('rejects non string inputs', () => {
    expect(stringType.validate('')).toBe(false);
    expect(stringType.validate(123)).toBe(false);
    expect(stringType.validate(NaN)).toBe(false);
    expect(stringType.validate(null)).toBe(false);
    expect(stringType.validate(undefined)).toBe(false);
    expect(stringType.validate(true)).toBe(false);
    expect(stringType.validate(false)).toBe(false);
  });
});

describe('stringType.parse', () => {
  it('handles strings', () => {
    expect(stringType.parse('0')).toEqual('0');
  });
  it('returns undefined for non string inputs', () => {
    expect(stringType.parse(0)).toEqual(undefined);
    expect(stringType.parse('')).toEqual(undefined);
    expect(stringType.parse(NaN)).toEqual(undefined);
    expect(stringType.parse(null)).toEqual(undefined);
    expect(stringType.parse(undefined)).toEqual(undefined);
    expect(stringType.parse(true)).toEqual(undefined);
    expect(stringType.parse(false)).toEqual(undefined);
  });
});

describe('string rules', () => {
  it('isEqual', () => {
    expect(isEqual('a', 'a')).toBe(true);
    expect(isEqual('a', 'b')).toBe(false);
  });
  it('isLonger', () => {
    expect(isLonger('ab', 2)).toBe(false);
    expect(isLonger('abc', 2)).toBe(true);
    expect(isLonger('ab', 3)).toBe(false);
  });
  it('isShorter', () => {
    expect(isShorter('ab', 2)).toBe(false);
    expect(isShorter('ab', 3)).toBe(true);
    expect(isShorter('abc', 2)).toBe(false);
  });
  it('isSized', () => {
    expect(isSized('ab', 2)).toBe(true);
    expect(isSized('ab', 1)).toBe(false);
    expect(isSized('ab', 3)).toBe(false);
  });
});
