export const observerFromObject = ({ complete, error, next }) => ({
  complete: complete || (() => {}),
  error: error || (() => {}),
  next: next || (() => {}),
});

export const observerFromFunction = complete => {
  let result;

  return {
    complete: () => complete(result),
    error: () => {},
    next: nextResult => {
      result = nextResult;
    },
  };
};

export const noopObserver = () => ({
  complete: () => {},
  error: () => {},
  next: () => {},
});

export const observerFromOption = observer => {
  switch (typeof observer) {
    case 'object':
      return observerFromObject(observer);
    case 'function':
      return observerFromFunction(observer);
    default:
      return noopObserver();
  }
};
