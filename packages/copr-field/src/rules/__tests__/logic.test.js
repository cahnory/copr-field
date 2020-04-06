import { createRule } from '../logic';
import { INVALIDE_RULE } from '../../errors';

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
