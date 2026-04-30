import { FormElement } from "@/types/form.types";

interface ValidationOptions {
  options?: string[];
  minLength?: number;
  maxLength?: number;
}

const isEmptyValue = (value: string | number | boolean | undefined | null) => {
  return (
    value === undefined || value === null || value.toString().trim() === ""
  );
};

const normalizeStringValue = (value: string | number | boolean) =>
  value.toString().trim();

// Validate individual field
export const validateField = (
  type: string,
  value: string | number | boolean,
  required: boolean,
  options?: ValidationOptions | string[],
): string | null => {
  const validationOptions = Array.isArray(options)
    ? { options }
    : options || {};

  // Check required for boolean fields (like agreement checkbox)
  if (type === "agreement" || type === "checkbox" || type === "terms") {
    if (required && !value) {
      return "Please accept this field to continue";
    }
    return null;
  }

  // Check required for other fields
  if (required && isEmptyValue(value)) {
    return "This field is required";
  }

  if (isEmptyValue(value)) return null; // Skip further validation if empty and not required

  const stringValue = normalizeStringValue(value);

  const validateLength = (
    normalizedValue: string,
    minLength?: number,
    maxLength?: number,
  ) => {
    if (typeof minLength === "number" && normalizedValue.length < minLength) {
      return `Please enter at least ${minLength} characters`;
    }

    if (typeof maxLength === "number" && normalizedValue.length > maxLength) {
      return `Please enter no more than ${maxLength} characters`;
    }

    return null;
  };

  // Type-specific validation
  switch (type) {
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
        return "Enter a valid email address";
      }
      return validateLength(
        stringValue,
        validationOptions.minLength,
        validationOptions.maxLength,
      );

    case "phone": {
      const normalizedPhone = stringValue.replace(/[\s()-]/g, "");

      if (!/^\+?\d+$/.test(normalizedPhone)) {
        return "Enter a valid phone number";
      }

      const digitCount = normalizedPhone.replace(/\D/g, "").length;
      const minDigits = validationOptions.minLength ?? 7;
      const maxDigits = validationOptions.maxLength ?? 15;

      if (digitCount < minDigits) {
        return `Phone numbers must be at least ${minDigits} digits`;
      }

      if (digitCount > maxDigits) {
        return `Phone numbers must be no more than ${maxDigits} digits`;
      }

      return null;
    }

    case "number":
      if (!/^\d+$/.test(stringValue)) {
        return "Enter a valid number";
      }

      return validateLength(
        stringValue,
        validationOptions.minLength,
        validationOptions.maxLength,
      );

    case "date":
      if (isNaN(Date.parse(stringValue))) {
        return "Enter a valid date";
      }
      return null;

    case "select":
      if (
        validationOptions.options &&
        !validationOptions.options.includes(stringValue)
      ) {
        return "Please select a valid option";
      }
      return null;

    default:
      return validateLength(
        stringValue,
        validationOptions.minLength,
        validationOptions.maxLength,
      );
  }
};

// Validate entire form
export const validateForm = (
  formData: Record<string, string | number | boolean>,
  formElements: FormElement[],
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Skip validation for non-input elements
  const inputElements = formElements.filter(
    (element) => !["heading", "divider", "qrcode"].includes(element.type),
  );

  inputElements.forEach((element) => {
    const error = validateField(
      element.type,
      formData[element.id],
      element.required || false,
      {
        options: element.options,
        minLength: element.minLength,
        maxLength: element.maxLength,
      },
    );

    if (error) {
      errors[element.id] = error;
    }
  });

  return errors;
};
