import React from 'react';
import { Theme } from '@/types/theme.types';

interface SelectInputProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  theme: Theme;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  placeholder,
  required,
  value,
  onChange,
  options,
  error,
  theme,
}) => {
  return (
    <div className="mb-5">
      <label 
        htmlFor={id} 
        className="block mb-2 text-sm font-semibold text-gray-800"
        style={{ 
          fontFamily: theme.fontFamily 
        }}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
        style={{
          borderColor: error ? '#ef4444' : '#d1d5db',
          fontFamily: theme.fontFamily,
        }}
      >
        <option value="">{placeholder || 'Select an option'}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500" style={{ fontFamily: theme.fontFamily }}>
          {error}
        </p>
      )}
    </div>
  );
};
