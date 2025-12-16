import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://prod.fotosfolio.com';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 404:
          throw new Error(data.error || 'Form not found');
        case 403:
          throw new Error(data.error || 'Form is no longer available');
        case 400:
          throw new Error(data.error || 'Invalid data provided');
        case 429:
          throw new Error('Too many requests. Please try again later');
        case 500:
          throw new Error('Server error. Please try again');
        default:
          throw new Error(data.error || 'An error occurred');
      }
    } else if (error.request) {
      // Request made but no response
      throw new Error('Network error. Please check your connection');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

// Upload images to event management
export const uploadEventImages = async (userId: string, images: File[]): Promise<{ downloadUrls: string[]; message: string }> => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });

  const response = await apiClient.post(`/event-management/upload-images/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default apiClient;
