import { FormElement } from '@/types/form.types';

// Convert string to camelCase
export const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => 
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, '');
};

// Transform form data to API payload
export const transformFormDataToPayload = (
  formData: Record<string, string | number | boolean>,
  formElements: FormElement[],
  eventName: string
) => {
  // Find date field for eventDate
  const dateField = formElements.find(el => el.type === 'date');
  let eventDate = new Date().toISOString();
  
  if (dateField && formData[dateField.id]) {
    // Convert YYYY-MM-DD to ISO 8601 with time
    const dateValue = formData[dateField.id] as string;
    eventDate = new Date(dateValue + 'T10:00:00Z').toISOString();
  }
  
  // Build customFields object
  const customFields: Record<string, string | number | boolean> = {};
  
  formElements.forEach(element => {
    const value = formData[element.id];
    if (value !== undefined && value !== '') {
      const key = toCamelCase(element.label);
      customFields[key] = value;
    }
  });
  
  return {
    eventName,
    eventDate,
    customFields
  };
};
