import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Theme } from '@/types/theme.types';

interface QRCodeDisplayProps {
  id: string;
  label?: string;
  theme: Theme;
  userId: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  label = 'Payment Information',
  theme,
  userId,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  console.log(userId, 'userId in QRCodeDisplay');

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://prod.fotosfolio.com/user/paymentQr/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch QR code');
        }

        
        const data = await response.json();

        console.log(data, 'QR code data');
        if (data.paymentQr) {
          setQrCodeUrl(data.paymentQr);
        }
      } catch (err) {
        console.error('Error fetching QR code:', err);
        setError('Failed to load QR code');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchQRCode();
    }
  }, [userId]);

  return (
    <div className="mb-5">
      <h3 
        className="text-base font-semibold text-gray-800 mb-4"
        style={{ fontFamily: theme.fontFamily }}
      >
        {label}
      </h3>
      
      <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-md bg-white">
        {loading ? (
          <div className="w-48 h-48 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : qrCodeUrl ? (
          <Image
            src={qrCodeUrl}
            alt="Payment QR Code"
            width={200}
            height={200}
            className="object-contain"
          />
        ) : null}
      </div>
      
      <p 
        className="text-xs text-gray-500 text-center mt-2"
        style={{ fontFamily: theme.fontFamily }}
      >
        Scan this QR code with your payment app to complete the transaction
      </p>
    </div>
  );
};