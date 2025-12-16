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
  eventName: string,
  assigneeId: string
) => {
  // Find date field for eventDate
  const dateField = formElements.find(el => el.type === 'date');
  let eventDate = new Date().toISOString();
  
  if (dateField && formData[dateField.id]) {
    // Convert YYYY-MM-DD to ISO 8601 with time
    const dateValue = formData[dateField.id] as string;
    eventDate = new Date(dateValue + 'T10:00:00Z').toISOString();
  }
  
  // Build customFields object - only include fields with actual values
  const customFields: Record<string, string | number | boolean> = {};
  
  formElements.forEach(element => {
    // Skip non-input elements (heading, divider, qrcode)
    if (element.type === 'heading' || element.type === 'divider' || element.type === 'qrcode') {
      return;
    }
    
    const value = formData[element.id];
    // Only add field if it has a meaningful value
    if (value !== undefined && value !== '' && value !== null && value !== false) {
      const key = toCamelCase(element.label);
      // Only add if the value is truly meaningful (not just 0 for numbers)
      if (typeof value === 'number' || (typeof value === 'string' && value.trim() !== '') || value === true) {
        customFields[key] = value;
      }
    }
  });
  
  // Add static payment screenshot field with key "QRpayment" only if it exists
  if (formData['payment_screenshot'] && formData['payment_screenshot'] !== '') {
    customFields['QRpayment'] = formData['payment_screenshot'];
  }
  
  // Return only the required fields - no extra null/empty fields
  const payload = {
    eventName,
    eventDate,
    assigneeId,
    customFields
  };
  
  return payload;
};
