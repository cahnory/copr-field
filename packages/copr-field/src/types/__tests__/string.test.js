import StringType, {
  isEqual,
  isLonger,
  isMatching,
  isShorter,
  isSized,
} from '../string';
import { typeParse, typeValidate } from '../../type';

describe('StringType.validate', () => {
  it('handles strings', () => {
    expect(typeValidate(StringType, '0')).toBe(true);
    expect(typeValidate(StringType, 0)).toBe(true);
  });
  it('rejects non string inputs', () => {
    expect(typeValidate(StringType, '')).toBe(false);
    expect(typeValidate(StringType, null)).toBe(false);
    expect(typeValidate(StringType, undefined)).toBe(false);
    expect(typeValidate(StringType, true)).toBe(false);
    expect(typeValidate(StringType, false)).toBe(false);
  });
});

describe('StringType.parse', () => {
  it('handles strings', () => {
    expect(typeParse(StringType, '0')).toEqual('0');
    expect(typeParse(StringType, 0)).toEqual('0');
  });
  it('returns undefined for non string inputs', () => {
    expect(typeParse(StringType, '')).toEqual(undefined);
    expect(typeParse(StringType, null)).toEqual(undefined);
    expect(typeParse(StringType, undefined)).toEqual(undefined);
    expect(typeParse(StringType, true)).toEqual(undefined);
    expect(typeParse(StringType, false)).toEqual(undefined);
  });
});

describe('string rule', () => {
  it('isEqual', () => {
    expect(isEqual('a', 'a')).toBe(true);
    expect(isEqual('a', 'b')).toBe(false);
  });
  it('isLonger', () => {
    expect(isLonger('ab', 2)).toBe(false);
    expect(isLonger('abc', 2)).toBe(true);
    expect(isLonger('ab', 3)).toBe(false);
  });
  it('isMatching', () => {
    expect(isMatching('ab', /^abc$/)).toBe(false);
    expect(isMatching('abc', /^abc$/)).toBe(true);
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
