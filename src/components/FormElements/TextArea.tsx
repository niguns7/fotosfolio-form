import React from "react";
import { Theme } from "@/types/theme.types";

interface TextAreaProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  theme: Theme;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  placeholder,
  required,
  value,
  onChange,
  onBlur,
  error,
  theme,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-semibold text-slate-900"
        style={{
          fontFamily: theme.fontFamily,
        }}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full px-4 py-3 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-vertical placeholder:text-slate-500"
        style={{
          borderColor: error ? "#dc2626" : "#cbd5e1",
          fontFamily: theme.fontFamily,
        }}
      />
      {error && (
        <p
          className="mt-1 text-sm text-red-600"
          style={{ fontFamily: theme.fontFamily }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
