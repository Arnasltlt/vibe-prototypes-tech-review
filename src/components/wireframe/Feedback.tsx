'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

// Alert component
const alertVariants = cva(
  'relative rounded-lg p-4',
  {
    variants: {
      variant: {
        info: 'bg-blue-50 text-blue-800 border border-blue-200',
        success: 'bg-green-50 text-green-800 border border-green-200',
        warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
        error: 'bg-red-50 text-red-800 border border-red-200',
        neutral: 'bg-gray-50 text-gray-800 border border-gray-200',
      },
      size: {
        sm: 'p-3 text-sm',
        md: 'p-4',
        lg: 'p-5 text-lg',
      }
    },
    defaultVariants: {
      variant: 'info',
      size: 'md',
    }
  }
);

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ 
  className,
  variant,
  size,
  title,
  icon,
  onClose,
  children,
  ...props 
}) => {
  return (
    <div className={twMerge(alertVariants({ variant, size }), className)} {...props}>
      <div className="flex">
        {icon && (
          <div className="flex-shrink-0 mr-3">
            {icon}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className="font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 inline-flex text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Toast/Notification component
export interface ToastProps extends AlertProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export const Toast: React.FC<ToastProps> = ({ 
  position = 'top-right',
  className,
  ...props 
}) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };
  
  return (
    <div className={twMerge('fixed z-50', positionClasses[position], className)}>
      <Alert {...props} />
    </div>
  );
};

// Modal component
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  title?: string;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Modal: React.FC<ModalProps> = ({ 
  open,
  onClose,
  title,
  footer,
  size = 'md',
  children,
  className,
  ...props 
}) => {
  if (!open) return null;
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className={twMerge(
              'relative w-full bg-white rounded-lg shadow-xl',
              sizeClasses[size],
              className
            )}
            {...props}
          >
            {/* Header */}
            {(title || onClose) && (
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                {title && (
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                )}
                {onClose && (
                  <button
                    onClick={onClose}
                    className="ml-auto inline-flex text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            
            {/* Body */}
            <div className="px-6 py-4">
              {children}
            </div>
            
            {/* Footer */}
            {footer && (
              <div className="border-t border-gray-200 px-6 py-4">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Tooltip component
export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  content,
  children,
  position = 'top' 
}) => {
  const [visible, setVisible] = React.useState(false);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={twMerge(
          'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md whitespace-nowrap',
          positionClasses[position]
        )}>
          {content}
        </div>
      )}
    </div>
  );
};

// Drawer/Slide-over component
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  title?: string;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

export const Drawer: React.FC<DrawerProps> = ({ 
  open,
  onClose,
  title,
  position = 'right',
  size = 'md',
  children,
  className,
  ...props 
}) => {
  if (!open) return null;
  
  const sizeClasses = {
    sm: 'max-w-xs',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={twMerge(
        'fixed inset-y-0 z-50 flex',
        position === 'left' ? 'left-0' : 'right-0'
      )}>
        <div 
          className={twMerge(
            'relative w-full bg-white shadow-xl',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            {title && (
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="ml-auto inline-flex text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// Loading Spinner component
const spinnerVariants = cva(
  'animate-spin rounded-full border-b-2 border-current',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      color: {
        primary: 'text-blue-600',
        secondary: 'text-gray-600',
        success: 'text-green-600',
        danger: 'text-red-600',
        warning: 'text-yellow-600',
        white: 'text-white',
      }
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    }
  }
);

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  className,
  size,
  color,
  label,
  ...props 
}) => {
  return (
    <div className="inline-flex flex-col items-center gap-2" {...props}>
      <div className={twMerge(spinnerVariants({ size, color }), className)} />
      {label && (
        <span className="text-sm text-gray-600">{label}</span>
      )}
    </div>
  );
};