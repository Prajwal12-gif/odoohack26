import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Presentational Toast Banner component for Dayflow HRMS UI Kit.
 * Pure UI presentation controlled via props.
 */
export const Toast = ({
  variant = 'info',
  title,
  message,
  onDismiss,
  actionLabel,
  onAction,
  className = '',
}) => {
  const variantConfig = {
    success: {
      icon: CheckCircle2,
      container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      iconColor: 'text-emerald-600',
      actionBtn: 'text-emerald-700 hover:text-emerald-900 bg-emerald-100',
    },
    error: {
      icon: AlertCircle,
      container: 'bg-rose-50 border-rose-200 text-rose-900',
      iconColor: 'text-rose-600',
      actionBtn: 'text-rose-700 hover:text-rose-900 bg-rose-100',
    },
    warning: {
      icon: AlertTriangle,
      container: 'bg-amber-50 border-amber-200 text-amber-900',
      iconColor: 'text-amber-600',
      actionBtn: 'text-amber-700 hover:text-amber-900 bg-amber-100',
    },
    info: {
      icon: Info,
      container: 'bg-sky-50 border-sky-200 text-sky-900',
      iconColor: 'text-sky-600',
      actionBtn: 'text-sky-700 hover:text-sky-900 bg-sky-100',
    },
  };

  const config = variantConfig[variant] || variantConfig.info;
  const IconComponent = config.icon;

  return (
    <div
      role="alert"
      className={twMerge(
        clsx(
          'flex items-start gap-3 p-4 rounded-xl border shadow-md transition-all duration-200 ease-in-out max-w-md w-full animate-in slide-in-from-top-2 fade-in',
          config.container,
          className
        )
      )}
    >
      <IconComponent className={clsx('w-5 h-5 shrink-0 mt-0.5', config.iconColor)} />

      <div className="flex-1 min-w-0">
        {title && <h4 className="text-sm font-semibold tracking-tight">{title}</h4>}
        {message && <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{message}</p>}

        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className={clsx(
              'mt-2 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors focus:outline-none focus:ring-2',
              config.actionBtn
            )}
          >
            {actionLabel}
          </button>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-400"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;
