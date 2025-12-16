'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const eventName = searchParams.get('eventName');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-green-50 to-blue-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Booking Submitted!
          </h1>
          <p className="text-gray-600">
            Your booking request has been received successfully.
          </p>
        </div>

        {bookingId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Booking ID</p>
            <p className="text-lg font-mono font-semibold text-gray-800">
              {bookingId}
            </p>
          </div>
        )}

        {eventName && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Event</p>
            <p className="text-lg font-semibold text-gray-800">
              {eventName}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            The photographer will review your submission and get back to you shortly.
          </p>

          <Link
            href="https://fotosfolio.com"
            className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Visit FotosFolio
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Powered by{' '}
            <a
              href="https://fotosfolio.com"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              FotosFolio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
