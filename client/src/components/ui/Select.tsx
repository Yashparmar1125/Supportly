import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: {value: string; label: string}[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="w-full">
        <label htmlFor={inputId} className="block text-sm font-semibold mb-1.5 text-ink">{label}</label>
        <select
          id={inputId}
          ref={ref}
          className={`w-full font-sans text-sm py-2.5 px-3 border border-line rounded-md bg-card text-ink focus:outline-2 focus:outline-primary focus:outline-offset-1 ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';