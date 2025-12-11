import React from 'react';
import { Theme } from '@/types/theme.types';

interface SubmitButtonProps {
  label?: string;
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  theme: Theme;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = 'Submit Booking',
  onClick,
  disabled,
  loading,
  theme,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full py-3.5 px-6 font-semibold text-white rounded-md transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        backgroundColor: '#7f2c2c',
        fontFamily: theme.fontFamily,
      }}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg 
            className="animate-spin h-5 w-5 mr-3" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Submitting...
        </span>
      ) : (
        label
      )}
    </button>
  );
};
