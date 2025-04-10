'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  // Base button styles
  [
    'inline-flex items-center justify-center gap-2 rounded-[3px]',
    'font-[700] transition-colors duration-150 ease-out focus:outline-none border-0',
    'text-[14px] leading-[20px] tracking-[0.01rem] text-center',
    'overflow-hidden whitespace-nowrap text-ellipsis',
    'hover:cursor-pointer',
  ].join(' '),
  {
    variants: {
      // Button types
      buttonType: {
        default: '',
        alt: '',
        outline: '',
        'text-action': 'p-0 shadow-none bg-transparent',
      },
      // Button sizes
      size: {
        xs: 'h-6 px-2 text-[14px] leading-[20px]', // 1.5rem height
        s: 'h-8 px-4 text-[14px] leading-[20px]', // 2rem height
        m: 'h-10 px-4 text-[14px] leading-[20px]', // 2.5rem height - default
        l: 'h-12 px-6 text-[16px] leading-[24px]', // 3rem height
        xl: 'h-14 px-6 text-[16px] leading-[24px]', // 3.5rem height
      },
      // Color variations
      colorVariant: {
        grey: '',
        purple: '',
        orange: '',
        green: '',
        red: '',
        black: '',
        blue: '',
        pink: '',
      },
      // Button state
      isDisabled: {
        true: 'opacity-30 pointer-events-none cursor-default',
      },
      // Icon-only button
      isIconOnly: {
        true: 'p-0',
      },
      // Loading state
      isLoading: {
        true: '',
      },
      // Theme
      theme: {
        light: '',
        dark: '',
      },
    },
    // Compound variants for complex style combinations
    compoundVariants: [
      // Default button variants
      {
        buttonType: 'default',
        colorVariant: 'grey',
        theme: 'light',
        className:
          'bg-[var(--grey-overlay-200)] text-[var(--grey-overlay-800)] hover:bg-[var(--grey-overlay-400)] hover:text-[var(--grey-overlay-1000)] active:bg-[var(--grey-overlay-500)] active:text-[var(--grey-overlay-1000)]',
      },
      {
        buttonType: 'default',
        colorVariant: 'purple',
        theme: 'light',
        className:
          'bg-[var(--network-blue-400)] text-white hover:bg-[var(--network-blue-500)] active:bg-[var(--network-blue-600)]',
      },
      {
        buttonType: 'default',
        colorVariant: 'orange',
        theme: 'light',
        className:
          'bg-[var(--orange-400)] text-white hover:bg-[var(--orange-500)] active:bg-[var(--orange-600)]',
      },
      {
        buttonType: 'default',
        colorVariant: 'black',
        theme: 'light',
        className:
          'bg-[var(--grey-overlay-900)] text-white hover:bg-[var(--grey-overlay-1000)] active:bg-[var(--black)]',
      },
      {
        buttonType: 'default',
        colorVariant: 'pink',
        theme: 'light',
        className:
          'bg-[var(--pink-400)] text-white hover:bg-[var(--pink-500)] active:bg-[var(--pink-600)]',
      },

      // Alt button variants
      {
        buttonType: 'alt',
        colorVariant: 'purple',
        theme: 'light',
        className:
          'bg-[var(--network-blue-100)] text-[var(--network-blue-500)] hover:bg-[var(--network-blue-400)] hover:text-white active:bg-[var(--network-blue-500)]',
      },
      {
        buttonType: 'alt',
        colorVariant: 'green',
        theme: 'light',
        className:
          'bg-[var(--green-100)] text-[var(--green-500)] hover:bg-[var(--green-400)] hover:text-white active:bg-[var(--green-500)]',
      },
      {
        buttonType: 'alt',
        colorVariant: 'orange',
        theme: 'light',
        className:
          'bg-[var(--orange-100)] text-[var(--orange-500)] hover:bg-[var(--orange-400)] hover:text-white active:bg-[var(--orange-500)]',
      },
      {
        buttonType: 'alt',
        colorVariant: 'red',
        theme: 'light',
        className:
          'bg-[var(--red-100)] text-[var(--red-500)] hover:bg-[var(--red-400)] hover:text-white active:bg-[var(--red-500)]',
      },
      {
        buttonType: 'alt',
        colorVariant: 'pink',
        theme: 'light',
        className:
          'bg-[var(--pink-100)] text-[var(--pink-500)] hover:bg-[var(--pink-400)] hover:text-white active:bg-[var(--pink-500)]',
      },

      // Outline button variants
      {
        buttonType: 'outline',
        colorVariant: 'grey',
        theme: 'light',
        className:
          'bg-transparent text-[var(--grey-overlay-800)] border border-[var(--grey-overlay-400)] hover:bg-[var(--grey-overlay-400)] hover:text-[var(--grey-overlay-1000)] hover:border-transparent active:bg-[var(--grey-overlay-500)]',
      },
      {
        buttonType: 'outline',
        colorVariant: 'pink',
        theme: 'light',
        className:
          'bg-transparent text-[var(--pink-500)] border border-[var(--pink-400)] hover:bg-[var(--pink-100)] hover:text-[var(--pink-600)] hover:border-[var(--pink-500)] active:bg-[var(--pink-200)]',
      },

      // Text action button variants
      {
        buttonType: 'text-action',
        colorVariant: 'purple',
        theme: 'light',
        className:
          'text-[var(--network-blue-400)] hover:text-[var(--network-blue-500)] active:text-[var(--network-blue-600)]',
      },
      {
        buttonType: 'text-action',
        colorVariant: 'grey',
        theme: 'light',
        className:
          'text-[var(--grey-overlay-800)] hover:text-[var(--grey-overlay-1000)]',
      },
      {
        buttonType: 'text-action',
        colorVariant: 'green',
        theme: 'light',
        className:
          'text-[var(--green-400)] hover:text-[var(--green-500)] active:text-[var(--green-600)]',
      },
      {
        buttonType: 'text-action',
        colorVariant: 'orange',
        theme: 'light',
        className:
          'text-[var(--orange-400)] hover:text-[var(--orange-500)] active:text-[var(--orange-600)]',
      },
      {
        buttonType: 'text-action',
        colorVariant: 'red',
        theme: 'light',
        className:
          'text-[var(--red-400)] hover:text-[var(--red-500)] active:text-[var(--red-600)]',
      },
      {
        buttonType: 'text-action',
        colorVariant: 'pink',
        theme: 'light',
        className:
          'text-[var(--pink-400)] hover:text-[var(--pink-500)] active:text-[var(--pink-600)]',
      },
      {
        buttonType: 'text-action',
        colorVariant: 'blue',
        theme: 'light',
        className:
          'text-[var(--network-blue-400)] hover:text-[var(--network-blue-500)] active:text-[var(--network-blue-600)]',
      },

      // Dark theme variations
      {
        buttonType: 'default',
        colorVariant: 'grey',
        theme: 'dark',
        className:
          'bg-[var(--white-overlay-200)] text-[var(--white-overlay-800)] hover:bg-[var(--white-overlay-400)] hover:text-white active:bg-[var(--white-overlay-500)] active:text-white',
      },
      {
        buttonType: 'outline',
        colorVariant: 'grey',
        theme: 'dark',
        className:
          'bg-transparent text-[var(--white-overlay-800)] border border-[var(--white-overlay-400)] hover:bg-[var(--white-overlay-400)] hover:text-white hover:border-transparent active:bg-[var(--white-overlay-500)]',
      },

      // Icon only size variants
      {
        isIconOnly: true,
        size: 'xs',
        className: 'w-6 p-0', // 1.5rem width
      },
      {
        isIconOnly: true,
        size: 's',
        className: 'w-8 p-0', // 2rem width
      },
      {
        isIconOnly: true,
        size: 'm',
        className: 'w-10 p-0', // 2.5rem width
      },
      {
        isIconOnly: true,
        size: 'l',
        className: 'w-12 p-0', // 3rem width
      },
      {
        isIconOnly: true,
        size: 'xl',
        className: 'w-14 p-0', // 3.5rem width
      },
    ],
    defaultVariants: {
      buttonType: 'default',
      size: 'm',
      colorVariant: 'grey',
      theme: 'light',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  iconOnly?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      buttonType,
      size,
      colorVariant,
      disabled,
      loading,
      iconOnly,
      theme,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={twMerge(
          buttonVariants({
            buttonType,
            size,
            colorVariant,
            isDisabled: !!disabled,
            isLoading: !!loading,
            isIconOnly: !!iconOnly,
            theme,
            className,
          })
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        <span className="inline-flex items-center justify-center gap-2 h-full min-w-0">
          {loading ? (
            <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            children
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
