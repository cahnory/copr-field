import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useCopr } from '@copr-field/react';
import { css } from '../utils';

const Field = ({
  ariaDescribedby,
  id,
  name,
  onBlur,
  onFocus,
  validate: initialValidate,
}) => {
  const { copr, result, setValue, value = '' } = useCopr(name);
  const [validate, setValidate] = useState(initialValidate);

  const handleChange = useCallback(({ target }) => setValue(target.value), [
    setValue,
  ]);

  const handleBlur = useCallback(() => {
    if (!validate) {
      setValidate(true);
    }
    onBlur(name);
  }, [name, onBlur, validate]);

  const handleFocus = useCallback(() => onFocus(name), [name, onFocus]);

  return (
    <>
      <label htmlFor={id}>
        {copr.meta.label}
        {!copr.allowEmpty && (
          <>
            <span className="text-danger" aria-hidden="true">
              *
            </span>
            <span className="sr-only">required</span>
          </>
        )}
      </label>
      <input
        aria-describedby={`${id}__feedback ${ariaDescribedby}`}
        autoComplete={copr.meta.autoComplete}
        className={css(
          'form-control',
          validate &&
            ((result.isPending && 'is-warning') ||
              (result.isValid ? 'is-valid' : 'is-invalid')),
        )}
        id={id}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        name={name}
        type={copr.meta.type}
        value={value}
      />
      {result.isPending && (
        <div id={`${id}__feedback`} className="pending-feedback">
          Field is being validated
        </div>
      )}
      {!result.isPending && !result.isValid && (
        <div id={`${id}__feedback`} className="invalid-feedback">
          {result.error === 'VALIDATION_EMPTY'
            ? 'This field is mandatory'
            : 'This field is invalid'}
        </div>
      )}
    </>
  );
};

Field.defaultProps = {
  ariaDescribedby: null,
  onBlur: null,
  onFocus: null,
  validate: false,
};

Field.propTypes = {
  ariaDescribedby: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  validate: PropTypes.bool,
};

export default Field;
