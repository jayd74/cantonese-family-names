import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Cantonese Family Names</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Helping English speakers properly address their Cantonese elders and family members.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              Home
            </Link>
            <Link href="/search" className="text-blue-600 dark:text-blue-400 hover:underline">
              Search
            </Link>
            <Link href="/guide" className="text-blue-600 dark:text-blue-400 hover:underline">
              Guide
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cantonese Family Names. All rights reserved.</p>
          <p className="mt-2">
            Built with ❤️ for the Cantonese community.
          </p>
        </div>
      </div>
    </footer>
  );
} 