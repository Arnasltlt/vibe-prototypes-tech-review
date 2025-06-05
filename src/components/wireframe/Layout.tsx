'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

// Container component
const containerVariants = cva(
  'w-full mx-auto px-4',
  {
    variants: {
      size: {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-full',
      },
      padding: {
        none: 'px-0',
        sm: 'px-2 sm:px-4',
        md: 'px-4 sm:px-6 lg:px-8',
        lg: 'px-6 sm:px-8 lg:px-12',
      }
    },
    defaultVariants: {
      size: 'lg',
      padding: 'md',
    }
  }
);

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

export const Container: React.FC<ContainerProps> = ({ className, size, padding, children, ...props }) => {
  return (
    <div className={twMerge(containerVariants({ size, padding }), className)} {...props}>
      {children}
    </div>
  );
};

// Grid component
const gridVariants = cva(
  'grid w-full',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
        6: 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-6',
        12: 'grid-cols-12',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      }
    },
    defaultVariants: {
      cols: 3,
      gap: 'md',
      align: 'stretch',
    }
  }
);

export interface GridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {}

export const Grid: React.FC<GridProps> = ({ className, cols, gap, align, justify, children, ...props }) => {
  return (
    <div className={twMerge(gridVariants({ cols, gap, align, justify }), className)} {...props}>
      {children}
    </div>
  );
};

// Flex component
const flexVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        col: 'flex-col',
        'row-reverse': 'flex-row-reverse',
        'col-reverse': 'flex-col-reverse',
      },
      wrap: {
        wrap: 'flex-wrap',
        nowrap: 'flex-nowrap',
        'wrap-reverse': 'flex-wrap-reverse',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      }
    },
    defaultVariants: {
      direction: 'row',
      wrap: 'nowrap',
      align: 'stretch',
      justify: 'start',
      gap: 'md',
    }
  }
);

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof flexVariants> {}

export const Flex: React.FC<FlexProps> = ({ className, direction, wrap, align, justify, gap, children, ...props }) => {
  return (
    <div className={twMerge(flexVariants({ direction, wrap, align, justify, gap }), className)} {...props}>
      {children}
    </div>
  );
};

// Stack component (vertical flex)
export interface StackProps extends Omit<FlexProps, 'direction'> {
  spacing?: FlexProps['gap'];
}

export const Stack: React.FC<StackProps> = ({ spacing, gap, ...props }) => {
  return <Flex direction="col" gap={spacing || gap} {...props} />;
};

// Section component
const sectionVariants = cva(
  'w-full',
  {
    variants: {
      spacing: {
        none: 'py-0',
        xs: 'py-2',
        sm: 'py-4',
        md: 'py-8',
        lg: 'py-12',
        xl: 'py-16',
        '2xl': 'py-24',
      },
      background: {
        transparent: 'bg-transparent',
        white: 'bg-white',
        gray: 'bg-gray-50',
        dark: 'bg-gray-900',
        primary: 'bg-blue-50',
        gradient: 'bg-gradient-to-br from-blue-50 to-purple-50',
      },
      border: {
        none: '',
        top: 'border-t border-gray-200',
        bottom: 'border-b border-gray-200',
        both: 'border-y border-gray-200',
      }
    },
    defaultVariants: {
      spacing: 'lg',
      background: 'transparent',
      border: 'none',
    }
  }
);

export interface SectionProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {}

export const Section: React.FC<SectionProps> = ({ className, spacing, background, border, children, ...props }) => {
  return (
    <section className={twMerge(sectionVariants({ spacing, background, border }), className)} {...props}>
      {children}
    </section>
  );
};

// Sidebar Layout
export interface SidebarLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  sidebarWidth?: 'sm' | 'md' | 'lg';
}

const sidebarWidths = {
  sm: 'w-48',
  md: 'w-64',
  lg: 'w-80',
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ 
  sidebar, 
  sidebarPosition = 'left', 
  sidebarWidth = 'md',
  children,
  className,
  ...props 
}) => {
  return (
    <div className={twMerge('flex min-h-screen', className)} {...props}>
      {sidebarPosition === 'left' && (
        <aside className={twMerge('border-r border-gray-200 bg-gray-50', sidebarWidths[sidebarWidth])}>
          {sidebar}
        </aside>
      )}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      {sidebarPosition === 'right' && (
        <aside className={twMerge('border-l border-gray-200 bg-gray-50', sidebarWidths[sidebarWidth])}>
          {sidebar}
        </aside>
      )}
    </div>
  );
};

// Header Layout
export interface HeaderLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode;
  headerHeight?: 'sm' | 'md' | 'lg';
  sticky?: boolean;
}

const headerHeights = {
  sm: 'h-12',
  md: 'h-16',
  lg: 'h-20',
};

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({ 
  header, 
  headerHeight = 'md',
  sticky = false,
  children,
  className,
  ...props 
}) => {
  return (
    <div className={twMerge('flex flex-col min-h-screen', className)} {...props}>
      <header className={twMerge(
        'border-b border-gray-200 bg-white',
        headerHeights[headerHeight],
        sticky && 'sticky top-0 z-50'
      )}>
        {header}
      </header>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

// Split Layout
export interface SplitLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  left: React.ReactNode;
  right: React.ReactNode;
  split?: '50/50' | '40/60' | '60/40' | '30/70' | '70/30';
}

const splitRatios = {
  '50/50': 'grid-cols-2',
  '40/60': 'grid-cols-[2fr_3fr]',
  '60/40': 'grid-cols-[3fr_2fr]',
  '30/70': 'grid-cols-[3fr_7fr]',
  '70/30': 'grid-cols-[7fr_3fr]',
};

export const SplitLayout: React.FC<SplitLayoutProps> = ({ 
  left, 
  right, 
  split = '50/50',
  className,
  ...props 
}) => {
  return (
    <div className={twMerge('grid h-full', splitRatios[split], className)} {...props}>
      <div className="overflow-auto border-r border-gray-200">
        {left}
      </div>
      <div className="overflow-auto">
        {right}
      </div>
    </div>
  );
};