export const MIN_CHARS = 3;

// Match anywhere in name OR email, case-insensitive.
export const matchesQuery = (contact, query) => {
  const q = query.trim().toLowerCase();
  return (
    contact.name.toLowerCase().includes(q) ||
    contact.email.toLowerCase().includes(q)
  );
};

// Filter list by query, excluding already-selected emails.
export const filterContacts = (list, query, selectedEmails) => {
  if (query.trim().length < MIN_CHARS) return [];
  return list.filter(
    (c) => !selectedEmails.has(c.email) && matchesQuery(c, query)
  );
};
