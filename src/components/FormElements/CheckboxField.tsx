import React from 'react';
import { Theme } from '@/types/theme.types';

interface CheckboxFieldProps {
  id: string;
  label: string;
  required?: boolean;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  theme: Theme;
  checkboxLabel?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  required,
  value,
  onChange,
  error,
  theme,
  checkboxLabel,
}) => {
  return (
    <div className="mb-5">
      <label 
        className="block mb-3 text-sm font-semibold text-gray-800"
        style={{ 
          fontFamily: theme.fontFamily,
          color: theme.textColor
        }}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="flex items-start">
        <input
          type="checkbox"
          id={id}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 focus:ring-2"
          style={{
            accentColor: theme.primaryColor,
          }}
        />
        <label 
          htmlFor={id}
          className="ml-2 text-sm text-gray-700 cursor-pointer"
          style={{ 
            fontFamily: theme.fontFamily,
            color: theme.textColor
          }}
        >
          {checkboxLabel || 'I agree to the terms and conditions'}
        </label>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-500" style={{ fontFamily: theme.fontFamily }}>
          {error}
        </p>
      )}
    </div>
  );
};
