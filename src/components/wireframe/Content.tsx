'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { fakeText, fakeUser, fakeNumber, fakeMedia } from '@/lib/fake-data';

// Placeholder component for text content
const placeholderVariants = cva(
  'block bg-gray-200 rounded animate-pulse',
  {
    variants: {
      type: {
        text: 'h-4',
        heading: 'h-8',
        title: 'h-10',
        paragraph: 'h-20',
        button: 'h-10 w-24',
        input: 'h-10 w-full',
        image: 'aspect-video',
        avatar: 'rounded-full',
      },
      width: {
        xs: 'w-16',
        sm: 'w-24',
        md: 'w-32',
        lg: 'w-48',
        xl: 'w-64',
        full: 'w-full',
        auto: '',
      }
    },
    defaultVariants: {
      type: 'text',
      width: 'auto',
    }
  }
);

export interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof placeholderVariants> {
  height?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ 
  className, 
  type, 
  width, 
  height,
  style,
  ...props 
}) => {
  const customStyle = height ? { height, ...style } : style;
  
  if (type === 'avatar') {
    return (
      <div 
        className={twMerge(placeholderVariants({ type, width }), 'w-12 h-12', className)} 
        style={customStyle}
        {...props} 
      />
    );
  }
  
  return (
    <div 
      className={twMerge(placeholderVariants({ type, width }), className)} 
      style={customStyle}
      {...props} 
    />
  );
};

// Skeleton component for loading states
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  showAvatar?: boolean;
  showImage?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  lines = 3, 
  showAvatar = false, 
  showImage = false,
  className,
  ...props 
}) => {
  return (
    <div className={twMerge('space-y-4', className)} {...props}>
      {showImage && <Placeholder type="image" width="full" />}
      
      <div className="flex items-start gap-4">
        {showAvatar && <Placeholder type="avatar" />}
        
        <div className="flex-1 space-y-2">
          <Placeholder type="heading" width="lg" />
          {Array.from({ length: lines }).map((_, i) => (
            <Placeholder 
              key={i} 
              type="text" 
              width={i === lines - 1 ? 'md' : 'full'} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Text content component with fake data
const textVariants = cva(
  '',
  {
    variants: {
      variant: {
        h1: 'text-4xl font-bold tracking-tight',
        h2: 'text-3xl font-semibold tracking-tight',
        h3: 'text-2xl font-semibold',
        h4: 'text-xl font-semibold',
        h5: 'text-lg font-semibold',
        h6: 'text-base font-semibold',
        body: 'text-base',
        small: 'text-sm',
        caption: 'text-xs text-gray-600',
        label: 'text-sm font-medium',
      },
      color: {
        default: 'text-gray-900',
        muted: 'text-gray-600',
        primary: 'text-blue-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        danger: 'text-red-600',
      }
    },
    defaultVariants: {
      variant: 'body',
      color: 'default',
    }
  }
);

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  children?: React.ReactNode;
  fake?: 'word' | 'sentence' | 'paragraph' | 'title' | 'heading' | 'label';
  fakeLength?: number;
}

export const Text: React.FC<TextProps> = ({ 
  as: Component = 'p',
  className, 
  variant, 
  color,
  children,
  fake,
  fakeLength,
  ...props 
}) => {
  let content = children;
  
  if (fake && !children) {
    switch (fake) {
      case 'word':
        content = fakeText.word();
        break;
      case 'sentence':
        content = fakeText.sentence(fakeLength);
        break;
      case 'paragraph':
        content = fakeText.paragraph(fakeLength);
        break;
      case 'title':
        content = fakeText.title();
        break;
      case 'heading':
        content = fakeText.heading();
        break;
      case 'label':
        content = fakeText.label();
        break;
    }
  }
  
  return (
    <Component 
      className={twMerge(textVariants({ variant, color }), className)} 
      {...props}
    >
      {content}
    </Component>
  );
};

// Avatar component with fake data
const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-300',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
      }
    },
    defaultVariants: {
      size: 'md',
    }
  }
);

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string;
  fake?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  className, 
  size, 
  src,
  alt,
  name,
  fake = false,
  ...props 
}) => {
  const displayName = name || (fake ? fakeUser.name() : '');
  const imageSrc = src || (fake ? fakeUser.avatar(displayName) : '');
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  return (
    <div className={twMerge(avatarVariants({ size }), className)} {...props}>
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={alt || displayName} 
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-medium text-gray-600">{initials}</span>
      )}
    </div>
  );
};

// Image placeholder component
const imageVariants = cva(
  'relative overflow-hidden bg-gray-200 rounded-lg',
  {
    variants: {
      ratio: {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        landscape: 'aspect-[4/3]',
        wide: 'aspect-[21/9]',
      }
    },
    defaultVariants: {
      ratio: 'video',
    }
  }
);

export interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof imageVariants> {
  src?: string;
  alt?: string;
  fake?: boolean;
  width?: number;
  height?: number;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  className, 
  ratio,
  src,
  alt,
  fake = false,
  width = 400,
  height = 300,
  ...props 
}) => {
  const imageSrc = src || (fake ? fakeMedia.image(width, height) : '');
  
  return (
    <div className={twMerge(imageVariants({ ratio }), className)} {...props}>
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={alt || 'Placeholder'} 
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

// Metric display component
export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string | number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  fake?: boolean;
}

export const Metric: React.FC<MetricProps> = ({ 
  label, 
  value, 
  change,
  changeType,
  fake = false,
  className,
  ...props 
}) => {
  const displayValue = fake && !value ? fakeNumber.currency() : value;
  const displayChange = fake && !change ? fakeNumber.percentage() : change;
  const displayChangeType = changeType || (Math.random() > 0.5 ? 'increase' : 'decrease');
  
  return (
    <div className={twMerge('space-y-1', className)} {...props}>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-semibold text-gray-900">{displayValue}</p>
      {(change || fake) && (
        <p className={twMerge(
          'text-sm font-medium',
          displayChangeType === 'increase' && 'text-green-600',
          displayChangeType === 'decrease' && 'text-red-600',
          displayChangeType === 'neutral' && 'text-gray-600'
        )}>
          {displayChangeType === 'increase' && '↑'}
          {displayChangeType === 'decrease' && '↓'}
          {' '}{displayChange}
        </p>
      )}
    </div>
  );
};

// Data list component
export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: Array<{ label: string; value: string | number }>;
  orientation?: 'horizontal' | 'vertical';
}

export const DataList: React.FC<DataListProps> = ({ 
  items, 
  orientation = 'vertical',
  className,
  ...props 
}) => {
  return (
    <dl 
      className={twMerge(
        orientation === 'horizontal' ? 'space-y-4' : 'divide-y divide-gray-200',
        className
      )} 
      {...props}
    >
      {items.map((item, index) => (
        <div 
          key={index} 
          className={twMerge(
            orientation === 'horizontal' 
              ? 'flex justify-between items-center' 
              : 'py-3 first:pt-0 last:pb-0'
          )}
        >
          <dt className="text-sm font-medium text-gray-600">{item.label}</dt>
          <dd className={twMerge(
            'text-sm text-gray-900',
            orientation === 'horizontal' && 'font-semibold'
          )}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};