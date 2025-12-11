import { FormConfig, GetFormConfigResponse } from '../types/api.types';
import { Theme } from '../types/theme.types';
import apiClient from './api';

// Default theme configuration
const defaultTheme: Theme = {
  primaryColor: '#2563eb',
  secondaryColor: '#1e40af',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  fontFamily: 'Inter, sans-serif',
  buttonStyle: 'rounded',
  formWidth: 'medium',
};

// Get form configuration by templateId
export const getFormConfig = async (templateId: string): Promise<FormConfig> => {
  try {
    const response = await apiClient.get<GetFormConfigResponse>(
      `/event-management/custom-forms/${templateId}`
    );
    
    const data = response.data;
    
    // Transform API response to internal FormConfig structure
    const formConfig: FormConfig = {
      id: data.id,
      eventName: data.formName,
      eventType: 'general',
      description: data.description,
      subtitle: undefined,
      logo: data.logo,
      theme: defaultTheme,
      formElements: data.formFields.fields,
      isActive: true,
      photographerId: data.userId,
    };
    
    return formConfig;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch form configuration');
  }
};
