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
  | 'agreement'
  | 'terms'
  | 'checkbox'
  | 'qrcode'
  | 'paymentUpload'
  | 'time'
  | 'amount'
  | 'payment';

export interface FormElement {
  id: string;
  type: FormElementType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  agreementText?: string; // For agreement type
  checkboxLabel?: string; // For checkbox type
}

export interface FormData {
  [fieldId: string]: string | number | boolean;
}

export interface ValidationErrors {
  [fieldId: string]: string;
}
