import React, { useCallback, useEffect, useState } from 'react';
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
    copr.process(value, { value, ...context }),
  );

  useEffect(() => {
    if (controlledInput !== null) {
      const nextValue = copr.getValue(controlledInput);
      const nextResult = copr.process(nextValue, {
        value: nextValue,
        ...context,
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
  }, [context, controlledInput, copr, onUpdate]);

  const handleValue = useCallback(
    nextInput => {
      const nextValue = copr.getValue(nextInput);
      const nextResult = copr.process(nextValue, {
        value: nextValue,
        ...context,
      });
      setInput(nextInput);
      setValue(nextValue);
      setResult(nextResult);

      if (onChange) {
        onChange({ value: nextValue, input: nextInput, result: nextResult });
      }
    },
    [context, copr, onChange],
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
