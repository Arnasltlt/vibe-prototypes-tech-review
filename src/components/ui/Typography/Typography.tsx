'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-[40px] leading-[48px] font-[500]',
      h2: 'text-[36px] leading-[44px] font-[500]',
      h3: 'text-[24px] leading-[32px] font-[500]',
      subtitle1: 'text-[20px] leading-[28px] font-[500]',
      subtitle2: 'text-[16px] leading-[24px] font-[500]',
      body1: 'text-[16px] leading-[24px] font-[400]',
      body2: 'text-[14px] leading-[20px] font-[400]',
      caption: 'text-[12px] leading-[16px] font-[400]',
      eyebrow: 'text-[14px] leading-[20px] font-[500] uppercase tracking-wider',
    },
    color: {
      default: 'text-[var(--text-default)]',
      subtle: 'text-[var(--text-subtle)]',
      subtleWhite: 'text-[var(--text-subtle-white)]',
      white: 'text-white',
      purple: 'text-[var(--network-blue-400)]',
      green: 'text-[var(--green-400)]',
      orange: 'text-[var(--orange-400)]',
      red: 'text-[var(--red-400)]',
    },
  },
  defaultVariants: {
    variant: 'body1',
    color: 'default',
  },
});

// Map variant to the appropriate HTML element
const variantElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subtitle1: 'h4',
  subtitle2: 'h5',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  eyebrow: 'span',
} as const;

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

const Typography = ({
  variant = 'body1',
  color,
  as,
  className,
  children,
  ...props
}: TypographyProps) => {
  // Use the variant to determine the element type, unless 'as' is specified
  const Component = as || variantElementMap[variant as keyof typeof variantElementMap] || 'span';

  return (
    <Component 
      className={twMerge(typographyVariants({ variant, color, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Typography, typographyVariants };