import StringType, { isEqual, isLonger, isShorter, isSized } from '../string';

describe('StringType.validate', () => {
  it('handles strings', () => {
    expect(StringType.validate('0')).toBe(true);
    expect(StringType.validate(0)).toBe(true);
  });
  it('rejects non string inputs', () => {
    expect(StringType.validate('')).toBe(false);
    expect(StringType.validate(null)).toBe(false);
    expect(StringType.validate(undefined)).toBe(false);
    expect(StringType.validate(true)).toBe(false);
    expect(StringType.validate(false)).toBe(false);
  });
});

describe('StringType.parse', () => {
  it('handles strings', () => {
    expect(StringType.parse('0')).toEqual('0');
    expect(StringType.parse(0)).toEqual('0');
  });
  it('returns undefined for non string inputs', () => {
    expect(StringType.parse('')).toEqual(undefined);
    expect(StringType.parse(null)).toEqual(undefined);
    expect(StringType.parse(undefined)).toEqual(undefined);
    expect(StringType.parse(true)).toEqual(undefined);
    expect(StringType.parse(false)).toEqual(undefined);
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
