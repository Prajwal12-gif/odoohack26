import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Presentational Tabs Component for Dayflow HRMS UI Kit.
 * Pure UI state controlled via props.
 */
export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = 'pill',
  className = '',
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex items-center gap-1 overflow-x-auto no-scrollbar',
          variant === 'pill' && 'bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60',
          variant === 'underline' && 'border-b border-slate-200 gap-6'
        ),
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        if (variant === 'underline') {
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onChange?.(tab.id)}
              className={clsx(
                'flex items-center gap-2 py-3 px-1 border-b-2 text-sm font-medium transition-all duration-200 ease-in-out whitespace-nowrap focus:outline-none focus:text-indigo-600',
                isActive
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300',
                tab.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {Icon && <Icon className="w-4 h-4 shrink-0" />}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={clsx(
                    'text-xs px-2 py-0.5 rounded-full font-semibold',
                    isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        }

        // Pill variant
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange?.(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500',
              isActive
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50',
              tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {Icon && <Icon className="w-4 h-4 shrink-0" />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={clsx(
                  'text-xs px-2 py-0.5 rounded-full font-semibold ml-1',
                  isActive ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-200 text-slate-700'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
