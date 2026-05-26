import React from 'react';
import Image from 'next/image';
import { Theme } from '@/types/theme.types';

interface FormHeaderProps {
  logo?: string;
  eventName: string;
  subtitle?: string;
  description?: string;
  theme: Theme;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  logo,
  eventName,
  subtitle,
  description,
  theme,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
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
  );
};
