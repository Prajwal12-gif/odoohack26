import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getCalendarMonthDays, isToday, isSameDay, formatDateKey } from '../../utils/dateUtils';
import Badge from './Badge';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const EVENT_STATUS_VARIANTS = {
  present: 'success',
  absent: 'danger',
  leave: 'info',
  'half-day': 'warning',
  holiday: 'primary',
};

/**
 * Pure Presentational Month View Calendar component for Dayflow HRMS UI Kit.
 * Receives all event data and dates via props. NO internal fetching.
 */
export const Calendar = ({
  currentMonth = new Date(),
  selectedDate,
  events = [],
  onDateSelect,
  onPrevMonth,
  onNextMonth,
  className = '',
}) => {
  const monthDate = new Date(currentMonth);
  const year = monthDate.getFullYear();
  const monthIndex = monthDate.getMonth();

  const monthName = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const calendarDays = getCalendarMonthDays(year, monthIndex);

  // Map events array by dateKey for fast lookup
  const eventsByDate = events.reduce((acc, ev) => {
    const key = ev.dateKey || (ev.date ? formatDateKey(ev.date) : '');
    if (key) {
      if (!acc[key]) acc[key] = [];
      acc[key].push(ev);
    }
    return acc;
  }, {});

  return (
    <div className={twMerge('w-full bg-white border border-slate-200 rounded-xl shadow-xs p-4 sm:p-5', className)}>
      {/* Calendar Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-900">{monthName}</h2>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPrevMonth}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels Grid */}
      <div className="grid grid-cols-7 text-center border-b border-slate-100 pb-2 mb-1">
        {WEEKDAYS.map((day) => (
          <span key={day} className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {calendarDays.map((cell) => {
          const isSelected = selectedDate && isSameDay(cell.date, selectedDate);
          const cellIsToday = isToday(cell.date);
          const dayEvents = eventsByDate[cell.dateKey] || [];

          return (
            <button
              key={cell.dateKey}
              type="button"
              onClick={() => onDateSelect?.(cell.date)}
              className={clsx(
                'min-h-[52px] sm:min-h-[64px] p-1 sm:p-1.5 rounded-xl flex flex-col items-start justify-between border transition-all duration-150 text-left relative focus:outline-none focus:ring-2 focus:ring-indigo-500',
                cell.isCurrentMonth ? 'bg-white border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/30' : 'bg-slate-50/50 border-transparent opacity-40',
                cellIsToday && 'ring-1 ring-indigo-500 bg-indigo-50/20 font-semibold',
                isSelected && 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500'
              )}
            >
              <span
                className={clsx(
                  'text-xs inline-flex items-center justify-center w-5 h-5 rounded-full font-medium',
                  cellIsToday
                    ? 'bg-indigo-600 text-white'
                    : cell.isCurrentMonth
                    ? 'text-slate-800'
                    : 'text-slate-400'
                )}
              >
                {cell.dayNumber}
              </span>

              {/* Event status badges / indicators */}
              {dayEvents.length > 0 && (
                <div className="w-full mt-1 flex flex-col gap-0.5">
                  {dayEvents.slice(0, 2).map((ev, idx) => (
                    <Badge
                      key={idx}
                      variant={EVENT_STATUS_VARIANTS[ev.status] || 'neutral'}
                      size="sm"
                      className="w-full truncate text-[10px] py-0 px-1 font-normal justify-start"
                    >
                      {ev.label || ev.status}
                    </Badge>
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="text-[9px] text-slate-400 font-medium pl-1">
                      +{dayEvents.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
