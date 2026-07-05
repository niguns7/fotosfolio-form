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
  theme?: string | Theme;
  subtitle?: string;
  thankYouMessage?: string;
  redirectUrl?: string;
  emailNotifications?: boolean | string;
  requireApproval?: boolean | string;
  formType?: string;
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
  userId: string;
}

// API Request for submitting event booking
export interface SubmitBookingRequest {
  bookingId?: string | null;
  eventName: string;
  eventDate: string; // ISO 8601 format (e.g., "2024-12-31T10:00:00Z")
  assigneeId: string; // User ID of the photographer/assignee
  customFields: Record<string, string | number | boolean>;
}

// API Request for submitting general form
export interface SubmitGeneralFormRequest {
  bookingId?: string | null;
  assigneeId: string;
  customFields: Record<string, string | number | boolean>;
}

// API Response for submitting booking
export interface SubmitBookingResponse {
  id: string;
  eventName: string;
  eventDate: string;
  isImportant: boolean;
  assigneeId: string;
  customFields: Record<string, string | number | boolean>;
  teamMembers: string[];
  clientName: string | null;
  clientEmail: string | null;
  clientPhone: string | null;
  venue: string | null;
  eventLocation: string | null;
  eventTime: string | null;
  arrivalTime: string | null;
  locationLatitude: number | null;
  locationLongitude: number | null;
  googleCalendarEventId: string | null;
  status: string; // 'pending', 'confirmed', etc.
  syncGC: boolean;
  createdAt: string;
  updatedAt: string;
}

// Error response structure
export interface APIError {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}
