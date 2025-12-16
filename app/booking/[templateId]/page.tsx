'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useFormData } from '@/hooks/useFormData';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { FormRenderer } from '@/components/FormRenderer';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function BookingFormPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const templateId = params.templateId as string;
  const formType = searchParams.get('type');

  const { formConfig, loading, error } = useFormData(templateId);
  const { submitForm } = useFormSubmit();

  // Filter form elements for rendering if it's a general form
  // This must be called before any early returns to satisfy Rules of Hooks
  const renderedFormConfig = React.useMemo(() => {
    if (!formConfig) return null;

    if (formType === 'general') {
      return {
        ...formConfig,
        formElements: formConfig.formElements.filter(el => {
          // Filter out payment specific elements
          if (el.type === 'qrcode' || el.type === 'paymentUpload') return false;

          // Filter out headings related to payment
          if (el.type === 'heading' && el.label?.toLowerCase().includes('payment')) return false;

          return true;
        })
      };
    }

    return formConfig;
  }, [formConfig, formType]);

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
    // Filter elements passed to submitForm to match what was rendered
    const effectiveFormElements = formType === 'general'
      ? formConfig.formElements.filter(el => {
        if (el.type === 'qrcode' || el.type === 'paymentUpload') return false;
        if (el.type === 'heading' && el.label?.toLowerCase().includes('payment')) return false;
        return true;
      })
      : formConfig.formElements;

    await submitForm(formData, effectiveFormElements, formConfig.eventName, formConfig.photographerId, formType);
  };

  if (!renderedFormConfig) return null;

  return (
    <div className="min-h-screen bg-white">
      <FormRenderer
        formConfig={renderedFormConfig}
        onSubmit={handleSubmit}
        isGeneralForm={formType === 'general'}
      />
    </div>
  );
}
