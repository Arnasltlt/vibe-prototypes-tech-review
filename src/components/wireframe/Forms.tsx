'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { fakeText } from '@/lib/fake-data';

// Input component
const inputVariants = cva(
  'w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-300 focus:border-green-500 focus:ring-green-500',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    }
  }
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helper?: string;
  fake?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  className,
  variant,
  size,
  label,
  error,
  helper,
  fake,
  placeholder,
  id,
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const displayPlaceholder = fake && !placeholder ? fakeText.sentence(3) : placeholder;
  
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={twMerge(
          inputVariants({ variant: error ? 'error' : variant, size }),
          className
        )}
        placeholder={displayPlaceholder}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      {helper && !error && (
        <p className="text-xs text-gray-500">{helper}</p>
      )}
    </div>
  );
};

// Textarea component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  fake?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ 
  className,
  label,
  error,
  helper,
  fake,
  placeholder,
  id,
  rows = 4,
  ...props 
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const displayPlaceholder = fake && !placeholder ? fakeText.paragraph() : placeholder;
  
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={twMerge(
          'w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2',
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          className
        )}
        placeholder={displayPlaceholder}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      {helper && !error && (
        <p className="text-xs text-gray-500">{helper}</p>
      )}
    </div>
  );
};

// Select component
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ 
  className,
  label,
  error,
  helper,
  options,
  placeholder,
  id,
  ...props 
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={twMerge(
          'w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2',
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value} 
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      {helper && !error && (
        <p className="text-xs text-gray-500">{helper}</p>
      )}
    </div>
  );
};

// Checkbox component
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  className,
  label,
  error,
  id,
  ...props 
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-1">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={checkboxId}
          className={twMerge(
            'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500',
            error && 'border-red-300',
            className
          )}
          {...props}
        />
        {label && (
          <label htmlFor={checkboxId} className="ml-2 text-sm text-gray-700">
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

// Radio component
export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  name,
  options,
  value,
  onChange,
  label,
  error,
  orientation = 'vertical',
  className,
  ...props 
}) => {
  return (
    <div className="space-y-1" {...props}>
      {label && (
        <p className="text-sm font-medium text-gray-700">{label}</p>
      )}
      <div className={twMerge(
        'flex',
        orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4',
        className
      )}>
        {options.map((option) => {
          const radioId = `${name}-${option.value}`;
          return (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={radioId}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={option.disabled}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor={radioId} className="ml-2 text-sm text-gray-700">
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

// Switch/Toggle component
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  onLabel?: string;
  offLabel?: string;
}

export const Switch: React.FC<SwitchProps> = ({ 
  className,
  label,
  onLabel = 'On',
  offLabel = 'Off',
  checked,
  id,
  ...props 
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="flex items-center justify-between">
      {label && (
        <label htmlFor={switchId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">{offLabel}</span>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            id={switchId}
            className="sr-only peer"
            checked={checked}
            {...props}
          />
          <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2">
            <div className={twMerge(
              'absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition-transform',
              checked && 'translate-x-5'
            )} />
          </div>
        </label>
        <span className="text-xs text-gray-500">{onLabel}</span>
      </div>
    </div>
  );
};

// Form Field Group component
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helper?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label,
  required,
  error,
  helper,
  children,
  className,
  ...props 
}) => {
  return (
    <div className={twMerge('space-y-1', className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      {helper && !error && (
        <p className="text-xs text-gray-500">{helper}</p>
      )}
    </div>
  );
};

// Form component
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  description?: string;
}

export const Form: React.FC<FormProps> = ({ 
  title,
  description,
  children,
  className,
  ...props 
}) => {
  return (
    <form className={twMerge('space-y-6', className)} {...props}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      {children}
    </form>
  );
};

// Search Input component
export interface SearchInputProps extends Omit<InputProps, 'type'> {
  onSearch?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch,
  className,
  ...props 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(e.currentTarget.value);
    }
  };
  
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <Input
        type="search"
        className={twMerge('pl-10', className)}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
};