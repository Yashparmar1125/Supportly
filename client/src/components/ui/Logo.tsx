import React from 'react';
import { Link } from 'react-router';

interface LogoProps {
  light?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ light = false, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link
      to="/"
      className={`font-extrabold tracking-tight select-none flex items-center ${sizeClasses[size]} ${
        light ? 'text-white' : 'text-ink'
      } ${className}`}
    >
      supportly<span className="text-primary">.</span>
    </Link>
  );
};