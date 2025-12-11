import { FormElement } from './form.types';
import { Theme } from './theme.types';

// Actual API Response structure
export interface GetFormConfigResponse {
  id: string;
  formName: string;
  isDefault: boolean;
  description?: string;
  formFields: {
    fields: FormElement[];
  };
  logo?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Internal form configuration with default theme
export interface FormConfig {
  id: string;
  eventName: string;
  eventType: string;
  description?: string;
  subtitle?: string;
  logo?: string;
  theme: Theme;
  formElements: FormElement[];
  isActive: boolean;
  photographerId: string;
}

// API Request for submitting event booking
export interface SubmitBookingRequest {
  eventName: string;
  eventDate: string; // ISO 8601 format
  customFields: Record<string, string | number | boolean>;
}

// API Response for submitting booking
export interface SubmitBookingResponse {
  success: boolean;
  data?: {
    bookingId: string;
    eventName: string;
    eventDate: string;
    status: string;
    message: string;
  };
  error?: string;
}

// Error response structure
export interface APIError {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}
