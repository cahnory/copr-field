import React from 'react';
import PropTypes from 'prop-types';
import CoprContext from './CoprContext';
import useCopr from './useCopr';

const CoprField = ({ children, name }) => {
  const field = useCopr(name);

  return (
    <CoprContext.Provider value={field}>
      {typeof children === 'function' ? children(field) : children}
    </CoprContext.Provider>
  );
};

CoprField.defaultProps = {
  name: undefined,
};

CoprField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.func.isRequired,
  ]).isRequired,
  name: PropTypes.string,
};

export default CoprField;
