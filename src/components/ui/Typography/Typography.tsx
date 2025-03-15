'use client';

import React, { HTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      subtitle1: 'subtitle1',
      subtitle2: 'subtitle2',
      body1: 'body1',
      body2: 'body2',
      eyebrow: 'eyebrow',
      caption: 'caption',
    },
    color: {
      default: 'text-foreground',
      subtle: 'text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      success: 'text-success',
      warning: 'text-warning',
      red: 'text-destructive',
      white: 'text-white',
      subtleWhite: 'text-white/70',
      purple: 'text-purple-500',
    },
  },
  defaultVariants: {
    variant: 'body1',
    color: 'default',
  },
});

// Separate the props to avoid the type conflict
type TypographyVariantProps = VariantProps<typeof typographyVariants>;

// Omit the color property from HTMLAttributes to avoid the conflict
interface TypographyProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    TypographyVariantProps {
  as?: React.ElementType;
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    { className, variant, color, as: Component = 'p', children, ...props },
    ref
  ) => {
    // Map variant to appropriate HTML element if not explicitly specified
    const defaultElementMap: Record<string, React.ElementType> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      subtitle1: 'h4',
      subtitle2: 'h5',
      body1: 'p',
      body2: 'p',
      eyebrow: 'span',
      caption: 'span',
    };

    const ElementToRender =
      Component || (variant ? defaultElementMap[variant] : 'p');

    return (
      <ElementToRender
        ref={ref}
        className={cn(typographyVariants({ variant, color }), className)}
        {...props}
      >
        {children}
      </ElementToRender>
    );
  }
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
export type { TypographyProps };
