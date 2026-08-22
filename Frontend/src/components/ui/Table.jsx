import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SkeletonTableRow } from './Skeleton';

/**
 * Reusable Presentational Table component for Dayflow HRMS.
 * Sort callbacks are exposed via `onSort` prop. No backend logic.
 */
export const Table = ({
  columns = [],
  data = [],
  sortKey,
  sortDirection = 'asc',
  onSort,
  isLoading = false,
  emptyMessage = 'No records found',
  renderRow,
  hoverable = true,
  className = '',
}) => {
  const handleSortClick = (column) => {
    if (!column.sortable || !onSort) return;
    const isCurrent = sortKey === column.key;
    const nextDirection = isCurrent && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column.key, nextDirection);
  };

  return (
    <div className={twMerge('w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs', className)}>
      <table className="w-full text-left text-sm border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
            {columns.map((col) => {
              const isSorted = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={twMerge(
                    'py-3.5 px-4 select-none',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.sortable && 'cursor-pointer hover:bg-slate-100/80 transition-colors',
                    col.className
                  )}
                  onClick={() => handleSortClick(col)}
                >
                  <div
                    className={clsx(
                      'inline-flex items-center gap-1.5',
                      col.align === 'right' && 'justify-end w-full',
                      col.align === 'center' && 'justify-center w-full'
                    )}
                  >
                    <span>{col.label}</span>
                    {col.sortable && (
                      <span className="text-slate-400">
                        {isSorted ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-indigo-600" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-indigo-600" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 hover:text-slate-600" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonTableRow key={idx} columnsCount={columns.length || 4} />
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length || 1}
                className="py-12 px-4 text-center text-slate-500 font-medium text-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              if (renderRow) {
                return renderRow(row, rowIndex);
              }
              return (
                <tr
                  key={row.id || rowIndex}
                  className={clsx(
                    'transition-colors duration-150',
                    hoverable && 'hover:bg-slate-50/80'
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={twMerge(
                        'py-3.5 px-4 text-sm text-slate-700 align-middle',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center',
                        col.cellClassName
                      )}
                    >
                      {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
