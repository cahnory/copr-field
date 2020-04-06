import React from 'react';
import { useCopr } from '@copr-field/react';
import PropTypes from 'prop-types';

const Help = ({ name }) => {
  const { copr, result } = useCopr(name);

  return !copr.rules.length ? null : (
    <>
      {copr.meta.ruleListStart}
      <ul className="list-group">
        {copr.rules.map((rule, index) => {
          const content = result.content[index] || {
            isPending: copr.allowEmpty,
            isValid: !result.isEmpty,
          };
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="list-group-item">
              <RuleIcon
                isPending={content.isPending}
                isValid={content.isValid}
              />
              {rule.meta.description}
              <RuleStatus
                isPending={content.isPending}
                isValid={content.isValid}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

Help.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Help;

const RuleIcon = ({ isValid, isPending }) => (
  <span aria-hidden className="rule-icon">
    {(isPending && <span className="mr-1 text-warning">◌</span>) ||
      (isValid ? (
        <span className="mr-1 text-success">✓</span>
      ) : (
        <span className="mr-1 text-danger">✗</span>
      ))}
  </span>
);

RuleIcon.propTypes = {
  isPending: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

const RuleStatus = ({ isValid, isPending }) => (
  <span className="sr-only">
    {': '}
    {(isPending && 'checking') || (isValid ? 'succeeds' : 'fails')}
  </span>
);

RuleStatus.propTypes = {
  isPending: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};
