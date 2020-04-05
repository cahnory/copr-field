import createTestRule from '../test';
import { INVALIDE_TEST_FUNC } from '../../errors';

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
});
