import React from 'react';
import { Theme } from '@/types/theme.types';
import { getButtonStyleClass } from '@/utils/theme';

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
    <div className="w-full">
      {/* Label/Heading */}
      {label && (
        <h3 
          className="text-lg font-bold mb-3 uppercase tracking-wide"
          style={{ 
            fontFamily: theme.fontFamily,
            color: theme.textColor
          }}
        >
          {label}
        </h3>
      )}
      
      {/* Agreement Text Box */}
      {agreementText && (
        <div 
          className="w-full border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50 max-h-64 overflow-y-auto"
          style={{ fontFamily: theme.fontFamily }}
        >
          <div 
            className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed"
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
          className="mt-0.5 h-4 w-4 rounded border-gray-300 focus:ring-2"
          style={{
            accentColor: theme.primaryColor,
          }}
        />
        <label 
          htmlFor={id}
          className="ml-3 text-sm text-gray-700 cursor-pointer"
          style={{ 
            fontFamily: theme.fontFamily,
            color: theme.textColor
          }}
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
