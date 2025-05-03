import RelationshipCalculator from '@/components/RelationshipCalculator';

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Family Relationship Calculator</h1>
        <p className="text-center text-gray-600 mb-8">
          Build family relationships step by step to find the correct Cantonese terms.
        </p>
        <RelationshipCalculator />
      </div>
    </main>
  );
} 