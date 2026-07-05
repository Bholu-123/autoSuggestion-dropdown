import React from 'react';
import Avatar from './Avatar';

const SuggestionItem = ({ contact, isHighlighted, onSelect, onHover }) => (
  <li
    className={`dropdown-item ${isHighlighted ? 'highlight' : ''}`}
    // onMouseDown (not onClick) so input doesn't blur before selection
    onMouseDown={(e) => {
      e.preventDefault();
      onSelect(contact);
    }}
    onMouseEnter={onHover}
  >
    <Avatar name={contact.name} className="avatar-lg" />
    <span className="item-info">
      <span className="item-name">{contact.name}</span>
      <span className="item-email">{contact.email}</span>
    </span>
  </li>
);

export default SuggestionItem;
