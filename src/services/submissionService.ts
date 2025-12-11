import apiClient from './api';
import { SubmitBookingRequest, SubmitBookingResponse } from '@/types/api.types';

// Submit event booking
export const submitBooking = async (
  bookingData: SubmitBookingRequest
): Promise<SubmitBookingResponse> => {
  try {
    const response = await apiClient.post<SubmitBookingResponse>(
      '/event-management',
      bookingData
    );
    
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to submit booking');
  }
};
