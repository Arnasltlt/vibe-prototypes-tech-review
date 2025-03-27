'use client';

import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { cn } from "@/lib/utils";
import { Typography } from "../Typography/Typography";

export type CardType = 'default' | 'inline' | 'centered' | 'link';

export interface CardProps {
  /** Add border to card */
  bordered?: boolean;
  /** Make card clickable (adds hover effects) */
  clickable?: boolean;
  /** Card selected state */
  selected?: boolean;
  /** Disable card */
  disabled?: boolean;
  /** Card icon (replaces the default icon with a custom one) */
  icon?: ReactNode;
  /** Card type */
  cardType?: CardType;
  /** Show full details */
  fullDetails?: boolean;
  /** Card eyebrow content */
  eyebrow?: ReactNode;
  /** Card title content */
  title?: ReactNode;
  /** Card description content */
  description?: ReactNode;
  /** Card info content (displayed in action area) */
  info?: ReactNode;
  /** Card action content (button or link in action area) */
  action?: ReactNode;
  /** Additional class names */
  className?: string;
  /** Additional class names for content */
  contentClassName?: string;
  /** Click handler */
  onClick?: () => void;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  bordered = true,
  clickable = false,
  selected = false,
  disabled = false,
  icon,
  cardType = 'default',
  fullDetails = false,
  eyebrow,
  title,
  description,
  info,
  action,
  className,
  contentClassName,
  onClick,
  ...props
}, ref) => {
  const cardClasses = twMerge(
    'relative bg-white rounded-md overflow-hidden transition-shadow',
    bordered && 'border border-[var(--grey-overlay-200)]',
    clickable && !disabled && 'cursor-pointer hover:shadow-md',
    selected && 'ring-2 ring-[var(--network-blue-400)]',
    disabled && 'opacity-60 pointer-events-none',
    cardType === 'inline' && 'flex items-center',
    cardType === 'centered' && 'text-center',
    cardType === 'link' && 'hover:bg-[var(--grey-overlay-100)]',
    className
  );

  const contentClasses = twMerge(
    'p-4',
    cardType === 'inline' && 'flex items-center gap-4',
    cardType === 'centered' && 'flex flex-col items-center',
    contentClassName
  );

  return (
    <div 
      ref={ref}
      className={cardClasses}
      onClick={!disabled && clickable ? onClick : undefined}
      {...props}
    >
      <div className={contentClasses}>
        {icon && (
          <div className={`card-icon ${cardType === 'centered' ? 'mb-3' : ''}`}>
            {icon}
          </div>
        )}
        
        <div className={`card-details ${fullDetails ? 'w-full' : ''}`}>
          {eyebrow && (
            <div className="text-xs text-gray-700 mb-1">
              {typeof eyebrow === 'string' ? (
                <Typography variant="eyebrow" color="subtle">
                  {eyebrow}
                </Typography>
              ) : (
                eyebrow
              )}
            </div>
          )}
          
          {title && (
            <div className="pb-2">
              {typeof title === "string" ? (
                <Typography variant="h3" color="default" className="font-semibold text-gray-900">
                  {title}
                </Typography>
              ) : (
                title
              )}
            </div>
          )}
          
          {description && (
            <div className="text-sm">
              {typeof description === "string" ? (
                <Typography variant="body2" color="default" className="text-gray-800">
                  {description}
                </Typography>
              ) : (
                description
              )}
            </div>
          )}
        </div>
        
        {(info || action) && (
          <div className={`card-action mt-3 ${cardType === 'inline' ? 'ml-auto' : 'flex justify-between items-center'}`}>
            {info && (
              <span className="text-sm text-gray-700">
                {typeof info === 'string' ? (
                  <Typography variant="body2" color="subtle">
                    {info}
                  </Typography>
                ) : (
                  info
                )}
              </span>
            )}
            
            {action && (
              <span className="card-action-button">
                {action}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

Card.displayName = 'Card';