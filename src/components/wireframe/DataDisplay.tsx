'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { fakeList } from '@/lib/fake-data';

// Table component
export interface TableColumn<T = any> {
  key: string;
  header: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> extends React.HTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  compact?: boolean;
  fake?: boolean;
}

export function Table<T = any>({ 
  columns,
  data,
  striped = false,
  hover = false,
  bordered = false,
  compact = false,
  fake = false,
  className,
  ...props 
}: TableProps<T>) {
  const tableData = fake && data.length === 0 ? fakeList.items(5) : data;
  
  return (
    <div className="overflow-x-auto">
      <table 
        className={twMerge(
          'min-w-full divide-y divide-gray-200',
          bordered && 'border border-gray-200',
          className
        )} 
        {...props}
      >
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={twMerge(
                  'px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500',
                  compact && 'px-4 py-2',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right',
                  (!column.align || column.align === 'left') && 'text-left'
                )}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={twMerge(
          'divide-y divide-gray-200 bg-white',
          striped && '[&>tr:nth-child(even)]:bg-gray-50'
        )}>
          {tableData.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={hover ? 'hover:bg-gray-50' : ''}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={twMerge(
                    'whitespace-nowrap px-6 py-4 text-sm text-gray-900',
                    compact && 'px-4 py-2',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {column.render 
                    ? column.render(row[column.key as keyof T], row, rowIndex)
                    : String(row[column.key as keyof T] || '-')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// List component
const listVariants = cva(
  'divide-y divide-gray-200',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-gray-200 rounded-lg',
        cards: 'space-y-4 divide-y-0',
      },
      padding: {
        none: '',
        sm: '[&>li]:p-2',
        md: '[&>li]:p-4',
        lg: '[&>li]:p-6',
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    }
  }
);

export interface ListItemData {
  id: string | number;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  meta?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
}

export interface ListProps extends React.HTMLAttributes<HTMLUListElement>, VariantProps<typeof listVariants> {
  items: ListItemData[];
  onItemClick?: (item: ListItemData, index: number) => void;
}

export const List: React.FC<ListProps> = ({ 
  items,
  onItemClick,
  variant,
  padding,
  className,
  ...props 
}) => {
  return (
    <ul className={twMerge(listVariants({ variant, padding }), className)} {...props}>
      {items.map((item, index) => (
        <li
          key={item.id}
          onClick={() => onItemClick?.(item, index)}
          className={twMerge(
            'flex items-start gap-4',
            onItemClick && 'cursor-pointer hover:bg-gray-50',
            variant === 'cards' && 'rounded-lg border border-gray-200 bg-white p-4 shadow-sm'
          )}
        >
          {item.avatar && (
            <div className="flex-shrink-0">{item.avatar}</div>
          )}
          
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-900">{item.primary}</div>
            {item.secondary && (
              <div className="mt-1 text-sm text-gray-500">{item.secondary}</div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {item.meta && (
              <div className="text-sm text-gray-500">{item.meta}</div>
            )}
            {item.actions && (
              <div className="flex-shrink-0">{item.actions}</div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

// Stats component
export interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
}

export interface StatsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StatItem[];
  columns?: 2 | 3 | 4;
}

export const Stats: React.FC<StatsProps> = ({ 
  items,
  columns = 4,
  className,
  ...props 
}) => {
  return (
    <div 
      className={twMerge(
        'grid gap-4',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        className
      )} 
      {...props}
    >
      {items.map((item, index) => (
        <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{item.value}</p>
              {item.change && (
                <p className={twMerge(
                  'mt-2 text-sm font-medium',
                  item.changeType === 'increase' && 'text-green-600',
                  item.changeType === 'decrease' && 'text-red-600',
                  item.changeType === 'neutral' && 'text-gray-600'
                )}>
                  {item.changeType === 'increase' && '↑ '}
                  {item.changeType === 'decrease' && '↓ '}
                  {item.change}
                </p>
              )}
            </div>
            {item.icon && (
              <div className="ml-4 flex-shrink-0 text-gray-400">
                {item.icon}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Badge component
const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-cyan-100 text-cyan-800',
        purple: 'bg-purple-100 text-purple-800',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children,
  variant,
  size,
  dot,
  className,
  ...props 
}) => {
  return (
    <span className={twMerge(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {children}
    </span>
  );
};

// Progress component
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Progress: React.FC<ProgressProps> = ({ 
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'default',
  size = 'md',
  className,
  ...props 
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colors = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  };
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className={twMerge('w-full', className)} {...props}>
      {(label || showValue) && (
        <div className="mb-1 flex justify-between text-sm">
          {label && <span className="text-gray-600">{label}</span>}
          {showValue && <span className="text-gray-900 font-medium">{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className={twMerge('w-full bg-gray-200 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={twMerge('h-full transition-all duration-300', colors[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Empty State component
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon,
  title = 'No data found',
  description,
  action,
  className,
  ...props 
}) => {
  return (
    <div className={twMerge('text-center py-12', className)} {...props}>
      {icon && (
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};