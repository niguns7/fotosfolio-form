import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Form Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The form you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link 
          href="https://fotosfolio.com"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to FotosFolio
        </Link>
      </div>
    </div>
  );
}
