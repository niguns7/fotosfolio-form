// Form element types
export type FormElementType = 
  | 'text' 
  | 'email' 
  | 'phone' 
  | 'number' 
  | 'textarea' 
  | 'date' 
  | 'select'
  | 'heading'
  | 'divider'
  | 'image';

export interface FormElement {
  id: string;
  type: FormElementType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface FormData {
  [fieldId: string]: string | number | boolean;
}

export interface ValidationErrors {
  [fieldId: string]: string;
}
