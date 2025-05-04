'use client';

import { useState, useEffect } from 'react';
import { 
  familyRelationships, 
  FamilyRelationship, 
  searchRelationships
} from '@/data/familyRelationships';

interface RelationButton {
  label: string;
  english: string;
  key: string;
  category: string;
  cantonese: string;
}

// Helper to generate a key from English name
const generateKey = (english: string): string => {
  return english
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '')
    .replace(/\(.*?\)/g, '');
};

// Helper to determine category based on relationship properties
const getCategoryFromRelationship = (relationship: FamilyRelationship): string => {
  const { english, generation } = relationship;
  
  // Determine the detailed category first
  let detailedCategory: string;
  
  if (english === 'Father' || english === 'Mother') {
    detailedCategory = 'Parents';
  } else if (english.includes('brother') && !english.includes("'s")) {
    detailedCategory = 'Siblings';
  } else if (english.includes('sister') && !english.includes("'s")) {
    detailedCategory = 'Siblings';
  } else if (english === 'Son' || english === 'Daughter') {
    detailedCategory = 'Children';
  } else if (english === 'Husband' || english === 'Wife') {
    detailedCategory = 'Spouse';
  } else if (english.includes('grandfather') || english.includes('grandmother')) {
    detailedCategory = 'Grandparents';
  } else if (english.includes('Father-in-law') || english.includes('Mother-in-law')) {
    detailedCategory = 'Spouse\'s Family';
  } else if (english.includes('cousin')) {
    detailedCategory = 'Cousins';
  } else if (english.includes('Nephew') || english.includes('Niece')) {
    detailedCategory = 'Nephews & Nieces';
  } else if (english.includes('Brother\'s wife') || english.includes('Sister\'s husband')) {
    detailedCategory = 'In-Laws';
  } else if ((english.includes('uncle') || english.includes('aunt') || 
              english.includes('Father\'s') || english.includes('Mother\'s')) && 
              generation === 1) {
    detailedCategory = 'Uncles & Aunts';
  } else {
    detailedCategory = 'Extended Family';
  }
  
  // Map to simplified categories
  if (['Parents', 'Siblings', 'Children', 'Spouse'].includes(detailedCategory)) {
    return 'Immediate Family';
  } else if (['In-Laws', 'Spouse\'s Family'].includes(detailedCategory)) {
    return 'In-Laws';
  } else if (detailedCategory === 'Cousins') {
    return 'Cousins';
  } else {
    return 'Extended Family';
  }
};

// Generate relationship buttons directly from data
const generateRelationButtons = (): RelationButton[] => {
  // Filter to common relationships based on generation
  // Include close family and extended family (up to 2nd degree)
  return familyRelationships
    .filter(rel => {
      // Keep only the most common/important relationships
      const isCommonRelationship = 
        // Basic family members
        ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife'].includes(rel.english) ||
        // Siblings
        ['Elder brother', 'Elder sister', 'Younger brother', 'Younger sister'].includes(rel.english) ||
        // Grandparents
        ['Paternal grandfather', 'Paternal grandmother', 'Maternal grandfather', 'Maternal grandmother'].includes(rel.english) ||
        // Basic aunt/uncle relationships (first degree)
        rel.english.includes("Father's") || rel.english.includes("Mother's") ||
        // In-laws (first degree)
        rel.english.includes("Brother's") || rel.english.includes("Sister's") ||
        rel.english.includes("-in-law") ||
        // Cousins (common ones)
        (rel.english.includes("cousin") && rel.generation === 0) ||
        // Nephews & nieces
        rel.english.includes("Nephew") || rel.english.includes("Niece");
        
      return isCommonRelationship;
    })
    .map(rel => {
      // Create label - special handling for Father/Mother to avoid duplicating Cantonese
      let label = rel.english;
      if (rel.english === 'Father') {
        label = `Father (${rel.cantonese})`;
      } else if (rel.english === 'Mother') {
        label = `Mother (${rel.cantonese})`;
      }
      
      // Determine category
      const category = getCategoryFromRelationship(rel);
      
      return {
        label,
        english: rel.english,
        key: generateKey(rel.english),
        category,
        // Add Cantonese directly to the button data to avoid lookup
        cantonese: rel.cantonese
      };
    });
};

// Define the order of categories for display
const categoryOrder = [
  'Immediate Family',
  'Extended Family',
  'In-Laws',
  'Cousins'
];

// Generate and group buttons by category
const relationButtons = generateRelationButtons();
const groupedButtons = relationButtons.reduce((acc, button) => {
  if (!acc[button.category]) {
    acc[button.category] = [];
  }
  acc[button.category].push(button);
  return acc;
}, {} as Record<string, RelationButton[]>);

