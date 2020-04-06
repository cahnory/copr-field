import createObserver, {
  noop,
  noopObserver,
  observerFromFunction,
  observerFromObject,
} from '../observer';

const anyObserver = {
  complete: expect.any(Function),
  error: expect.any(Function),
  next: expect.any(Function),
};

describe('createObserver', () => {
  it('creates an observer from an object', () => {
    expect(createObserver({})).toStrictEqual(anyObserver);
  });
  it('creates an observer from a function', () => {
    expect(createObserver(() => {})).toStrictEqual(anyObserver);
  });
  it('creates a noop observer from anything else', () => {
    expect(createObserver()).toStrictEqual(anyObserver);
    expect(createObserver(null)).toStrictEqual(anyObserver);
    expect(createObserver([])).toStrictEqual(anyObserver);
  });
});

describe('observerFromObject', () => {
  it('preserves defined methods', () => {
    const complete = jest.fn();
    const error = jest.fn();
    const next = jest.fn();

    expect(observerFromObject({ complete, error, next })).toStrictEqual({
      complete,
      error,
      next,
    });
  });
  it('sets noop for missing methods', () => {
    expect(observerFromObject({})).toStrictEqual({
      complete: noop,
      error: noop,
      next: noop,
    });
  });
});

describe('observerFromFunction', () => {
  it('returns an observer', () => {
    expect(observerFromFunction(() => {})).toStrictEqual(anyObserver);
  });
  it('calls function with last value on complete', () => {
    const callback = jest.fn();
    const observer = observerFromFunction(callback);
    observer.next('A');
    observer.next('B');
    observer.complete();
    expect(callback).toHaveBeenCalledWith('B');
  });
});

describe('noopObserver', () => {
  it('returns an observer', () => {
    expect(noopObserver(() => {})).toStrictEqual({
      complete: noop,
      error: noop,
      next: noop,
    });
  });
});

describe('noop', () => {
  it('returns undefined', () => {
    expect(noop()).toStrictEqual(undefined);
  });
});
