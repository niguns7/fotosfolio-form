import { FormConfig, GetFormConfigResponse } from '../types/api.types';
import { Theme } from '../types/theme.types';
import apiClient from './api';

// Default theme configuration
const defaultTheme: Theme = {
  primaryColor: '#701A19',
  secondaryColor: '#A1111A',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  fontFamily: 'Inter',
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

    // Load theme configuration dynamically from database
    let loadedTheme: Theme = { ...defaultTheme };
    if (data.theme) {
      try {
        const parsedTheme = typeof data.theme === 'string'
          ? JSON.parse(data.theme)
          : data.theme;
        if (parsedTheme && typeof parsedTheme === 'object') {
          loadedTheme = {
            ...loadedTheme,
            ...parsedTheme
          };
        }
      } catch (e) {
        console.error("Failed to parse theme from API response:", e);
      }
    }

    // Transform API response to internal FormConfig structure
    const formConfig: FormConfig = {
      id: data.id,
      eventName: data.formName,
      eventType: data.formType || 'general',
      description: data.description,
      subtitle: data.subtitle || undefined,
      logo: data.logo,
      theme: loadedTheme,
      formElements: data.formFields.fields,
      isActive: true,
      photographerId: data.userId,
      userId: data.userId,
    };

    return formConfig;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch form configuration');
  }
};
