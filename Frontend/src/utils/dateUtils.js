/**
 * Dayflow HRMS - Pure Date Utilities
 * Pure date calculations for calendar rendering and date math. No API connections.
 */

/**
 * Returns an array of date objects representing all days to display in a 7xN calendar grid
 * including padding days from previous and next months.
 */
export const getCalendarMonthDays = (year, monthIndex) => {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun, 1 = Mon ...
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = [];

  // Previous month padding
  const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, monthIndex - 1, prevMonthLastDay - i);
    calendarDays.push({
      date: d,
      isCurrentMonth: false,
      dayNumber: d.getDate(),
      dateKey: formatDateKey(d),
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, monthIndex, i);
    calendarDays.push({
      date: d,
      isCurrentMonth: true,
      dayNumber: i,
      dateKey: formatDateKey(d),
    });
  }

  // Next month padding to fill grid to multiple of 7 (up to 35 or 42 days)
  const remaining = (7 - (calendarDays.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, monthIndex + 1, i);
    calendarDays.push({
      date: d,
      isCurrentMonth: false,
      dayNumber: d.getDate(),
      dateKey: formatDateKey(d),
    });
  }

  return calendarDays;
};

/**
 * Returns ISO-like "YYYY-MM-DD" string for key matching
 */
export const formatDateKey = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Checks if a given date is today
 */
export const isToday = (dateValue) => {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if two date objects represent the same calendar day
 */
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

/**
 * Format a start and end date range string (e.g. "Oct 12 - Oct 16, 2026")
 */
export const formatDateRange = (startDateStr, endDateStr) => {
  if (!startDateStr) return '';
  const start = new Date(startDateStr);
  const end = endDateStr ? new Date(endDateStr) : start;

  const startMonth = start.toLocaleString('en-US', { month: 'short' });
  const endMonth = end.toLocaleString('en-US', { month: 'short' });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = end.getFullYear();

  if (isSameDay(start, end)) {
    return `${startMonth} ${startDay}, ${year}`;
  }

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`;
  }

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
};

/**
 * Calculate difference in days between two dates inclusive
 */
export const getDaysDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