export default function RelationshipCalculator() {
  const [path, setPath] = useState<string[]>([]);
  const [result, setResult] = useState<FamilyRelationship | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Immediate Family');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    calculateRelationship();
  }, [path]);

  const addRelation = (relation: string) => {
    setPath([...path, relation]);
  };

  const resetCalculator = () => {
    setPath([]);
    setResult(null);
    setError(null);
  };

  const calculateRelationship = () => {
    if (path.length === 0) {
      setResult(null);
      setError(null);
      return;
    }
    
    // Get the direct match based on the selected relationships
    let searchTerm = '';
    
    if (path.length === 1) {
      // Single relationship - direct match
      searchTerm = path[0];
    } else {
      // Multiple relationships - build the proper search term
      searchTerm = path.join('\'s ').replace(/ 's /g, '\'s ');
    }
    
    // Use the existing helper function to find the relationship
    const results = searchRelationships(searchTerm);
    
    // First try an exact match
    let matchingRelationship = results.find(rel => 
      rel.english.toLowerCase() === searchTerm.toLowerCase()
    );
    
    // If no exact match, try matching by notes field
    if (!matchingRelationship) {
      matchingRelationship = results.find(rel => 
        rel.notes && rel.notes.toLowerCase() === searchTerm.toLowerCase()
      );
    }
    
    // If still no match, use the first result if available
    if (!matchingRelationship && results.length > 0) {
      matchingRelationship = results[0];
    }

    if (matchingRelationship) {
      setResult(matchingRelationship);
      setError(null);
    } else {
      setResult(null);
      setError(`No term found for this relationship: ${searchTerm}`);
    }
  };

  // Audio playback function
  const playPronunciation = () => {
    if (!result?.pinyin) return;
    
    // Cancel any current playback
    window.speechSynthesis.cancel();
    setIsPlaying(true);
    
    // Play standard pinyin first
    const standardPinyin = new SpeechSynthesisUtterance(result.pinyin);
    standardPinyin.lang = 'zh-HK';
    standardPinyin.rate = 0.8;
    
    // If there's a different colloquial pinyin, queue it after standard
    if (result.yuePinyin && result.yue !== result.cantonese) {
      standardPinyin.onend = () => {
        setTimeout(() => {
          const colloquialPinyin = new SpeechSynthesisUtterance(result.yuePinyin);
          colloquialPinyin.lang = 'zh-HK';
          colloquialPinyin.rate = 0.8;
          colloquialPinyin.onend = () => setIsPlaying(false);
          window.speechSynthesis.speak(colloquialPinyin);
        }, 300);
      };
    } else {
      standardPinyin.onend = () => setIsPlaying(false);
    }
    
    standardPinyin.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(standardPinyin);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-3 sm:p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">Relationship Calculator</h2>
        <button 
          onClick={() => setShowInstructions(!showInstructions)}
          className="text-blue-600 text-base flex items-center"
        >
          {showInstructions ? 'Hide' : 'Help'} 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {showInstructions && (
        <p className="text-base text-gray-600 mb-3">
          Build a family relationship by adding connections starting from you.
        </p>
      )}

      {/* Result display with compact layout */}
      {result ? (
        <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-green-700">
              {result.cantonese}
              {result.yue && result.yue !== result.cantonese && (
                <span className="text-xl text-blue-600 ml-2 font-normal">
                  (spoken: <span className="font-medium">{result.yue}</span>)
                </span>
              )}
            </div>
            <div className="flex items-center">
              <button 
                onClick={playPronunciation}
                className={`p-2 rounded-full ${isPlaying 
                  ? 'bg-blue-200 text-blue-600 animate-pulse' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-2 text-base">
            <span className="text-gray-700 font-medium">English: </span>
            <span>{result.english}</span>
          </div>
          
          {result.notes && (
            <div className="mt-1 text-sm text-gray-600">
              {result.notes}
            </div>
          )}
        </div>
      ) : error ? (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-base text-red-700">{error}</p>
        </div>
      ) : null}

      {/* Current path with compact display */}
      <div className="mb-3 p-2 bg-gray-50 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h3 className="text-base font-medium text-gray-700">Current Path:</h3>
            <button
              onClick={resetCalculator}
              className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-md text-sm font-medium hover:bg-red-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Reset
            </button>
          </div>
        </div>
        {path.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {path.map((relation, index) => (
              <span key={index} className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                {relation}
                {index < path.length - 1 && <span className="text-blue-600">&#39;s</span>}
                <button 
                  onClick={() => {
                    const newPath = [...path];
                    newPath.splice(index, 1);
                    setPath(newPath);
                  }}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  aria-label={`Remove ${relation}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Select a family member below to start.</p>
        )}
      </div>

      {/* Category tabs - horizontal scrolling on mobile */}
      <div className="mb-3 overflow-x-auto pb-1 -mx-3 px-3">
        <div className="flex space-x-2 min-w-max">
          {categoryOrder.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 rounded-md text-base font-medium whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Relationship selection buttons - compact grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {groupedButtons[activeCategory]?.map((button) => {
          
          
          return (
            <button
              key={button.key}
              onClick={() => addRelation(button.english)}
              className="relative group p-2 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-200 text-center h-24 flex flex-col items-center justify-center"
            >
              <div className="text-sm font-medium text-gray-800 line-clamp-2">{button.label}</div>
              { button.cantonese && (
                <div className="text-lg font-bold text-blue-700 mt-1">{button.cantonese}</div>
              )}
              <div className="absolute top-0.5 right-0.5 bg-blue-100 text-blue-800 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
} 