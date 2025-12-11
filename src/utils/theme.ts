import { ButtonStyle, FormWidth } from '@/types/theme.types';

// Get form width class
export const getFormWidthClass = (width: FormWidth): string => {
  switch (width) {
    case 'narrow': 
      return 'max-w-xl';
    case 'wide': 
      return 'max-w-5xl';
    default: 
      return 'max-w-3xl';
  }
};

// Get button style class
export const getButtonStyleClass = (style: ButtonStyle): string => {
  switch (style) {
    case 'pill': 
      return 'rounded-full';
    case 'square': 
      return 'rounded-none';
    default: 
      return 'rounded-lg';
  }
};

// Get background gradient
export const getBackgroundGradient = (
  backgroundColor: string,
  primaryColor: string
): string => {
  return `linear-gradient(135deg, ${backgroundColor} 0%, ${primaryColor}08 50%, ${backgroundColor} 100%)`;
};
