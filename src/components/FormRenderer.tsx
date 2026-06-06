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
import { getFormWidthClass, getBackgroundGradient } from '@/utils/theme';

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

    // Payment screenshot is now optional - no validation needed

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
      const dividerElements = formConfig.formElements.filter(
        (el) => el.type === 'divider'
      );
      const totalSections = dividerElements.length + 1;
      const dividerIndex = dividerElements.findIndex((el) => el.id === element.id);
      const sectionNumber = dividerIndex + 2;

      return (
        <HorizontalRule
          key={element.id}
          id={element.id}
          theme={formConfig.theme}
          label={element.label}
          placeholder={element.placeholder}
          sectionNumber={sectionNumber}
          totalSections={totalSections}
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

  const canvasBg = `${formConfig.theme.primaryColor}05`;

  const dividerElements = formConfig.formElements.filter(
    (el) => el.type === 'divider'
  );
  const totalSections = dividerElements.length + 1;

  const elementSectionNumber: Record<string, number> = {};
  const elementIsFirstOfSection: Record<string, boolean> = {};

  let sectionCounter = 1;
  let nextIsFirst = false;

  formConfig.formElements.forEach((element) => {
    if (element.type === 'divider') {
      sectionCounter++;
      nextIsFirst = true;
    } else {
      elementSectionNumber[element.id] = sectionCounter;
      if (nextIsFirst) {
        elementIsFirstOfSection[element.id] = true;
        nextIsFirst = false;
      }
    }
  });

  return (
    <div 
      className="min-h-screen py-8 px-4 transition-colors duration-300"
      style={{
        backgroundColor: canvasBg || '#f8fafc',
        fontFamily: formConfig.theme.fontFamily,
      }}
    >
      <div className={`mx-auto ${getFormWidthClass(formConfig.theme.formWidth)} space-y-4`}>
        {/* Header Card */}
        <FormHeader
          logo={formConfig.logo}
          eventName={formConfig.eventName}
          subtitle={formConfig.subtitle}
          description={formConfig.description}
          theme={formConfig.theme}
          sectionNumber={1}
          totalSections={totalSections}
        />

        {/* Form Elements */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formConfig.formElements.map((element) => {
            const rendered = renderFormElement(element);
            if (!rendered) return null;

            // If it is a divider/section break, render it with both the gap and a section header card
            if (element.type === 'divider') {
              const dividerElements = formConfig.formElements.filter(
                (el) => el.type === 'divider'
              );
              const totalSections = dividerElements.length + 1;
              const dividerIndex = dividerElements.findIndex((el) => el.id === element.id);
              const sectionNumber = dividerIndex + 2;

              return (
                <div key={element.id} className="space-y-4">
                  {/* The Gap */}
                  <div className="py-2">
                    {rendered}
                  </div>
                  
                  {/* The Section Header Card */}
                  <div className="flex flex-col">
                    <div className="flex">
                      <div 
                        className="px-4 py-1.5 text-xs font-semibold text-white rounded-t-lg shadow-sm"
                        style={{ backgroundColor: formConfig.theme.primaryColor }}
                      >
                        Section {sectionNumber} of {totalSections}
                      </div>
                    </div>
                    <div 
                      className="p-6 bg-white border border-slate-200/60 rounded-xl shadow-sm rounded-tl-none overflow-hidden"
                    >
                      <h2 
                        className="text-2xl font-bold tracking-tight text-slate-800 pb-3 border-b mb-3"
                        style={{ 
                          fontFamily: formConfig.theme.fontFamily,
                          borderBottomColor: `${formConfig.theme.primaryColor}20`
                        }}
                      >
                        {element.label || 'Untitled section'}
                      </h2>
                      {element.placeholder && (
                        <p 
                          className="text-sm text-slate-500"
                          style={{ fontFamily: formConfig.theme.fontFamily }}
                        >
                          {element.placeholder}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            // Render each form element inside its own independent card
            return (
              <div 
                key={element.id}
                className="p-6 bg-white border border-slate-200/60 rounded-xl shadow-sm"
              >
                {rendered}
              </div>
            );
          })}

          {/* Static Payment Information Section */}
          {/* Static Payment Information Section - Only show if not general form */}
          {!isGeneralForm && (
            <>
              <div className="p-6 bg-white border border-slate-200/60 rounded-xl shadow-sm">
                <QRCodeDisplay
                  id="payment-qr"
                  label="Payment Information"
                  theme={formConfig.theme}
                  userId={formConfig.photographerId}
                />
              </div>

              <div className="p-6 bg-white border border-slate-200/60 rounded-xl shadow-sm">
                <PaymentUpload
                  id="payment_screenshot"
                  label="Upload Payment Screenshot"
                  required={false}
                  value={(formData['payment_screenshot'] as string) || ''}
                  onChange={(value) => handleFieldChange('payment_screenshot', value)}
                  error={errors['payment_screenshot']}
                  theme={formConfig.theme}
                  userId={formConfig.photographerId}
                />
              </div>
            </>
          )}

          {/* Action and Footer Card */}
          <div className="p-6 bg-white border border-slate-200/60 rounded-xl shadow-sm flex flex-col items-center justify-center gap-4">
            <SubmitButton
              onClick={() => handleSubmit}
              disabled={isSubmitting}
              loading={isSubmitting}
              theme={formConfig.theme}
            />
            <FormFooter />
          </div>
        </form>
      </div>
    </div>
  );
};
