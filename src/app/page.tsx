import RelationshipCalculator from '@/components/RelationshipCalculator';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Cantonese Family Relationship Calculator</h1>
          <p className="text-lg text-gray-600 mb-6">
            Build family relationships to find the correct Cantonese terms
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/search" 
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Direct Search
            </Link>
            <Link 
              href="/guide" 
              className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              View Guide
            </Link>
          </div>
        </div>
        
        <RelationshipCalculator />
      </div>
    </main>
  );
}
