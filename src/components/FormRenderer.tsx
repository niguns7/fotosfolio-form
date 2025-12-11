'use client';

import React, { useState } from 'react';
import { FormConfig } from '@/types/api.types';
import { FormElement } from '@/types/form.types';
import { FormHeader } from './FormHeader';
import { FormFooter } from './FormFooter';
import { SubmitButton } from './SubmitButton';
import {
  TextInput,
  EmailInput,
  PhoneInput,
  NumberInput,
  DateInput,
  TextArea,
  SelectInput,
} from './FormElements';
import { validateForm } from '@/utils/validation';

interface FormRendererProps {
  formConfig: FormConfig;
  onSubmit: (formData: Record<string, string | number | boolean>) => Promise<void>;
}

export const FormRenderer: React.FC<FormRendererProps> = ({ formConfig, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (fieldId: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error for this field when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData, formConfig.formElements);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Submit form
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormElement = (element: FormElement) => {
    const commonProps = {
      id: element.id,
      label: element.label,
      placeholder: element.placeholder || `Enter ${element.label.toLowerCase()}`,
      required: element.required,
      error: errors[element.id],
      theme: formConfig.theme,
    };

    switch (element.type) {
      case 'text':
        return (
          <TextInput
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as string) || ''}
            onChange={(value) => handleFieldChange(element.id, value)}
          />
        );

      case 'email':
        return (
          <EmailInput
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as string) || ''}
            onChange={(value) => handleFieldChange(element.id, value)}
          />
        );

      case 'phone':
        return (
          <PhoneInput
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as string) || ''}
            onChange={(value) => handleFieldChange(element.id, value)}
          />
        );

      case 'number':
        return (
          <NumberInput
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as number) || 0}
            onChange={(value) => handleFieldChange(element.id, value)}
          />
        );

      case 'date':
        return (
          <DateInput
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as string) || ''}
            onChange={(value) => handleFieldChange(element.id, value)}
          />
        );

      case 'textarea':
        return (
          <TextArea
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as string) || ''}
            onChange={(value) => handleFieldChange(element.id, value)}
          />
        );

      case 'select':
        return (
          <SelectInput
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as string) || ''}
            onChange={(value) => handleFieldChange(element.id, value)}
            options={element.options || []}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-white">
      <div className={`mx-auto max-w-2xl`}>
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <FormHeader
            logo={formConfig.logo}
            eventName={formConfig.eventName}
            subtitle={formConfig.subtitle}
            description={formConfig.description}
            theme={formConfig.theme}
          />

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {formConfig.formElements.map(renderFormElement)}

            <div className="pt-4">
              <SubmitButton
                onClick={() => handleSubmit}
                disabled={isSubmitting}
                loading={isSubmitting}
                theme={formConfig.theme}
              />
            </div>
          </form>

          <FormFooter />
        </div>
      </div>
    </div>
  );
};
