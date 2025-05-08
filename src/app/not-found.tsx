'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 via-white to-purple-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-blue-700">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Oops! Page not found</h2>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you’re looking for might have been removed or doesn’t exist.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
        >
          Go Back
        </button>
        <Link
          href="/"
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-all"
        >
          Go to Homepage
        </Link>
      </div>

     
    </div>
  );
}
