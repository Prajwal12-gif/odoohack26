import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Presentational Select/Dropdown component for Dayflow HRMS UI Kit.
 * Pure UI state using props. No data fetching.
 */
export const Dropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  error,
  disabled = false,
  required = false,
  id,
  name,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Normalize options to object format
  const normalizedOptions = options.map((opt) =>
    typeof opt === 'string' || typeof opt === 'number'
      ? { value: opt, label: String(opt) }
      : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    if (disabled) return;
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={twMerge('w-full flex flex-col gap-1.5 relative', className)} ref={dropdownRef}>
      {label && (
        <label className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={clsx(
          'w-full bg-white text-slate-900 text-sm rounded-lg border px-3.5 py-2.5 flex items-center justify-between transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 text-left',
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-200',
          disabled && 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
        )}
      >
        <span className={clsx(!selectedOption && 'text-slate-400 font-normal')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={clsx(
            'w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2',
            isOpen && 'rotate-180 text-indigo-600'
          )}
        />
      </button>

      {/* Dropdown Options List */}
      {isOpen && !disabled && (
        <ul
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-auto py-1 text-sm animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {normalizedOptions.length === 0 ? (
            <li className="px-4 py-2.5 text-xs text-slate-400 italic">No options available</li>
          ) : (
            normalizedOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={clsx(
                    'px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-colors duration-150 select-none',
                    option.disabled
                      ? 'opacity-50 cursor-not-allowed bg-slate-50 text-slate-400'
                      : isSelected
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />}
                </li>
              );
            })
          )}
        </ul>
      )}

      {error && <p className="text-xs text-rose-600 font-medium mt-0.5">{error}</p>}
    </div>
  );
};

export default Dropdown;
