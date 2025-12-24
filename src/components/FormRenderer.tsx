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
  HeadlineElement,
  HorizontalRule,
  ImageUpload,
  AgreementField,
  CheckboxField,
  QRCodeDisplay,
  PaymentUpload,
  TimeInput,
  AmountInput,
  PaymentSelector,
} from './FormElements';
import { validateForm } from '@/utils/validation';

interface FormRendererProps {
  formConfig: FormConfig;
  onSubmit: (formData: Record<string, string | number | boolean>) => Promise<void>;
  isGeneralForm?: boolean;
}

export const FormRenderer: React.FC<FormRendererProps> = ({ formConfig, onSubmit, isGeneralForm = false }) => {
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

    // Validate form fields
    const validationErrors = validateForm(formData, formConfig.formElements);

    // Validate static payment screenshot field only if NOT a general form
    if (!isGeneralForm && (!formData['payment_screenshot'] || formData['payment_screenshot'].toString().trim() === '')) {
      validationErrors['payment_screenshot'] = 'Payment screenshot is required';
    }

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
    // For non-input elements
    if (element.type === 'heading') {
      return (
        <HeadlineElement
          key={element.id}
          id={element.id}
          label={element.label || 'Headline'}
          theme={formConfig.theme}
        />
      );
    }

    if (element.type === 'divider') {
      return (
        <HorizontalRule
          key={element.id}
          id={element.id}
        />
      );
    }

    // For input elements
    const commonProps = {
      id: element.id,
      label: element.label || '',
      placeholder: element.placeholder || `Enter ${(element.label || '').toLowerCase()}`,
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

      case 'image':
        return (
          <ImageUpload
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as string) || ''}
            onChange={(value) => handleFieldChange(element.id, value)}
          />
        );

      case 'agreement':
      case 'terms':
        return (
          <AgreementField
            key={element.id}
            id={element.id}
            label={element.label || 'Agreement'}
            required={element.required}
            value={(formData[element.id] as boolean) || false}
            onChange={(value) => handleFieldChange(element.id, value)}
            error={errors[element.id]}
            theme={formConfig.theme}
            agreementText={element.agreementText || element.placeholder}
          />
        );

      case 'checkbox':
        return (
          <CheckboxField
            key={element.id}
            id={element.id}
            label={element.label || 'Checkbox'}
            required={element.required}
            value={(formData[element.id] as boolean) || false}
            onChange={(value) => handleFieldChange(element.id, value)}
            error={errors[element.id]}
            theme={formConfig.theme}
            checkboxLabel={element.checkboxLabel}
          />
        );

      case 'qrcode':
        return (
          <QRCodeDisplay
            key={element.id}
            id={element.id}
            label={element.label}
            theme={formConfig.theme}
            userId={formConfig.photographerId}
          />
        );

      case 'paymentUpload':
        return (
          <PaymentUpload
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as string) || ''}
            onChange={(value) => handleFieldChange(element.id, value)}
            userId={formConfig.photographerId}
          />
        );

      case 'time':
        return (
          <TimeInput
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as string) || ''}
            onChange={(value) => handleFieldChange(element.id, value)}
          />
        );

      case 'amount':
        return (
          <AmountInput
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as number) || 0}
            onChange={(value) => handleFieldChange(element.id, value)}
          />
        );

      case 'payment':
        return (
          <PaymentSelector
            key={element.id}
            {...commonProps}
            value={(formData[element.id] as string) || ''}
            onChange={(value) => handleFieldChange(element.id, value)}
            options={element.options}
          />
        );

      default:
        console.warn('Unknown form element type:', element.type);
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-white">
      <div className={`mx-auto max-w-2xl space-y-6`}>
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <FormHeader
            logo={formConfig.logo}
            eventName={formConfig.eventName}
            subtitle={formConfig.subtitle}
            description={formConfig.description}
            theme={formConfig.theme}
          />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formConfig.formElements.map((element) => {
              console.log('Rendering element:', element.type, element.id);
              return renderFormElement(element);
            })}

            {/* Static Payment Information Section */}
            {/* Static Payment Information Section - Only show if not general form */}
            {!isGeneralForm && (
              <>
                <QRCodeDisplay
                  id="payment-qr"
                  label="Payment Information"
                  theme={formConfig.theme}
                  userId={formConfig.photographerId}
                />

                <PaymentUpload
                  id="payment_screenshot"
                  label="Upload Payment Screenshot"
                  required={true}
                  value={(formData['payment_screenshot'] as string) || ''}
                  onChange={(value) => handleFieldChange('payment_screenshot', value)}
                  error={errors['payment_screenshot']}
                  theme={formConfig.theme}
                  userId={formConfig.photographerId}
                />
              </>
            )}

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
