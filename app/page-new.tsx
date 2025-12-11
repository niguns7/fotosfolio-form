import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            FotosFolio Forms
          </h1>
          <p className="text-xl text-gray-600">
            Professional Photography Booking Portal
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How It Works
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Receive a Link</h3>
                <p className="text-gray-600">
                  Your photographer will send you a personalized booking form link.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Fill Out the Form</h3>
                <p className="text-gray-600">
                  Provide your event details and booking information.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Get Confirmed</h3>
                <p className="text-gray-600">
                  Your photographer will review and confirm your booking.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-gray-600">
          <p className="mb-4">
            Don&apos;t have a booking link?
          </p>
          <Link
            href="https://fotosfolio.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Visit FotosFolio
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>
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
