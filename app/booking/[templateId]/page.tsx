'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useFormData } from '@/hooks/useFormData';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { FormRenderer } from '@/components/FormRenderer';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function BookingFormPage() {
  const params = useParams();
  const templateId = params.templateId as string;
  
  const { formConfig, loading, error } = useFormData(templateId);
  const { submitForm } = useFormSubmit();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !formConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {error === 'Form not found' ? 'Form Not Found' : 'Error Loading Form'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'Unable to load the form. Please try again later.'}
          </p>
          <a 
            href="https://fotosfolio.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to FotosFolio
          </a>
        </div>
      </div>
    );
  }

  const handleSubmit = async (formData: Record<string, string | number | boolean>) => {
    await submitForm(formData, formConfig.formElements, formConfig.eventName);
  };

  return (
    <div className="min-h-screen bg-white">
      <FormRenderer 
        formConfig={formConfig} 
        onSubmit={handleSubmit}
      />
    </div>
  );
}
