import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { isValidEmail } from '../utils/validation';
import { filterContacts, MIN_CHARS } from '../utils/filter';

export default function useAutoSuggest(initialData = []) {
  const [contacts, setContacts] = useState(initialData); // searchable list (grows)
  const [selected, setSelected] = useState([]);           // chosen tags
  const [input, setInput] = useState('');
  const [isActive, setIsActive] = useState(false);        // block clicked/focused
  const [highlight, setHighlight] = useState(0);          // keyboard nav index

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const selectedEmails = useMemo(
    () => new Set(selected.map((s) => s.email)),
    [selected]
  );

  const suggestions = useMemo(
    () => filterContacts(contacts, input, selectedEmails),
    [contacts, input, selectedEmails]
  );

  const showDropdown = isActive && input.trim().length >= MIN_CHARS;

  // Focus input (blinking cursor) when block becomes active.
  useEffect(() => {
    if (isActive) inputRef.current?.focus();
  }, [isActive]);

  // Deactivate on outside click.
  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const activate = useCallback(() => setIsActive(true), []);

  const addTag = useCallback(
    (contact) => {
      if (selectedEmails.has(contact.email)) return;
      setSelected((prev) => [...prev, contact]);
      setInput('');
      setHighlight(0);
      inputRef.current?.focus();
    },
    [selectedEmails]
  );

  // Add a typed valid email that isn't on the list + remember it.
  const addTypedEmail = useCallback(() => {
    const value = input.trim();
    if (!isValidEmail(value)) return false;

    const existing = contacts.find(
      (c) => c.email.toLowerCase() === value.toLowerCase()
    );
    const contact = existing || { name: value.split('@')[0], email: value };

    if (!existing) setContacts((prev) => [...prev, contact]); // stays searchable
    addTag(contact);
    return true;
  }, [input, contacts, addTag]);

  const removeTag = useCallback((email) => {
    setSelected((prev) => prev.filter((s) => s.email !== email));
    inputRef.current?.focus();
  }, []);

  const removeLastTag = useCallback(() => {
    setSelected((prev) => prev.slice(0, -1));
  }, []);

  const onInputChange = useCallback((e) => {
    setInput(e.target.value);
    setHighlight(0);
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      if (showDropdown && e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
        return;
      }
      if (showDropdown && e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        if (showDropdown && suggestions[highlight]) {
          e.preventDefault();
          addTag(suggestions[highlight]);
        } else if (input.trim() && addTypedEmail()) {
          e.preventDefault();
        }
        return;
      }
      if (
        (e.key === 'Backspace' || e.key === 'Delete') &&
        input === '' &&
        selected.length > 0
      ) {
        e.preventDefault();
        removeLastTag();
      }
    },
    [
      showDropdown,
      suggestions,
      highlight,
      input,
      selected,
      addTag,
      addTypedEmail,
      removeLastTag,
    ]
  );

  return {
    // refs
    inputRef,
    containerRef,
    // state
    input,
    selected,
    suggestions,
    highlight,
    isActive,
    showDropdown,
    canAddTyped: isValidEmail(input),
    // handlers
    activate,
    addTag,
    addTypedEmail,
    removeTag,
    setHighlight,
    onInputChange,
    onKeyDown,
  };
}
