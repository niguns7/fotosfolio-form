import React from "react";
import { Theme } from "@/types/theme.types";

interface AgreementFieldProps {
  id: string;
  label: string;
  required?: boolean;
  value: boolean;
  onChange: (value: boolean) => void;
  onBlur?: () => void;
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
  onBlur,
  error,
  theme,
  agreementText,
}) => {
  return (
    <div className="mb-6 border border-slate-300 rounded-lg p-6 bg-white shadow-sm">
      {/* Label/Heading */}
      {label && (
        <h3
          className="text-xl font-bold mb-4 text-slate-900 uppercase tracking-wide"
          style={{
            fontFamily: theme.fontFamily,
            color: "#7c2d3a",
          }}
        >
          {label}
        </h3>
      )}

      {/* Agreement Text Box */}
      {agreementText && (
        <div
          className="w-full border border-slate-200 rounded-md p-4 mb-4 bg-slate-50 max-h-64 overflow-y-auto"
          style={{ fontFamily: theme.fontFamily }}
        >
          <div
            className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed"
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
          onBlur={onBlur}
          required={required}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <label
          htmlFor={id}
          className="ml-3 text-base text-slate-900 cursor-pointer"
          style={{ fontFamily: theme.fontFamily }}
        >
          I agree to the terms and conditions
        </label>
      </div>

      {error && (
        <p
          className="mt-2 text-sm text-red-600"
          style={{ fontFamily: theme.fontFamily }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
