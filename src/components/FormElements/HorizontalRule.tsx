import React from 'react';
import { Theme } from '@/types/theme.types';

interface HorizontalRuleProps {
  id: string;
  theme: Theme;
  label?: string;
  placeholder?: string;
}

export const HorizontalRule: React.FC<HorizontalRuleProps> = ({ theme, label, placeholder }) => {
  return (
    <div className="my-8">
      {(label || placeholder) && (
        <div className="mb-4">
          {label && (
            <h2 
              className="text-xl font-bold tracking-tight text-slate-800"
              style={{ fontFamily: theme.fontFamily }}
            >
              {label}
            </h2>
          )}
          {placeholder && (
            <p 
              className="text-sm text-slate-500 mt-1"
              style={{ fontFamily: theme.fontFamily }}
            >
              {placeholder}
            </p>
          )}
        </div>
      )}
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t-2 transition-all duration-300" style={{ borderColor: `${theme.primaryColor}20` }}></div>
        {!label && !placeholder && (
          <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-slate-400" style={{ fontFamily: theme.fontFamily }}>Section Break</span>
        )}
        <div className="flex-grow border-t-2 transition-all duration-300" style={{ borderColor: `${theme.primaryColor}20` }}></div>
      </div>
    </div>
  );
};
