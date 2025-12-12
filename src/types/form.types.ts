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
  | 'image'
  | 'agreement';

export interface FormElement {
  id: string;
  type: FormElementType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  agreementText?: string; // For agreement type
}

export interface FormData {
  [fieldId: string]: string | number | boolean;
}

export interface ValidationErrors {
  [fieldId: string]: string;
}
