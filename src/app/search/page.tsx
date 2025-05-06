import RelationshipSearch from '@/components/RelationshipSearch';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 p-2 sm:p-4">
      {/* On mobile: No container, full width search */}
      <div className="block sm:hidden w-full">
        <RelationshipSearch />
      </div>
      
      {/* On tablet/desktop: Contained search with max width */}
      <div className="hidden sm:block">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden p-6">
          <RelationshipSearch />
        </div>
      </div>
    </main>
  );
} 