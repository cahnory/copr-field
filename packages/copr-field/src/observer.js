const createObserver = observer => {
  if (typeof observer === 'function') {
    return observerFromFunction(observer);
  }

  if (observer && typeof observer === 'object') {
    return observerFromObject(observer);
  }

  return noopObserver();
};

export default createObserver;

export const observerFromObject = ({ complete, error, next }) => ({
  complete: complete || noop,
  error: error || noop,
  next: next || noop,
});

export const observerFromFunction = complete => {
  let result;

  return {
    complete: () => complete(result),
    error: noop,
    next: nextResult => {
      result = nextResult;
    },
  };
};

export const noopObserver = () => ({
  complete: noop,
  error: noop,
  next: noop,
});

export const noop = () => {};
