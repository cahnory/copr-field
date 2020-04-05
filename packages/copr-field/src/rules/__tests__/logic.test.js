import { createRule } from '../logic';
import { INVALIDE_META, INVALIDE_RULE, INVALIDE_TEST_ARGS } from '../../errors';

describe('createRule', () => {
  it('returns a prepared rule', () => {
    expect(createRule(() => {})).toEqual({
      getArgs: expect.any(Function),
      meta: expect.any(Object),
      test: expect.any(Function),
      validate: expect.any(Function),
    });
  });

  it('throws with invalid rule', () => {
    expect(() => createRule(null)).toThrow(INVALIDE_RULE);
    expect(() => createRule([])).toThrow(INVALIDE_RULE);
    expect(() => createRule('*')).toThrow(INVALIDE_RULE);
    expect(() => createRule(13)).toThrow(INVALIDE_RULE);
  });

  it('throws with invalid "all" rule', () => {
    expect(() => createRule({ all: '*' })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ all: 13 })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ all: [null] })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ all: [[]] })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ all: ['*'] })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ all: [13] })).toThrow(INVALIDE_RULE);
  });

  it('throws with invalid "not" rule', () => {
    expect(() => createRule({ not: '*' })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ not: 13 })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ not: [null] })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ not: [[]] })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ not: ['*'] })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ not: [13] })).toThrow(INVALIDE_RULE);
  });

  it('throws with invalid "oneO" rule', () => {
    expect(() => createRule({ oneOf: '*' })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ oneOf: 13 })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ oneOf: [null] })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ oneOf: [[]] })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ oneOf: ['*'] })).toThrow(INVALIDE_RULE);
    expect(() => createRule({ oneOf: [13] })).toThrow(INVALIDE_RULE);
  });

  it('throws with invalid meta', () => {
    const test = () => {};
    expect(() => createRule({ test, meta: null })).toThrow(INVALIDE_META);
    expect(() => createRule({ test, meta: [] })).toThrow(INVALIDE_META);
    expect(() => createRule({ test, meta: '*' })).toThrow(INVALIDE_META);
    expect(() => createRule({ test, meta: 13 })).toThrow(INVALIDE_META);
  });

  it('throws with invalid meta', () => {
    const test = () => {};
    expect(() => createRule({ test, args: null })).toThrow(INVALIDE_TEST_ARGS);
    expect(() => createRule({ test, args: {} })).toThrow(INVALIDE_TEST_ARGS);
    expect(() => createRule({ test, args: '*' })).toThrow(INVALIDE_TEST_ARGS);
    expect(() => createRule({ test, args: 13 })).toThrow(INVALIDE_TEST_ARGS);
  });
});

describe('logicRule.getArgs', () => {
  it('preserves args', () => {
    expect(createRule({ test: () => {}, args: [1, 2, 3] }).getArgs()).toEqual([
      1,
      2,
      3,
    ]);
    expect(
      createRule({ test: () => {}, getArgs: () => [1, 2, 3] }).getArgs(),
    ).toEqual([1, 2, 3]);
  });
});
