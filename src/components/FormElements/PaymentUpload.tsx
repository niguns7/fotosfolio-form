import React, { useState } from 'react';
import { Theme } from '@/types/theme.types';
import { uploadEventImages } from '@/services/api';

interface PaymentUploadProps {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  theme: Theme;
  userId: string;
}

export const PaymentUpload: React.FC<PaymentUploadProps> = ({
  id,
  label,
  required,
  value,
  onChange,
  error,
  theme,
  userId,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleFileChange = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File size must be less than 5MB');
        return;
      }

      setIsUploading(true);
      setUploadError('');

      try {
        // Upload to API
        const response = await uploadEventImages(userId, [file]);
        
        if (response.downloadUrls && response.downloadUrls.length > 0) {
          // Store the download URL
          onChange(response.downloadUrls[0]);
        } else {
          throw new Error('No download URL received');
        }
      } catch (err) {
        console.error('Upload error:', err);
        setUploadError(err instanceof Error ? err.message : 'Failed to upload image');
        onChange(''); // Clear the value on error
      } finally {
        setIsUploading(false);
      }
    } else {
      setUploadError('Please select a valid image file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="mb-5">
      <label 
        htmlFor={id} 
        className="block mb-2 text-sm font-semibold text-gray-800"
        style={{ 
          fontFamily: theme.fontFamily 
        }}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div
        className={`w-full border-2 border-dashed rounded-md p-12 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onClick={() => !isUploading && document.getElementById(id)?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center space-y-2">
          {isUploading ? (
            <>
              <svg className="w-12 h-12 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm text-gray-600" style={{ fontFamily: theme.fontFamily }}>
                Uploading...
              </p>
            </>
          ) : value ? (
            <>
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-green-600 font-semibold" style={{ fontFamily: theme.fontFamily }}>
                Payment screenshot uploaded successfully
              </p>
              <p className="text-xs text-gray-500" style={{ fontFamily: theme.fontFamily }}>
                Click to upload a different file
              </p>
            </>
          ) : (
            <>
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: theme.fontFamily }}>
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: theme.fontFamily }}>
                  PNG, JPG, JPEG (Max. 5MB)
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      <input
        type="file"
        id={id}
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileChange(file);
        }}
        required={required}
        className="hidden"
      />
      
      <p 
        className="text-xs text-gray-600 mt-2"
        style={{ fontFamily: theme.fontFamily }}
      >
        Please upload a screenshot of your payment confirmation
      </p>
      
      {error && (
        <p className="mt-1 text-sm text-red-500" style={{ fontFamily: theme.fontFamily }}>
          {error}
        </p>
      )}
      
      {uploadError && (
        <p className="mt-1 text-sm text-red-500" style={{ fontFamily: theme.fontFamily }}>
          {uploadError}
        </p>
      )}
    </div>
  );
};