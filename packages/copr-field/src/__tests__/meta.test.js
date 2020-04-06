import createMeta from '../meta';
import { INVALIDE_META } from '../errors';

describe('createMeta', () => {
  it('returns the unmodified object', () => {
    const meta = { name: 'meta' };
    expect(createMeta(meta)).toStrictEqual(meta);
  });
  it('returns an object for undefined meta', () => {
    expect(createMeta()).toStrictEqual({});
  });
  it('throws with invalid meta', () => {
    expect(() => createMeta(null)).toThrow(INVALIDE_META);
    expect(() => createMeta([])).toThrow(INVALIDE_META);
    expect(() => createMeta(1)).toThrow(INVALIDE_META);
    expect(() => createMeta('')).toThrow(INVALIDE_META);
  });
});
