import React from 'react';
import Image from 'next/image';
import { Theme } from '@/types/theme.types';

interface FormHeaderProps {
  logo?: string;
  eventName: string;
  subtitle?: string;
  description?: string;
  theme: Theme;
  sectionNumber?: number;
  totalSections?: number;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  logo,
  eventName,
  subtitle,
  description,
  theme,
  sectionNumber,
  totalSections,
}) => {
  const showSectionBadge = sectionNumber && totalSections && totalSections > 1;
  return (
    <div className="flex flex-col">
      {showSectionBadge && (
        <div className="flex">
          <div 
            className="px-4 py-1.5 text-xs font-semibold text-white rounded-t-lg shadow-sm"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Section {sectionNumber} of {totalSections}
          </div>
        </div>
      )}
      <div 
        className={`bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden ${showSectionBadge ? 'rounded-tl-none' : ''}`}
        style={showSectionBadge ? { borderLeft: `6px solid ${theme.primaryColor}` } : undefined}
      >
        <div
          className="h-2.5 w-full transition-all duration-300"
          style={{ backgroundColor: theme.primaryColor }}
        />
      <div className="p-6 md:p-8">
        {logo && (
          <div className="flex justify-start mb-4">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image 
                src={logo} 
                alt="Logo" 
                width={80} 
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
        
        <h1 
          className="text-3xl font-bold mb-2 font-Montserrat text-slate-800"
          style={{ 
            fontFamily: theme.fontFamily 
          }}
        >
          {eventName}
        </h1>

        {subtitle && (
          <p 
            className="text-lg font-medium mb-3 text-slate-600"
            style={{ 
              fontFamily: theme.fontFamily 
            }}
          >
            {subtitle}
          </p>
        )}
        
        {description && (
          <p 
            className="text-sm text-slate-500 whitespace-pre-line"
            style={{ 
              fontFamily: theme.fontFamily
            }}
          >
            {description}
          </p>
        )}
      </div>
      </div>
    </div>
  );
};
