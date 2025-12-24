import React from 'react';
import { Theme } from '@/types/theme.types';

interface AmountInputProps {
    id: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    value: number | string;
    onChange: (value: number) => void;
    error?: string;
    theme: Theme;
}

export const AmountInput: React.FC<AmountInputProps> = ({
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
            <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                <input
                    type="number"
                    id={id}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    placeholder={placeholder || '0.00'}
                    required={required}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all text-gray-400 placeholder:text-gray-400"
                    style={{
                        borderColor: error ? '#ef4444' : '#d1d5db',
                        fontFamily: theme.fontFamily,
                    }}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500" style={{ fontFamily: theme.fontFamily }}>
                    {error}
                </p>
            )}
        </div>
    );
};
