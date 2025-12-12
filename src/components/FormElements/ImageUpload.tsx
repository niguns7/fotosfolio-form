import React, { useState } from 'react';
import Image from 'next/image';
import { Theme } from '@/types/theme.types';

interface ImageUploadProps {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  theme: Theme;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  label,
  required,
  value,
  onChange,
  error,
  theme,
}) => {
  const [preview, setPreview] = useState<string>(value || '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    }
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
        className="w-full border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
        onClick={() => document.getElementById(id)?.click()}
      >
        {preview ? (
          <div className="space-y-3">
            <div className="relative max-h-48 mx-auto">
              <Image 
                src={preview} 
                alt="Preview" 
                width={300}
                height={192}
                className="max-h-48 mx-auto rounded-md object-contain"
              />
            </div>
            <p className="text-sm text-gray-600" style={{ fontFamily: theme.fontFamily }}>
              Click to change image
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <svg 
              className="mx-auto h-16 w-16 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-sm text-gray-600" style={{ fontFamily: theme.fontFamily }}>
              Image will be displayed here
            </p>
          </div>
        )}
      </div>
      
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={handleFileChange}
        required={required}
        className="hidden"
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500" style={{ fontFamily: theme.fontFamily }}>
          {error}
        </p>
      )}
    </div>
  );
};
