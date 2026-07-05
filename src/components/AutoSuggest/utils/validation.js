// Pure, testable email check.
export const isValidEmail = (value = '') =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
