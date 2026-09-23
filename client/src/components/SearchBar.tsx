import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  defaultValue = '',
  placeholder = 'Search by ID, name, email, subject...',
  className = '',
}) => {
  const [value, setValue] = useState(defaultValue);
  const lastEmittedRef = React.useRef(defaultValue);

  useEffect(() => {
    if (defaultValue !== lastEmittedRef.current) {
      setValue(defaultValue);
      lastEmittedRef.current = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== lastEmittedRef.current) {
        lastEmittedRef.current = value;
        onSearch(value);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-ink/40" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-9 py-2.5 font-sans text-xs sm:text-sm border border-line rounded-xl bg-card text-ink placeholder:text-ink/40 shadow-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          onClick={handleClear}
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink/40 hover:text-ink transition-colors cursor-pointer"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};