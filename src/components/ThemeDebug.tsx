'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeDebug() {
  const { theme } = useTheme();
  const [hasDarkClass, setHasDarkClass] = useState(false);
  
  useEffect(() => {
    // Check if html has dark class
    const checkDarkClass = () => {
      const htmlElement = document.documentElement;
      setHasDarkClass(htmlElement.classList.contains('dark'));
    };
    
    checkDarkClass();
    
    // Set up observer to watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkClass();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-900 p-2 rounded shadow-lg z-50 text-xs border border-gray-300 dark:border-gray-700">
      <div>Current theme: <span className="font-bold">{theme}</span></div>
      <div>Dark class: <span className="font-bold">{hasDarkClass ? 'Yes' : 'No'}</span></div>
      <div className="mt-1 grid grid-cols-2 gap-1">
        <div className="h-4 w-8 bg-white"></div>
        <div className="h-4 w-8 dark:bg-gray-900"></div>
        <div className="h-4 w-8 text-gray-900"></div>
        <div className="h-4 w-8 dark:text-gray-100"></div>
      </div>
    </div>
  );
} 