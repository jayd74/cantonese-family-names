'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { searchRelationships, getRelationshipsByGeneration } from '@/data/familyRelationships';

interface RelationshipSearchProps {
  initialQuery?: string;
}

export default function RelationshipSearch({ initialQuery = '' }: RelationshipSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(getRelationshipsByGeneration(1)); // Default to showing parents' generation
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(1);

  // Update results when query changes
  useEffect(() => {
    if (query.trim()) {
      setResults(searchRelationships(query));
      setSelectedGeneration(null); // Clear generation filter when searching
    } else if (selectedGeneration !== null) {
      setResults(getRelationshipsByGeneration(selectedGeneration));
    } else {
      setResults(getRelationshipsByGeneration(1)); // Default to parents
    }
  }, [query, selectedGeneration]);

  // Handle generation tab selection
  const handleGenerationSelect = (generation: number) => {
    setSelectedGeneration(generation);
    setQuery(''); // Clear search when selecting a generation
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-sky-700 dark:text-sky-300">Cantonese Family Search</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          Find the proper Cantonese terms for family relationships
        </p>
        
        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center px-3 py-1.5 bg-sky-100 text-sky-700 rounded-full hover:bg-sky-200 transition-colors text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </Link>
          <Link 
            href="/calculator" 
            className="inline-flex items-center px-3 py-1.5 bg-sky-100 text-sky-700 rounded-full hover:bg-sky-200 transition-colors text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
            </svg>
            Calculator
          </Link>
        </div>

        {/* Search input */}
        <div className="relative max-w-md mx-auto mb-4">
          <div className="flex items-center border border-gray-200 bg-white rounded-full shadow-sm overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a family relationship..."
              className="w-full px-3 py-2 border-none focus:outline-none focus:ring-0"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="px-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Generation tabs */}
      <div className="flex overflow-x-auto py-2 mb-6 gap-1.5 no-scrollbar">
        {[-3, -2, -1, 0, 1, 2, 3].map((gen) => (
          <button
            key={gen}
            onClick={() => handleGenerationSelect(gen)}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
              selectedGeneration === gen
                ? 'bg-sky-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {gen > 0
              ? `+${gen} Generation${gen > 1 ? 's' : ''} Above`
              : gen < 0
              ? `${Math.abs(gen)} Generation${Math.abs(gen) > 1 ? 's' : ''} Below`
              : 'Same Generation'}
          </button>
        ))}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {results.map((relation, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-sky-200 hover:bg-sky-50 transition-all"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1">{relation.english}</h3>
                <div className="mb-2">
                  <span className="text-xl sm:text-2xl font-bold block mb-1 text-sky-800">{relation.cantonese}</span>
                  {relation.yue && relation.yue !== relation.cantonese && (
                    <span className="text-lg sm:text-xl font-medium block mb-1 text-sky-700">{relation.yue}</span>
                  )}
                  {relation.pinyin && (
                    <div className="flex items-center">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {relation.pinyin}
                      </span>
                      <button 
                        onClick={() => {
                          const utterance = new SpeechSynthesisUtterance(relation.pinyin);
                          utterance.lang = 'zh-HK';
                          utterance.rate = 0.8;
                          window.speechSynthesis.speak(utterance);
                        }}
                        className="ml-2 p-1 rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                {relation.notes && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-auto">{relation.notes}</p>
                )}
                <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                  {relation.generation > 0
                    ? `${relation.generation} generation${relation.generation > 1 ? 's' : ''} above you`
                    : relation.generation < 0
                    ? `${Math.abs(relation.generation)} generation${Math.abs(relation.generation) > 1 ? 's' : ''} below you`
                    : 'Same generation as you'}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-xl shadow-sm text-gray-500">
          No results found. Try a different search term or generation filter.
        </div>
      )}
    </div>
  );
} 