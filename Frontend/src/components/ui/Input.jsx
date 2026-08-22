import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Accessible Input component for Dayflow HRMS UI Kit.
 * Displays label, validation errors, helper text, start/end icons.
 */
export const Input = React.forwardRef(({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  startIcon: StartIcon,
  endIcon: EndIcon,
  disabled = false,
  required = false,
  type = 'text',
  id,
  name,
  className = '',
  inputClassName = '',
  ...props
}, ref) => {
  const generatedId = id || (name ? `input-${name}` : undefined);
  const errorId = generatedId ? `${generatedId}-error` : undefined;
  const helperId = generatedId ? `${generatedId}-helper` : undefined;

  return (
    <div className={twMerge('w-full flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={generatedId}
          className="text-xs font-semibold tracking-wide text-slate-700 uppercase flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-rose-500 ml-1" aria-hidden="true">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {StartIcon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
            <StartIcon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={generatedId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={
            [error ? errorId : null, helperText ? helperId : null]
              .filter(Boolean)
              .join(' ') || undefined
          }
          className={twMerge(
            clsx(
              'w-full bg-white text-slate-900 placeholder-slate-400 text-sm rounded-lg border px-3.5 py-2.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1',
              StartIcon ? 'pl-9.5' : 'pl-3.5',
              EndIcon ? 'pr-9.5' : 'pr-3.5',
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                : 'border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-200',
              disabled && 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
            ),
            inputClassName
          )}
          {...props}
        />

        {EndIcon && (
          <div className="absolute right-3 text-slate-400 pointer-events-none flex items-center justify-center">
            <EndIcon className="w-4 h-4" />
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-0.5">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="text-xs text-slate-500 mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
