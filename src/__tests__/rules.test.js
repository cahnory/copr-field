import { prepareRule } from '../rules';
import {
  INVALIDE_RULE,
  INVALIDE_RULE_ARGS,
  INVALIDE_RULE_META,
  INVALIDE_RULE_TEST,
} from '../errors';

describe('prepareRule', () => {
  it('returns a prepared rule', () => {
    expect(prepareRule(() => {})).toEqual({
      test: expect.any(Function),
      meta: expect.any(Object),
      getArgs: expect.any(Function),
    });
  });

  it('throws with invalid rule', () => {
    expect(() => prepareRule(null)).toThrow(INVALIDE_RULE);
    expect(() => prepareRule([])).toThrow(INVALIDE_RULE);
    expect(() => prepareRule('*')).toThrow(INVALIDE_RULE);
    expect(() => prepareRule(13)).toThrow(INVALIDE_RULE);
  });

  it('throws with invalid "all" rule', () => {
    expect(() => prepareRule({ all: '*' })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ all: 13 })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ all: [null] })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ all: [[]] })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ all: ['*'] })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ all: [13] })).toThrow(INVALIDE_RULE);
  });

  it('throws with invalid "not" rule', () => {
    expect(() => prepareRule({ not: '*' })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ not: 13 })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ not: [null] })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ not: [[]] })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ not: ['*'] })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ not: [13] })).toThrow(INVALIDE_RULE);
  });

  it('throws with invalid "oneO" rule', () => {
    expect(() => prepareRule({ oneOf: '*' })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ oneOf: 13 })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ oneOf: [null] })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ oneOf: [[]] })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ oneOf: ['*'] })).toThrow(INVALIDE_RULE);
    expect(() => prepareRule({ oneOf: [13] })).toThrow(INVALIDE_RULE);
  });

  it('throws with invalid test', () => {
    expect(() => prepareRule({ test: undefined })).toThrow(INVALIDE_RULE_TEST);
    expect(() => prepareRule({ test: null })).toThrow(INVALIDE_RULE_TEST);
    expect(() => prepareRule({ test: {} })).toThrow(INVALIDE_RULE_TEST);
    expect(() => prepareRule({ test: '*' })).toThrow(INVALIDE_RULE_TEST);
    expect(() => prepareRule({ test: 13 })).toThrow(INVALIDE_RULE_TEST);
  });

  it('throws with invalid meta', () => {
    const test = () => {};
    expect(() => prepareRule({ test, meta: null })).toThrow(INVALIDE_RULE_META);
    expect(() => prepareRule({ test, meta: [] })).toThrow(INVALIDE_RULE_META);
    expect(() => prepareRule({ test, meta: '*' })).toThrow(INVALIDE_RULE_META);
    expect(() => prepareRule({ test, meta: 13 })).toThrow(INVALIDE_RULE_META);
  });

  it('throws with invalid meta', () => {
    const test = () => {};
    expect(() => prepareRule({ test, args: null })).toThrow(INVALIDE_RULE_ARGS);
    expect(() => prepareRule({ test, args: {} })).toThrow(INVALIDE_RULE_ARGS);
    expect(() => prepareRule({ test, args: '*' })).toThrow(INVALIDE_RULE_ARGS);
    expect(() => prepareRule({ test, args: 13 })).toThrow(INVALIDE_RULE_ARGS);
  });
});

describe('preparedRule', () => {
  it('getArgs preserves args', () => {
    expect(prepareRule({ test: () => {}, args: [1, 2, 3] }).getArgs()).toEqual([
      1,
      2,
      3,
    ]);
    expect(
      prepareRule({ test: () => {}, getArgs: () => [1, 2, 3] }).getArgs(),
    ).toEqual([1, 2, 3]);
  });
});
