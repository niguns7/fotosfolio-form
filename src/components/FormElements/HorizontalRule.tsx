import React from 'react';
import { Theme } from '@/types/theme.types';

interface HorizontalRuleProps {
  id: string;
  theme: Theme;
  label?: string;
  placeholder?: string;
  sectionNumber?: number;
  totalSections?: number;
}

export const HorizontalRule: React.FC<HorizontalRuleProps> = ({ 
  theme, 
  sectionNumber
}) => {
  const currentSection = sectionNumber ? sectionNumber - 1 : 1;
  return (
    <div className="my-6 flex flex-col items-start gap-2 select-none">
      <div 
        className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-slate-100/80 px-4 py-2.5 rounded-lg border border-slate-200 w-full sm:w-auto"
        style={{ fontFamily: theme.fontFamily }}
      >
        <span>After section {currentSection}</span>
        <span className="text-slate-400 font-semibold">Continue to next section</span>
        <span className="ml-auto sm:ml-4 text-slate-400 text-xs">▼</span>
      </div>
    </div>
  );
};
