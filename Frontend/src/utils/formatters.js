/**
 * Dayflow HRMS - Pure Utility Formatters
 * Pure string and number formatting functions. No API or side effects.
 */

/**
 * Format a number as currency (defaults to USD / INR depending on options)
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date string or Date object into standard display format (e.g., "Oct 24, 2026")
 */
export const formatDate = (dateValue, options = {}) => {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return '';

  const defaultOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  };
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
};

/**
 * Format time (e.g., "09:00 AM")
 */
export const formatTime = (timeString) => {
  if (!timeString) return '--:--';
  // Handles ISO date strings or "HH:mm" strings
  let date;
  if (timeString.includes('T') || timeString.includes('-')) {
    date = new Date(timeString);
  } else {
    const [hours, minutes] = timeString.split(':');
    date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
  }
  if (isNaN(date.getTime())) return timeString;
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

/**
 * Generate 1 or 2 letter uppercase initials from a full name (e.g. "Jane Doe" -> "JD")
 */
export const getInitials = (name = '') => {
  if (!name) return 'DF';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Format numbers with thousand separators (e.g., 12500 -> "12,500")
 */
export const formatNumber = (value) => {
  if (value === undefined || value === null || isNaN(value)) return '0';
  return new Intl.NumberFormat('en-US').format(value);
};
