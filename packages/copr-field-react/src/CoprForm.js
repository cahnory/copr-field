import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CoprContext from './CoprContext';

const CoprForm = ({
  children,
  context: validationContext,
  copr,
  defaultValue: defaultInput,
  onChange,
  onUpdate,
  value: controlledInput,
}) => {
  const mounted = useRef(true);
  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );

  const handler = useRef({ onChange, onUpdate });
  useEffect(() => {
    handler.current.onChange = onChange;
    handler.current.onUpdate = onUpdate;
  }, [onChange, onUpdate]);

  const prevResult = useRef();

  const observer = useRef();
  const getNewObserver = useCallback(() => {
    const newObserver = {
      next: nextResult => {
        if (mounted.current && newObserver === observer.current) {
          prevResult.current = nextResult;
          setResult(nextResult);

          if (handler.current.onUpdate) {
            handler.current.onUpdate(nextResult);
          }
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

    if (defaultInput !== null) {
      return defaultInput;
    }

    return copr.getValue();
  });

  const validate = useCallback(
    (newInput, validateObserver) => {
      const newValue = copr.getValue(newInput);

      return copr.validate(newValue, {
        context:
          typeof validationContext !== 'object' ||
          Array.isArray(validationContext)
            ? validationContext
            : {
                prevResult: prevResult.current,
                value: newValue,
                ...validationContext,
              },
        observer: validateObserver,
      });
    },
    [copr, validationContext],
  );

  const [result, setResult] = useState(() => validate(input, getNewObserver()));

  useEffect(() => {
    if (controlledInput !== null) {
      setInput(controlledInput);
      validate(controlledInput, getNewObserver());
    }
  }, [controlledInput, getNewObserver, validate]);

  const handleInput = useCallback(
    newInput => {
      if (controlledInput === null) {
        setInput(newInput);
      }
      const newResult = validate(
        newInput,
        controlledInput === null ? getNewObserver() : undefined,
      );

      prevResult.current = newResult;

      if (handler.current.onChange) {
        handler.current.onChange({
          input: newInput,
          result: newResult,
          value: newResult.value,
        });
      }
    },
    [controlledInput, getNewObserver, validate],
  );

  const context = {
    copr,
    setValue: handleInput,
    result,
    path: [],
    value: input !== null ? input : undefined,
  };
  context.form = context;

  return (
    <CoprContext.Provider value={context}>
      {typeof children === 'function' ? children(context) : children}
    </CoprContext.Provider>
  );
};

CoprForm.defaultProps = {
  context: {},
  defaultValue: null,
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
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
  value: PropTypes.any,
};

export default CoprForm;
