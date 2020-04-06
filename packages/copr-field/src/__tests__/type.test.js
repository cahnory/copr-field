import createType, { isEmptyValue, typeParse, typeValidate } from '../type';
import { INVALIDE_TYPE } from '../errors';

describe('isEmptyValue', () => {
  it('returns true for empty value', () => {
    expect(isEmptyValue('')).toEqual(true);
    expect(isEmptyValue(null)).toEqual(true);
    expect(isEmptyValue(undefined)).toEqual(true);
  });
  it('returns false for non empty value', () => {
    expect(isEmptyValue(0)).toEqual(false);
    expect(isEmptyValue([])).toEqual(false);
    expect(isEmptyValue({})).toEqual(false);
    expect(isEmptyValue(NaN)).toEqual(false);
    expect(isEmptyValue(' ')).toEqual(false);
  });
});

describe('createType', () => {
  it('returns a valid type', () => {
    expect(createType({ parse: () => {}, validate: () => {} })).toStrictEqual({
      parse: expect.any(Function),
      validate: expect.any(Function),
    });
  });

  it('throws on invalid type', () => {
    expect(() => createType({ parse: () => {} })).toThrow(INVALIDE_TYPE);
    expect(() => createType({ validate: () => {} })).toThrow(INVALIDE_TYPE);
  });
});

describe('typeValidate', () => {
  it('returns false for empty input', () => {
    const validate = jest.fn();
    const type = createType({ parse: () => {}, validate });

    expect(typeValidate(type)).toEqual(false);
    expect(typeValidate(type, '')).toEqual(false);
    expect(typeValidate(type, null)).toEqual(false);
    expect(typeValidate(type, undefined)).toEqual(false);
    expect(validate).not.toHaveBeenCalled();
  });
});

describe('typeParse', () => {
  it('handles calls to parse with invalid input', () => {
    const parse = jest.fn();
    const type = createType({ parse, validate: () => {} });

    expect(typeParse(type)).toEqual(undefined);
    expect(typeParse(type, '')).toEqual(undefined);
    expect(typeParse(type, NaN)).toEqual(undefined);
    expect(typeParse(type, null)).toEqual(undefined);
    expect(typeParse(type, undefined)).toEqual(undefined);
    expect(parse).not.toHaveBeenCalled();
  });
});
