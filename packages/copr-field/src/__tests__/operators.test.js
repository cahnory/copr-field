import { allOperator, notOperator, oneOfOperator } from '../operators';

describe('allOperator', () => {
  it('is valid if no failure', () => {
    expect(allOperator({ failures: 0, passes: 0 }).isValid).toBe(true);
    expect(allOperator({ failures: 0, passes: 1 }).isValid).toBe(true);
  });
  it('is not valid if there is at least one failure', () => {
    expect(allOperator({ failures: 1, passes: 0 }).isValid).toBe(false);
    expect(allOperator({ failures: 1, passes: 1 }).isValid).toBe(false);
  });
  it('preserves isPending value', () => {
    expect(allOperator({ isPending: true, failures: 0 }).isPending).toBe(true);
    expect(allOperator({ isPending: false, failures: 1 }).isPending).toBe(
      false,
    );
  });
});

describe('notOperator', () => {
  it('is valid if no pass', () => {
    expect(notOperator({ failures: 0, passes: 0 }).isValid).toBe(true);
    expect(notOperator({ failures: 1, passes: 0 }).isValid).toBe(true);
  });
  it('is not valid if there is at least one pass', () => {
    expect(notOperator({ failures: 0, passes: 1 }).isValid).toBe(false);
    expect(notOperator({ failures: 1, passes: 1 }).isValid).toBe(false);
  });
  it('preserves isPending value', () => {
    expect(notOperator({ isPending: true, passes: 0 }).isPending).toBe(true);
    expect(notOperator({ isPending: false, passes: 1 }).isPending).toBe(false);
  });
});

describe('oneOfOperator', () => {
  it('is valid if there is at lease one pass', () => {
    expect(oneOfOperator({ failures: 0, passes: 1 }).isValid).toBe(true);
    expect(oneOfOperator({ failures: 1, passes: 1 }).isValid).toBe(true);
  });
  it('is not valid if there is no pass', () => {
    expect(oneOfOperator({ failures: 0, passes: 0 }).isValid).toBe(false);
    expect(oneOfOperator({ failures: 1, passes: 0 }).isValid).toBe(false);
  });
  it('preserves isPending value', () => {
    expect(oneOfOperator({ isPending: true, passes: 0 }).isPending).toBe(true);
    expect(oneOfOperator({ isPending: false, passes: 1 }).isPending).toBe(
      false,
    );
  });
});
