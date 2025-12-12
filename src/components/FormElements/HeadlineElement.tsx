import React from 'react';
import { Theme } from '@/types/theme.types';

interface HeadlineElementProps {
  id: string;
  label?: string;
  theme: Theme;
}

export const HeadlineElement: React.FC<HeadlineElementProps> = ({
  label = 'Headline',
  theme,
}) => {
  return (
    <div className="mb-6">
      <h2 
        className="text-xl md:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3"
        style={{ 
          fontFamily: theme.fontFamily 
        }}
      >
        {label}
      </h2>
    </div>
  );
};
