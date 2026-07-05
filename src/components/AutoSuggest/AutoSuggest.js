import React from 'react';
import data from '../../mock-data';
import useAutoSuggest from './hooks/useAutoSuggest';
import Tag from './parts/Tag';
import Dropdown from './parts/Dropdown';
import './AutoSuggest.css';

const AutoSuggest = () => {
  const {
    inputRef,
    containerRef,
    input,
    selected,
    suggestions,
    highlight,
    isActive,
    showDropdown,
    canAddTyped,
    activate,
    addTag,
    addTypedEmail,
    removeTag,
    setHighlight,
    onInputChange,
    onKeyDown,
  } = useAutoSuggest(data);

  return (
    <div className="to-wrapper">
      <div
        ref={containerRef}
        className={`to-field ${isActive ? 'active' : ''}`}
        onClick={activate}
      >
        <span className="to-label">To</span>

        {/* Tags first → cursor is always to their right */}
        {selected.map((contact) => (
          <Tag key={contact.email} contact={contact} onRemove={removeTag} />
        ))}

        <input
          ref={inputRef}
          className="to-input"
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onFocus={activate}
        />

        {showDropdown && (
          <Dropdown
            suggestions={suggestions}
            highlight={highlight}
            canAddTyped={canAddTyped}
            inputValue={input}
            onSelect={addTag}
            onAddTyped={addTypedEmail}
            onHover={setHighlight}
          />
        )}
      </div>
    </div>
  );
};

export default AutoSuggest;
