'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-xl font-bold text-blue-600 flex items-center"
          >
            <span className="mr-2 text-2xl">👪</span>
            Cantonese Family Names
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link href="/guide" className="text-gray-600 hover:text-blue-600 font-medium">
              Guide
            </Link>
            <Link href="/chart" className="text-gray-600 hover:text-blue-600 font-medium">
              Chart
            </Link>
            <Link href="/calculator" className="text-gray-600 hover:text-blue-600 font-medium">
              Calculator
            </Link>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/guide" 
                className="text-gray-600 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Guide
              </Link>
              <Link 
                href="/chart" 
                className="text-gray-600 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Chart
              </Link>
              <Link 
                href="/calculator" 
                className="text-gray-600 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculator
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
} 