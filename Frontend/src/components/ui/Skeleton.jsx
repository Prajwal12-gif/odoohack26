import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Loading Skeleton placeholders for Dayflow HRMS UI Kit.
 */
export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={twMerge('animate-pulse bg-slate-200/80 rounded-md', className)}
      {...props}
    />
  );
};

export const SkeletonText = ({ lines = 1, className = '' }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton
          key={idx}
          className={twMerge(
            'h-3.5 bg-slate-200/80 rounded-sm',
            idx === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full',
            className
          )}
        />
      ))}
    </div>
  );
};

export const SkeletonAvatar = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <Skeleton
      className={twMerge('rounded-full shrink-0', sizes[size] || sizes.md, className)}
    />
  );
};

export const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={twMerge('p-5 border border-slate-200 rounded-xl bg-white flex flex-col gap-4', className)}>
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="md" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <SkeletonText lines={2} />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
};

export const SkeletonTableRow = ({ columnsCount = 4, className = '' }) => {
  return (
    <tr className={twMerge('border-b border-slate-100', className)}>
      {Array.from({ length: columnsCount }).map((_, idx) => (
        <td key={idx} className="py-3.5 px-4">
          <Skeleton className="h-4 w-4/5" />
        </td>
      ))}
    </tr>
  );
};

export default Skeleton;
