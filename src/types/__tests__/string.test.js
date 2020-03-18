import stringType, { isEqual, isLonger, isShorter, isSized } from '../string';

describe('stringType.validate', () => {
  it('handles strings', () => {
    expect(stringType.validate('')).toBe(true);
    expect(stringType.validate('0')).toBe(true);
    expect(stringType.validate(1)).toBe(false);
    expect(stringType.validate(null)).toBe(false);
    expect(stringType.validate(undefined)).toBe(false);
  });
});

describe('stringType.parse', () => {
  it('handles strings', () => {
    expect(stringType.parse('')).toEqual('');
    expect(stringType.parse('0')).toEqual('0');
  });
});

describe('string rules', () => {
  it('isEqual', () => {
    expect(isEqual('', '')).toBe(true);
    expect(isEqual('a', 'b')).toBe(false);
  });
  it('isLonger', () => {
    expect(isLonger('', 0)).toBe(false);
    expect(isLonger('ab', 2)).toBe(false);
    expect(isLonger('abc', 2)).toBe(true);
    expect(isLonger('ab', 3)).toBe(false);
  });
  it('isShorter', () => {
    expect(isShorter('', 0)).toBe(false);
    expect(isShorter('ab', 2)).toBe(false);
    expect(isShorter('ab', 3)).toBe(true);
    expect(isShorter('abc', 2)).toBe(false);
  });
  it('isSized', () => {
    expect(isSized('', 0)).toBe(true);
    expect(isSized('ab', 2)).toBe(true);
    expect(isSized('ab', 1)).toBe(false);
    expect(isSized('ab', 3)).toBe(false);
  });
});
