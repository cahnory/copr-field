import createTestRule, { validate } from '../test';
import createObserver from '../../observer';
import {
  INVALIDE_META,
  INVALIDE_TEST_ARGS,
  INVALIDE_TEST_FUNC,
  INVALIDE_TEST_RETURN,
  VALIDATION_RULE,
} from '../../errors';

describe('createTestRule', () => {
  it('throws with invalid test', () => {
    expect(() => createTestRule({ test: undefined })).toThrow(
      INVALIDE_TEST_FUNC,
    );
    expect(() => createTestRule({ test: null })).toThrow(INVALIDE_TEST_FUNC);
    expect(() => createTestRule({ test: {} })).toThrow(INVALIDE_TEST_FUNC);
    expect(() => createTestRule({ test: '*' })).toThrow(INVALIDE_TEST_FUNC);
    expect(() => createTestRule({ test: 13 })).toThrow(INVALIDE_TEST_FUNC);
  });

  it('throws with invalid meta', () => {
    const test = () => {};
    expect(() => createTestRule({ test, meta: null })).toThrow(INVALIDE_META);
    expect(() => createTestRule({ test, meta: [] })).toThrow(INVALIDE_META);
    expect(() => createTestRule({ test, meta: '*' })).toThrow(INVALIDE_META);
    expect(() => createTestRule({ test, meta: 13 })).toThrow(INVALIDE_META);
  });

  it('throws with invalid args', () => {
    const test = () => {};
    expect(() => createTestRule({ test, args: null })).toThrow(
      INVALIDE_TEST_ARGS,
    );
    expect(() => createTestRule({ test, args: {} })).toThrow(
      INVALIDE_TEST_ARGS,
    );
    expect(() => createTestRule({ test, args: '*' })).toThrow(
      INVALIDE_TEST_ARGS,
    );
    expect(() => createTestRule({ test, args: 13 })).toThrow(
      INVALIDE_TEST_ARGS,
    );
  });

  it('throws with invalid getArgs', () => {
    const test = () => {};
    expect(() => createTestRule({ test, getArgs: null })).toThrow(
      INVALIDE_TEST_ARGS,
    );
    expect(() => createTestRule({ test, getArgs: {} })).toThrow(
      INVALIDE_TEST_ARGS,
    );
    expect(() => createTestRule({ test, getArgs: '*' })).toThrow(
      INVALIDE_TEST_ARGS,
    );
    expect(() => createTestRule({ test, getArgs: 13 })).toThrow(
      INVALIDE_TEST_ARGS,
    );
  });
});

describe('validate', () => {
  it('returns valid result', () => {
    const rule = createTestRule({ test: () => true });
    expect(validate(rule, 'value', {}, createObserver())).toStrictEqual({
      content: [],
      error: undefined,
      isEmpty: false,
      isPending: false,
      isValid: true,
      node: rule,
      nodeType: 'test',
      value: 'value',
    });
  });
  it('returns invalid result', () => {
    const rule = createTestRule({ test: () => false });
    expect(validate(rule, 'value', {}, createObserver())).toStrictEqual({
      content: [],
      error: VALIDATION_RULE,
      isEmpty: false,
      isPending: false,
      isValid: false,
      node: rule,
      nodeType: 'test',
      value: 'value',
    });
  });
  it('returns and updates pending valid result', () =>
    new Promise(resolve => {
      const rule = createTestRule({ test: () => Promise.resolve(true) });
      const observer = createObserver(result => {
        expect(result).toStrictEqual({
          content: [],
          error: undefined,
          isEmpty: false,
          isPending: false,
          isValid: true,
          node: rule,
          nodeType: 'test',
          value: 'value',
        });
        resolve();
      });
      expect(validate(rule, 'value', {}, observer)).toStrictEqual({
        content: [],
        error: VALIDATION_RULE,
        isEmpty: false,
        isPending: true,
        isValid: false,
        node: rule,
        nodeType: 'test',
        value: 'value',
      });
    }));
  it('returns and updates pending invalid result', () =>
    new Promise(resolve => {
      const rule = createTestRule({ test: () => Promise.resolve(false) });
      const observer = createObserver(result => {
        expect(result).toStrictEqual({
          content: [],
          error: VALIDATION_RULE,
          isEmpty: false,
          isPending: false,
          isValid: false,
          node: rule,
          nodeType: 'test',
          value: 'value',
        });
        resolve();
      });
      expect(validate(rule, 'value', {}, observer)).toStrictEqual({
        content: [],
        error: VALIDATION_RULE,
        isEmpty: false,
        isPending: true,
        isValid: false,
        node: rule,
        nodeType: 'test',
        value: 'value',
      });
    }));
  it('calls observer.error if promise returns non boolean value', () =>
    new Promise(resolve => {
      const rule = createTestRule({ test: () => Promise.resolve(null) });
      const observer = createObserver({
        error: jest.fn(),
        complete: () => {
          expect(observer.error).toHaveBeenCalledWith(expect.any(Error));
          expect(observer.error).toHaveBeenCalledWith(
            new Error(INVALIDE_TEST_RETURN),
          );
          resolve();
        },
      });
      validate(rule, 'value', {}, observer);
    }));
});

describe('testRule.validate', () => {
  it('returns a result', () => {
    const rule = createTestRule({ test: () => true });
    expect(rule.validate('value')).toStrictEqual({
      content: [],
      error: undefined,
      isEmpty: false,
      isPending: false,
      isValid: true,
      node: rule,
      nodeType: 'test',
      value: 'value',
    });
  });
});
