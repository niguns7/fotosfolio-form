// Form element types
export type FormElementType = 
  | 'text' 
  | 'email' 
  | 'phone' 
  | 'number' 
  | 'textarea' 
  | 'date' 
  | 'select';

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface FormData {
  [fieldId: string]: any;
}

export interface ValidationErrors {
  [fieldId: string]: string;
}
