import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeDebug from "@/components/ThemeDebug";
import ErrorLogger from "@/components/ErrorLogger";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cantonese Family Addressing Guide",
  description: "Learn how to properly address your family members in Cantonese",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col transition-colors`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow bg-gray-50 dark:bg-gray-800 dark:text-white transition-colors">
            <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
          <Footer />
          <ThemeDebug />
          <ErrorLogger />
        </ThemeProvider>
      </body>
    </html>
  );
}
