import React from 'react';

const Avatar = ({ name, className = '' }) => (
  <span className={`avatar ${className}`}>
    {name?.charAt(0).toUpperCase()}
  </span>
);

export default Avatar;
