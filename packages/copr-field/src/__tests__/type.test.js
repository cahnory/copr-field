import { createType } from '../type';
import { INVALIDE_TYPE } from '../errors';

describe('type.createType', () => {
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

  it('handles calls to validate with invalid input', () => {
    const validate = jest.fn();
    const type = createType({ parse: () => {}, validate });

    expect(type.validate()).toEqual(false);
    expect(type.validate('')).toEqual(false);
    expect(type.validate(null)).toEqual(false);
    expect(type.validate(undefined)).toEqual(false);
    expect(validate).not.toHaveBeenCalled();
  });

  it('handles calls to parse with invalid input', () => {
    const parse = jest.fn();
    const type = createType({ parse, validate: () => {} });

    expect(type.parse()).toEqual(undefined);
    expect(type.parse('')).toEqual(undefined);
    expect(type.parse(NaN)).toEqual(undefined);
    expect(type.parse(null)).toEqual(undefined);
    expect(type.parse(undefined)).toEqual(undefined);
    expect(parse).not.toHaveBeenCalled();
  });
});
