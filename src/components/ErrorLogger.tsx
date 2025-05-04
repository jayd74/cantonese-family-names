'use client';

import { useEffect, useState } from 'react';

export default function ErrorLogger() {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    function handleError(event: ErrorEvent) {
      console.log('Error caught:', event.error);
      setErrors(prev => [...prev, `${event.message} at ${event.filename}:${event.lineno}`]);
    }

    window.addEventListener('error', handleError);

    // Log theme-related information
    console.log('HTML classes:', document.documentElement.className);
    console.log('Dark mode media query:', window.matchMedia('(prefers-color-scheme: dark)').matches);
    console.log('localStorage theme:', localStorage.getItem('theme'));

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (errors.length === 0) return null;

  return (
    <div className="fixed top-4 left-4 bg-red-50 dark:bg-red-900 p-3 rounded shadow-lg z-50 max-w-md text-sm border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200">
      <h3 className="font-bold mb-2">Errors Detected:</h3>
      <ul className="list-disc pl-5">
        {errors.map((error, index) => (
          <li key={index} className="mb-1">{error}</li>
        ))}
      </ul>
    </div>
  );
} 