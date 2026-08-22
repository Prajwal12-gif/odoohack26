import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Status Badge Pill for Dayflow HRMS UI Kit.
 * Variants: success, warning, danger, info, neutral, primary.
 */
export const Badge = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/60',
    danger: 'bg-rose-50 text-rose-700 border-rose-200/60',
    info: 'bg-sky-50 text-sky-700 border-sky-200/60',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
  };

  const dotStyles = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    neutral: 'bg-slate-400',
    primary: 'bg-indigo-500',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium gap-1.5',
    md: 'text-xs px-2.5 py-1 font-medium gap-1.5',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-lg border transition-all duration-200 select-none whitespace-nowrap',
          variantStyles[variant] || variantStyles.neutral,
          sizeStyles[size] || sizeStyles.md,
          className
        )
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full shrink-0 animate-pulse',
            dotStyles[variant] || dotStyles.neutral
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
