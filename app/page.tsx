import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-8 bg-slate-50 text-slate-800 relative overflow-hidden font-sans">
      {/* Decorative background glow circles in FotosFolio red tone */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#701A19]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#A1111A]/5 blur-[120px] pointer-events-none" />

      {/* Header / Logo */}
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
      <main className="max-w-4xl w-full mx-auto my-auto py-12 flex flex-col items-center text-center z-10">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Simplify Your{" "}
            <span className="bg-gradient-to-r from-[#701A19] to-[#A1111A] bg-clip-text text-transparent">
              Photography Bookings
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The premium booking portal designed exclusively for clients of FotosFolio photographers.
          </p>
        </div>

        {/* How it Works - Card */}
        <div className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100 hover:border-[#701A19]/30 transition-all duration-500 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-left flex items-center gap-3">
            <span className="w-1.5 h-6 bg-gradient-to-b from-[#701A19] to-[#A1111A] rounded-full" />
            How It Works
          </h2>
          
          <div className="space-y-6 text-left">
            <div className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#701A19]/10 to-[#A1111A]/10 text-[#701A19] flex items-center justify-center font-bold border border-[#701A19]/10">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-base sm:text-lg mb-1">Receive a Personalized Link</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Your photographer will share a personalized booking link tailored specifically to your event.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#701A19]/10 to-[#A1111A]/10 text-[#701A19] flex items-center justify-center font-bold border border-[#701A19]/10">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-base sm:text-lg mb-1">Complete the Form</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Fill in event dates, details, packages, and custom requirements in just a few clicks.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#701A19]/10 to-[#A1111A]/10 text-[#701A19] flex items-center justify-center font-bold border border-[#701A19]/10">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-base sm:text-lg mb-1">Instant Confirmation</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Your photographer will receive the submission and instantly sync details with your scheduling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-slate-500">
            Don&apos;t have a booking link?
          </p>
          <Link
            href="https://fotosfolio.com"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white rounded-xl bg-gradient-to-r from-[#701A19] to-[#A1111A] hover:opacity-95 shadow-lg shadow-red-900/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Visit FotosFolio
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center py-6 border-t border-slate-200 z-10 text-xs sm:text-sm text-slate-500">
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
