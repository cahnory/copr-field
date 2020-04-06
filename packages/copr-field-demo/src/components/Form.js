import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useCopr } from '@copr-field/react';
import Field from './Field';
import Help from './Help';

const Form = ({ onSubmit, onSubmitError, validate = false }) => {
  const { copr, result, value } = useCopr();
  const [focusedField, setFocusField] = useState();
  const handleBlur = useCallback(() => setFocusField(), []);
  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      if (result.pass) {
        if (onSubmit) {
          onSubmit(value);
        }
      } else if (onSubmitError) {
        onSubmitError();
      }
    },
    [result, value, onSubmit, onSubmitError],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-8">
          {Object.keys(copr.fields).map(name => (
            <div className="mb-3" key={name}>
              <Field
                id={`field_${name}`}
                name={name}
                onBlur={handleBlur}
                onFocus={setFocusField}
                validate={validate}
                ariaDescribedby={`help_${name}`}
              />
            </div>
          ))}
        </div>
        <div className="col">
          {Object.keys(copr.fields).map(name => (
            <div
              key={name}
              id={`help_${name}`}
              className={`help${focusedField === name ? '' : ' help-hidden'}`}
              style={{ position: 'sticky', top: 0 }}
            >
              <Help name={name} />
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit form
      </button>
    </form>
  );
};

Form.defaultProps = {
  onSubmit: null,
  onSubmitError: null,
  validate: false,
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  onSubmitError: PropTypes.func,
  validate: PropTypes.bool,
};

export default Form;
