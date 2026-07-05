import React from 'react';
import Avatar from './Avatar';

const Tag = ({ contact, onRemove }) => (
  <span className="tag">
    <Avatar name={contact.name} />
    <span className="tag-text">
      {contact.name} ({contact.email})
    </span>
    <span
      className="tag-remove"
      role="button"
      aria-label={`Remove ${contact.email}`}
      onClick={(e) => {
        e.stopPropagation();
        onRemove(contact.email);
      }}
    >
      ×
    </span>
  </span>
);

export default Tag;
