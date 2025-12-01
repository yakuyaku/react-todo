import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-2 border-2 rounded-lg transition-colors focus:outline-none';
    const errorStyles = error
      ? 'border-red-500 focus:border-red-600'
      : 'border-gray-300 focus:border-blue-500';
    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-bold text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${widthStyle} ${className}`}
          {...props}
        />

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}

        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';