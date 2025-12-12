import { FormElement } from '@/types/form.types';

// Validate individual field
export const validateField = (
  type: string,
  value: string | number | boolean,
  required: boolean,
  options?: string[]
): string | null => {
  // Check required for boolean fields (like agreement checkbox)
  if (type === 'agreement') {
    if (required && !value) {
      return 'You must agree to the terms and conditions';
    }
    return null;
  }

  // Check required for other fields
  if (required && (!value || value.toString().trim() === '')) {
    return 'This field is required';
  }
  
  if (!value) return null; // Skip further validation if empty and not required
  
  // Type-specific validation
  switch (type) {
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.toString())) {
        return 'Invalid email format';
      }
      break;
      
    case 'phone':
      if (!/^[\d\s\-\+\(\)]+$/.test(value.toString())) {
        return 'Invalid phone format';
      }
      break;
      
    case 'number':
      if (isNaN(Number(value))) {
        return 'Must be a valid number';
      }
      break;
      
    case 'date':
      if (isNaN(Date.parse(value.toString()))) {
        return 'Invalid date';
      }
      break;
      
    case 'select':
      if (options && !options.includes(value.toString())) {
        return 'Invalid selection';
      }
      break;
  }
  
  return null;
};

// Validate entire form
export const validateForm = (
  formData: Record<string, string | number | boolean>,
  formElements: FormElement[]
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Skip validation for non-input elements
  const inputElements = formElements.filter(
    element => !['heading', 'divider'].includes(element.type)
  );
  
  inputElements.forEach(element => {
    const error = validateField(
      element.type,
      formData[element.id],
      element.required || false,
      element.options
    );
    
    if (error) {
      errors[element.id] = error;
    }
  });
  
  return errors;
};
