import apiClient from './api';
import { SubmitBookingRequest, SubmitBookingResponse, SubmitGeneralFormRequest } from '@/types/api.types';
import { AxiosResponse } from 'axios';

// Submit event booking
export const submitBooking = async (
  bookingData: SubmitBookingRequest
): Promise<AxiosResponse<SubmitBookingResponse>> => {
  try {
    const response = await apiClient.post<SubmitBookingResponse>(
      '/event-management',
      bookingData
    );

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to submit booking');
  }
};

// Submit general form
export const submitGeneralForm = async (
  formData: SubmitGeneralFormRequest
): Promise<AxiosResponse<SubmitBookingResponse>> => {
  try {
    const response = await apiClient.post<SubmitBookingResponse>(
      '/event-management/information-forms',
      formData
    );

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to submit general form');
  }
};
