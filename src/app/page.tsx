import RelationshipCalculator from '@/components/RelationshipCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 p-2 sm:p-4">
      {/* On mobile: No container, full width calculator */}
      <div className="block sm:hidden w-full">
        <h1 className="text-2xl font-bold text-center text-sky-600 dark:text-sky-300 mb-4">Cantonese Family Names</h1>
        <RelationshipCalculator />
      </div>
      
      {/* On tablet/desktop: Contained calculator with max width */}
      <div className="hidden sm:block">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-center text-sky-600 dark:text-sky-300 mb-4">Cantonese Family Names</h1>
            <div className="calculator-container">
              <RelationshipCalculator />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
