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
    <div className="w-full rounded-xl overflow-hidden">
      {/* Calculator Display Area */}
      <div className="bg-sky-100 p-3 sm:p-4 text-sky-900">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg sm:text-xl font-bold">Relationship Path</h2>
          <button 
            onClick={resetCalculator}
            className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-full text-sm"
          >
            Clear
          </button>
        </div>
        
        {/* Path Display */}
        <div className="min-h-[60px] bg-white rounded-lg shadow-sm p-2 sm:p-3 mb-3">
          {path.length > 0 ? (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {path.map((item, index) => (
                <span key={index} className="bg-sky-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm inline-block text-sky-800">
                  {item}{index < path.length - 1 && "'s"}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm sm:text-base">Select family relations below</p>
          )}
        </div>
        
        {/* Result Display */}
        {result && (
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-2">
            <div className="flex justify-between items-center">
              <div className="w-full">
                <h3 className="text-base sm:text-lg font-bold mb-1 text-sky-700">Result</h3>
                <div className="text-xl sm:text-2xl font-bold mb-1 text-sky-900">
                  {result.cantonese}
                  <button
                    onClick={() => playPronunciation()}
                    disabled={isPlaying}
                    className="ml-2 p-1.5 sm:p-2 rounded-full bg-sky-200 hover:bg-sky-300 disabled:opacity-50 text-sky-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                {result.yue && result.yue !== result.cantonese && (
                  <div className="text-base sm:text-lg font-bold text-sky-700 mb-1">
                    {result.yue}
                    <button
                      onClick={() => {
                        if (result.yuePinyin) {
                          const colloquialPinyin = new SpeechSynthesisUtterance(result.yuePinyin);
                          colloquialPinyin.lang = 'zh-HK';
                          colloquialPinyin.rate = 0.8;
                          window.speechSynthesis.speak(colloquialPinyin);
                        }
                      }}
                      className="ml-2 p-1.5 sm:p-2 rounded-full bg-sky-200 hover:bg-sky-300 text-sky-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
                <div className="text-xs sm:text-sm text-gray-600">
                  {result.english}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-600 p-2 sm:p-3 rounded-lg border border-red-200 text-sm">
            {error}
          </div>
        )}
      </div>
      
      {/* Category Tabs */}
      <div className="bg-white dark:bg-gray-100 p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 mb-3 sm:mb-4">
          {categoryOrder.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium ${
                activeCategory === category
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Relation Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {groupedButtons[activeCategory]?.map((button) => (
            <button
              key={button.key}
              onClick={() => addRelation(button.english)}
              className="bg-white border border-gray-200 p-2 sm:p-4 rounded-xl shadow-sm hover:bg-sky-50 hover:border-sky-200 transition-colors text-left"
            >
              <div className="text-base sm:text-lg font-medium text-sky-800">{button.cantonese}</div>
              <div className="text-xs sm:text-sm text-gray-500 line-clamp-1">{button.english}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 