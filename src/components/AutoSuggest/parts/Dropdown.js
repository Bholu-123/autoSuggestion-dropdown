import React from 'react';
import SuggestionItem from './SuggestionItem';

const Dropdown = ({
  suggestions,
  highlight,
  canAddTyped,
  inputValue,
  onSelect,
  onAddTyped,
  onHover,
}) => (
  <ul className="dropdown">
    {suggestions.length > 0 ? (
      suggestions.map((contact, i) => (
        <SuggestionItem
          key={contact.email}
          contact={contact}
          isHighlighted={i === highlight}
          onSelect={onSelect}
          onHover={() => onHover(i)}
        />
      ))
    ) : canAddTyped ? (
      <li
        className="dropdown-item add-new"
        onMouseDown={(e) => {
          e.preventDefault();
          onAddTyped();
        }}
      >
        Add “{inputValue.trim()}”
      </li>
    ) : (
      <li className="dropdown-item no-result">No matches found</li>
    )}
  </ul>
);

export default Dropdown;
