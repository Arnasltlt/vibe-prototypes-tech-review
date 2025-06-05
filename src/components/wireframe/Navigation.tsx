'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { fakeList } from '@/lib/fake-data';

// Navigation Bar component
export interface NavItem {
  label: string;
  href?: string;
  active?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
  fake?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ 
  items,
  orientation = 'horizontal',
  variant = 'default',
  fake = false,
  className,
  ...props 
}) => {
  const navItems = fake && items.length === 0 ? fakeList.navigation() : items;
  
  return (
    <nav 
      className={twMerge(
        'flex',
        orientation === 'vertical' ? 'flex-col space-y-1' : 'flex-row space-x-1',
        className
      )} 
      {...props}
    >
      {navItems.map((item, index) => (
        <a
          key={index}
          href={item.href || '#'}
          className={twMerge(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            variant === 'default' && [
              item.active 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            ],
            variant === 'pills' && [
              item.active 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            ],
            variant === 'underline' && [
              'rounded-none border-b-2',
              item.active 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-700 hover:border-gray-300'
            ]
          )}
        >
          <span className="flex items-center gap-2">
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
            {item.badge && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">
                {item.badge}
              </span>
            )}
          </span>
        </a>
      ))}
    </nav>
  );
};

// Tabs component
const tabsVariants = cva(
  'flex',
  {
    variants: {
      variant: {
        default: 'border-b border-gray-200',
        pills: 'bg-gray-100 p-1 rounded-lg',
        underline: '',
      }
    },
    defaultVariants: {
      variant: 'default',
    }
  }
);

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsVariants> {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ 
  tabs,
  activeTab,
  onTabChange,
  variant,
  className,
  ...props 
}) => {
  const [active, setActive] = React.useState(activeTab || tabs[0]?.id);
  
  const handleTabClick = (tabId: string) => {
    setActive(tabId);
    onTabChange?.(tabId);
  };
  
  return (
    <div className={twMerge(tabsVariants({ variant }), className)} {...props}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && handleTabClick(tab.id)}
          disabled={tab.disabled}
          className={twMerge(
            'px-4 py-2 text-sm font-medium transition-colors',
            variant === 'default' && [
              'border-b-2 -mb-px',
              active === tab.id 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ],
            variant === 'pills' && [
              'rounded-md',
              active === tab.id 
                ? 'bg-white shadow text-gray-900' 
                : 'text-gray-500 hover:text-gray-700'
            ],
            variant === 'underline' && [
              'border-b-2',
              active === tab.id 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ],
            tab.disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span className="flex items-center gap-2">
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

// Breadcrumbs component
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items,
  separator = '/',
  className,
  ...props 
}) => {
  return (
    <nav aria-label="Breadcrumb" className={twMerge('flex items-center space-x-2', className)} {...props}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-gray-400 text-sm">{separator}</span>
          )}
          {index === items.length - 1 ? (
            <span className="text-sm text-gray-900 font-medium">{item.label}</span>
          ) : (
            <a href={item.href || '#'} className="text-sm text-gray-500 hover:text-gray-700">
              {item.label}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Pagination component
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  showNumbers?: boolean;
  maxVisible?: number;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage,
  totalPages,
  onPageChange,
  showNumbers = true,
  maxVisible = 5,
  className,
  ...props 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  return (
    <nav className={twMerge('flex items-center space-x-1', className)} {...props}>
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {showNumbers && (
        <>
          {currentPage > maxVisible / 2 + 1 && (
            <>
              <button
                onClick={() => onPageChange?.(1)}
                className="px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                1
              </button>
              <span className="px-2 text-gray-400">...</span>
            </>
          )}
          
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={twMerge(
                'px-3 py-2 text-sm rounded-md border',
                currentPage === page
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              )}
            >
              {page}
            </button>
          ))}
          
          {currentPage < totalPages - maxVisible / 2 && (
            <>
              <span className="px-2 text-gray-400">...</span>
              <button
                onClick={() => onPageChange?.(totalPages)}
                className="px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                {totalPages}
              </button>
            </>
          )}
        </>
      )}
      
      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
};

// Menu component for dropdowns and context menus
export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[];
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Menu: React.FC<MenuProps> = ({ 
  items,
  trigger,
  open,
  onOpenChange,
  className,
  ...props 
}) => {
  const [isOpen, setIsOpen] = React.useState(open || false);
  
  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };
  
  return (
    <div className="relative inline-block" {...props}>
      {trigger && (
        <div onClick={handleToggle} className="cursor-pointer">
          {trigger}
        </div>
      )}
      
      {isOpen && (
        <div className={twMerge(
          'absolute z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          className
        )}>
          <div className="py-1">
            {items.map((item, index) => {
              if (item.divider) {
                return <hr key={index} className="my-1 border-gray-200" />;
              }
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  disabled={item.disabled}
                  className={twMerge(
                    'flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700',
                    'hover:bg-gray-100 hover:text-gray-900',
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Steps/Stepper component
export interface Step {
  id: string;
  label: string;
  description?: string;
  completed?: boolean;
  active?: boolean;
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
}

export const Steps: React.FC<StepsProps> = ({ 
  steps,
  orientation = 'horizontal',
  className,
  ...props 
}) => {
  return (
    <div 
      className={twMerge(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
        className
      )} 
      {...props}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className={twMerge(
            'flex items-center',
            orientation === 'vertical' && 'flex-col items-start'
          )}>
            <div className="flex items-center">
              <div className={twMerge(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                step.completed && 'bg-green-600 text-white',
                step.active && !step.completed && 'bg-blue-600 text-white',
                !step.completed && !step.active && 'bg-gray-300 text-gray-600'
              )}>
                {step.completed ? '✓' : index + 1}
              </div>
              <div className="ml-3">
                <p className={twMerge(
                  'text-sm font-medium',
                  step.active ? 'text-gray-900' : 'text-gray-500'
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-500">{step.description}</p>
                )}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={twMerge(
              orientation === 'horizontal' 
                ? 'mx-4 h-0.5 flex-1 bg-gray-300' 
                : 'ml-4 my-2 w-0.5 h-8 bg-gray-300'
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};