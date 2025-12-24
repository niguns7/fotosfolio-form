import React from 'react';
import { Theme } from '@/types/theme.types';

interface TimeInputProps {
    id: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    theme: Theme;
}

export const TimeInput: React.FC<TimeInputProps> = ({
    id,
    label,
    placeholder,
    required,
    value,
    onChange,
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
            <input
                type="time"
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all text-gray-400"
                style={{
                    borderColor: error ? '#ef4444' : '#d1d5db',
                    fontFamily: theme.fontFamily,
                    colorScheme: 'light',
                }}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500" style={{ fontFamily: theme.fontFamily }}>
                    {error}
                </p>
            )}
        </div>
    );
};
