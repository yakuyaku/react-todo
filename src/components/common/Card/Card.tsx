import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Card({
  children,
  title,
  footer,
  variant = 'default',
  padding = 'md',
  className = ''
}: CardProps) {
  const variantStyles = {
    default: 'bg-white',
    bordered: 'bg-white border-2 border-gray-200',
    elevated: 'bg-white shadow-lg'
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`rounded-xl ${variantStyles[variant]} ${className}`}>
      {title && (
        <div className={`border-b-2 border-gray-200 ${paddingStyles[padding]} pb-4`}>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
      )}
      
      <div className={title ? `${paddingStyles[padding]} pt-4` : paddingStyles[padding]}>
        {children}
      </div>

      {footer && (
        <div className={`border-t-2 border-gray-200 ${paddingStyles[padding]} pt-4`}>
          {footer}
        </div>
      )}
    </div>
  );
}