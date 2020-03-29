import { useContext } from 'react';
import CoprContext from './CoprContext';

const useCopr = (name = null) => {
  const context = useContext(CoprContext);

  if (!context) {
    throw new Error(
      'Trying to call useCopr without CoprForm rendered in the tree',
    );
  }

  if (name === null) {
    return context;
  }

  if (typeof context.copr.fields !== 'object') {
    throw new Error(`Can't access field "${name}", current copr is not a set`);
  }

  if (!context.copr.fields[name]) {
    throw new Error(`Can't access unknown field "${name}" on current copr`);
  }

  return {
    form: context.form,
    copr: context.copr.fields[name],
    path: context.path.concat(name),
    result: context.result.content[name],
    setValue: newValue =>
      context.setValue({
        ...context.value,
        [name]: newValue,
      }),
    value: context.value[name],
  };
};

export default useCopr;
