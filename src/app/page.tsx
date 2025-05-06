import RelationshipCalculator from '@/components/RelationshipCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">Cantonese Family Names</h1>
        <RelationshipCalculator />
      </div>
    </main>
  );
}
