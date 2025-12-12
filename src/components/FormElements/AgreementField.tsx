import React from 'react';
import { Theme } from '@/types/theme.types';

interface AgreementFieldProps {
  id: string;
  label: string;
  required?: boolean;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  theme: Theme;
  agreementText?: string;
}

export const AgreementField: React.FC<AgreementFieldProps> = ({
  id,
  label,
  required,
  value,
  onChange,
  error,
  theme,
  agreementText,
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
      
      {/* Agreement Text Box */}
      {agreementText && (
        <div 
          className="w-full border border-gray-300 rounded-md p-4 mb-4 bg-gray-50 max-h-64 overflow-y-auto"
          style={{ fontFamily: theme.fontFamily }}
        >
          <div 
            className="text-sm text-gray-700 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: agreementText }}
          />
        </div>
      )}
      
      {/* Checkbox */}
      <div className="flex items-start">
        <input
          type="checkbox"
          id={id}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <label 
          htmlFor={id}
          className="ml-3 text-sm text-gray-700 cursor-pointer"
          style={{ fontFamily: theme.fontFamily }}
        >
          I agree to the terms and conditions
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
