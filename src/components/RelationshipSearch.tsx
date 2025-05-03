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
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Cantonese Family Addressing Guide</h1>
        <p className="text-center text-gray-600 mb-4">
          Learn how to properly address your family members in Cantonese
        </p>
        
        {/* Quick links */}
        <div className="flex justify-center gap-4 mb-6">
          <Link 
            href="/guide" 
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Full Guide
          </Link>
          <Link 
            href="/chart" 
            className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
              <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
              <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
            </svg>
            Family Tree Chart
          </Link>
          <Link 
            href="/calculator" 
            className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14 4.5V14a2 2 0 01-2 2h-1v-1h1a1 1 0 001-1V4.5h-2A1.5 1.5 0 019.5 3V1H4a1 1 0 00-1 1v9H2V2a2 2 0 012-2h5.5L14 4.5zM3.75 15.25a.75.75 0 100 1.5.75.75 0 000-1.5zm8.25-.75a.75.75 0 100 1.5.75.75 0 000-1.5zM4.5 13.25a.75.75 0 10.75.75.75.75 0 00-.75-.75zM3.75 11.5a.75.75 0 100 1.5.75.75 0 000-1.5zm0-2.25a.75.75 0 100 1.5.75.75 0 000-1.5zM3 6.75A.75.75 0 113.75 6 .75.75 0 013 6.75zm.75 2.25a.75.75 0 100 1.5.75.75 0 000-1.5zM8.25 15a.75.75 0 100 1.5.75.75 0 000-1.5zm0-2.25a.75.75 0 100 1.5.75.75 0 000-1.5z" clipRule="evenodd" />
            </svg>
            Relationship Calculator
          </Link>
        </div>

        {/* Search input */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a family relationship..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Generation tabs */}
      <div className="flex overflow-x-auto py-2 mb-6 gap-2">
        {[-3, -2, -1, 0, 1, 2, 3].map((gen) => (
          <button
            key={gen}
            onClick={() => handleGenerationSelect(gen)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              selectedGeneration === gen
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((relation, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold mb-1">{relation.english}</h3>
                <div className="mb-3">
                  <span className="text-2xl font-bold block mb-1">{relation.cantonese}</span>
                  {relation.pinyin && (
                    <span className="text-sm text-gray-500 block">
                      Pronunciation: {relation.pinyin}
                    </span>
                  )}
                </div>
                {relation.notes && (
                  <p className="text-sm text-gray-600 mt-auto">{relation.notes}</p>
                )}
                <div className="mt-2 pt-2 border-t text-xs text-gray-500">
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
        <div className="text-center py-8 text-gray-500">
          No results found. Try a different search term or generation filter.
        </div>
      )}
    </div>
  );
} 