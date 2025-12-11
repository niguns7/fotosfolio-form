// Theme configuration types
export type ButtonStyle = 'rounded' | 'square' | 'pill';
export type FormWidth = 'narrow' | 'medium' | 'wide';

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  buttonStyle: ButtonStyle;
  formWidth: FormWidth;
}
