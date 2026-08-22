import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Reusable Card components for Dayflow HRMS.
 */
export const Card = React.forwardRef(({
  children,
  className = '',
  hoverable = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        clsx(
          'bg-white border border-slate-200 rounded-xl shadow-xs transition-all duration-200 ease-in-out overflow-hidden',
          hoverable && 'hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const CardHeader = ({ children, className = '', ...props }) => (
  <div
    className={twMerge('p-5 pb-3 border-b border-slate-100 flex flex-col gap-1', className)}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', as: Component = 'h3', ...props }) => (
  <Component
    className={twMerge('text-base font-semibold text-slate-900 tracking-tight', className)}
    {...props}
  >
    {children}
  </Component>
);

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={twMerge('text-xs text-slate-500', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={twMerge('p-5', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div
    className={twMerge('p-4 px-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-end gap-3', className)}
    {...props}
  >
    {children}
  </div>
);

export default Card;
