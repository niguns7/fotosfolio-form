'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { submitBooking, submitGeneralForm } from '@/services/submissionService';
import { transformFormDataToPayload, transformFormDataToGeneralPayload } from '@/utils/formatting';
import { FormElement } from '@/types/form.types';

interface UseFormSubmitResult {
  submitForm: (
    formData: Record<string, string | number | boolean>,
    formElements: FormElement[],
    eventName: string,
    assigneeId: string,
    formType?: string | null
  ) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

export const useFormSubmit = (): UseFormSubmitResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submitForm = async (
    formData: Record<string, string | number | boolean>,
    formElements: FormElement[],
    eventName: string,
    assigneeId: string,
    formType?: string | null
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      let response;

      if (formType === 'general') {
        const payload = transformFormDataToGeneralPayload(formData, formElements, assigneeId);
        response = await submitGeneralForm(payload);
      } else {
        // Default to event submission
        const payload = transformFormDataToPayload(formData, formElements, eventName, assigneeId);
        response = await submitBooking(payload);
      }

      if (response.status === 201) {
        toast.success('Booking submitted successfully!');

        // Redirect to success page with booking details
        const params = new URLSearchParams({
          bookingId: response.data.bookingId,
          eventName: response.data.eventName,
        });
        router.push(`/success?${params.toString()}`);
      } else {
        throw new Error('Failed to submit booking');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit form';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting, error };
};
