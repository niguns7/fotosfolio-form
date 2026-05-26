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
        className="text-xl md:text-2xl font-bold pb-3 border-b"
        style={{ 
          fontFamily: theme.fontFamily,
          color: theme.primaryColor,
          borderBottomColor: `${theme.primaryColor}20`,
        }}
      >
        {label}
      </h2>
    </div>
  );
};
