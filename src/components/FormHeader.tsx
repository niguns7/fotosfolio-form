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
  description,
  theme,
}) => {
  return (
    <div className="text-center">
      {logo && (
        <div className="flex justify-center mb-6">
          <Image 
            src={logo} 
            alt="Logo" 
            width={100} 
            height={100}
            className="object-contain"
          />
        </div>
      )}
      
      <h1 
        className="text-2xl md:text-3xl font-bold mb-3"
        style={{ 
          color: '#7f2c2c',
          fontFamily: theme.fontFamily 
        }}
      >
        {eventName}
      </h1>
      
      {description && (
        <p 
          className="text-base text-gray-600 mb-4"
          style={{ 
            fontFamily: theme.fontFamily 
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
