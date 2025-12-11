'use client';

import { useState, useEffect } from 'react';
import { getFormConfig } from '@/services/formService';
import { FormConfig } from '@/types/api.types';

interface UseFormDataResult {
  formConfig: FormConfig | null;
  loading: boolean;
  error: string | null;
}

export const useFormData = (templateId: string): UseFormDataResult => {
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        const config = await getFormConfig(templateId);
        
        // Check if form is active
        if (!config.isActive) {
          setError('This form is no longer available');
          return;
        }
        
        setFormConfig(config);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (templateId) {
      fetchFormConfig();
    }
  }, [templateId]);

  return { formConfig, loading, error };
};
