import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="w-full">
        <label htmlFor={inputId} className="block text-sm font-semibold mb-1.5 text-ink">{label}</label>
        <input
          id={inputId}
          ref={ref}
          className={`w-full font-sans text-sm py-2.5 px-3 border border-line rounded-md bg-card text-ink focus:outline-2 focus:outline-primary focus:outline-offset-1 ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
InputField.displayName = 'InputField';