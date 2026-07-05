'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const eventName = searchParams.get('eventName');

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-8 bg-slate-50 text-slate-800 relative overflow-hidden font-sans">
      {/* Decorative background glow circles matching the red/brand theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#701A19]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#A1111A]/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl w-full mx-auto flex justify-between items-center z-10">
        <Link href="https://fotosfolio.com" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#701A19] to-[#A1111A] bg-clip-text text-transparent group-hover:opacity-90 transition-all duration-300">
            FotosFolio
          </span>
          <span className="px-2 py-0.5 text-xs font-semibold bg-[#701A19]/10 text-[#701A19] rounded-full border border-[#701A19]/20">
            Forms
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-md w-full mx-auto my-auto py-12 z-10">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 text-center shadow-xl shadow-slate-100 hover:border-[#701A19]/30 transition-all duration-500">
          {/* Animated custom checkmark container with red theme */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#701A19]/10 to-[#A1111A]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#701A19]/20 shadow-sm">
              <svg
                className="w-10 h-10 text-[#A1111A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Booking Submitted!
            </h1>
            <p className="text-sm text-slate-500">
              Your request has been received and logged successfully.
            </p>
          </div>

          {/* Event Details */}
          {eventName && eventName !== 'undefined' && (
            <div className="mb-6 text-left border-b border-slate-100 pb-5">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Event Type / Name</p>
              <p className="text-base font-semibold text-slate-900">
                {eventName}
              </p>
            </div>
          )}

          {/* Next steps and Call to action */}
          <div className="space-y-4">
            <p className="text-sm text-slate-500 leading-relaxed">
              Your photographer will review the details and reach out to you shortly.
            </p>

            <Link
              href="https://fotosfolio.com"
              className="block w-full px-6 py-3.5 bg-gradient-to-r from-[#701A19] to-[#A1111A] hover:opacity-95 text-white rounded-xl shadow-lg shadow-red-900/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-semibold text-sm"
            >
              Visit FotosFolio
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center py-6 border-t border-slate-200 z-10 text-xs text-slate-500">
        <p>
          Powered by{" "}
          <Link
            href="https://fotosfolio.com"
            className="text-slate-600 hover:text-slate-900 font-medium underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900 transition-colors"
          >
            FotosFolio
          </Link>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#701A19]"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
