import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CoprContext from './CoprContext';

const CoprForm = ({
  children,
  context,
  copr,
  initialValue: initialInput,
  onChange,
  onUpdate,
  value: controlledInput,
}) => {
  const mounted = useRef(true);
  const observer = useRef();
  const getNewObserver = useCallback(() => {
    const newObserver = {
      next: nextResult => {
        if (mounted.current && newObserver === observer.current) {
          setResult(nextResult);
        }
      },
    };
    observer.current = newObserver;

    return newObserver;
  }, []);

  const [input, setInput] = useState(() => {
    if (controlledInput !== null) {
      return controlledInput;
    }

    if (initialInput !== null) {
      return initialInput;
    }

    return copr.getValue();
  });
  const [value, setValue] = useState(() => copr.getValue(input));
  const [result, setResult] = useState(() =>
    copr.validate(value, {
      context: { value, ...context },
      observer: getNewObserver(),
    }),
  );

  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );

  useEffect(() => {
    if (controlledInput !== null) {
      const nextValue = copr.getValue(controlledInput);
      const nextResult = copr.validate(nextValue, {
        context: {
          value: nextValue,
          ...context,
        },
        observer: getNewObserver(),
      });
      setInput(controlledInput);
      setValue(nextValue);
      setResult(nextResult);

      if (onUpdate) {
        onUpdate({
          value: nextValue,
          input: controlledInput,
          result: nextResult,
        });
      }
    }
  }, [context, controlledInput, copr, getNewObserver, onUpdate]);

  const handleValue = useCallback(
    nextInput => {
      const nextValue = copr.getValue(nextInput);
      const nextResult = copr.validate(nextValue, {
        context: {
          value: nextValue,
          ...context,
        },
        observer: getNewObserver(),
      });
      setInput(nextInput);
      setValue(nextValue);
      setResult(nextResult);

      if (onChange) {
        onChange({ value: nextValue, input: nextInput, result: nextResult });
      }
    },
    [context, copr, getNewObserver, onChange],
  );

  const form = { copr, setValue: handleValue, result, path: [], value: input };
  form.form = form;

  return (
    <CoprContext.Provider value={form}>
      {typeof children === 'function' ? children(form) : children}
    </CoprContext.Provider>
  );
};

CoprForm.defaultProps = {
  context: {},
  initialValue: null,
  onChange: null,
  onUpdate: null,
  value: null,
};

CoprForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.func.isRequired,
  ]).isRequired,
  copr: PropTypes.object.isRequired,
  context: PropTypes.object,
  initialValue: PropTypes.any,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
  value: PropTypes.any,
};

export default CoprForm;
