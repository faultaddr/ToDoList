import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ active, children, onClick }: any) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    // eslint-disable-line jsx-a11y/anchor-is-valid
    <button
      type="button"
      onClick={(e) => {
        // eslint-disable-line jsx-a11y/anchor-is-valid
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
