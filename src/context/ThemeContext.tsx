'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Apply theme class to html element
  const applyTheme = (newTheme: Theme) => {
    if (!isBrowser) return;
    
    try {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        console.log('Dark mode enabled');
      } else {
        document.documentElement.classList.remove('dark');
        console.log('Light mode enabled');
      }
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  };

  // On mount, read the preference from localStorage and set the theme accordingly
  useEffect(() => {
    if (!isBrowser) return;
    
    try {
      setMounted(true);
      let initialTheme: Theme = 'light';
      
      // Try to get stored theme
      try {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || storedTheme === 'light') {
          initialTheme = storedTheme;
        }
      } catch (e) {
        console.warn('Failed to access localStorage:', e);
      }
      
      // If no stored theme, check system preference
      if (initialTheme === 'light') {
        try {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            initialTheme = 'dark';
          }
        } catch (e) {
          console.warn('Failed to check media query:', e);
        }
      }
      
      setTheme(initialTheme);
      applyTheme(initialTheme);
    } catch (error) {
      console.error('Error in ThemeProvider useEffect:', error);
    }
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      
      // Try to store in localStorage but don't fail if it's not available
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {
        console.warn('Failed to save theme preference:', e);
      }
      
      applyTheme(newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  // Provide a value object that doesn't change on each render unless theme changes
  const contextValue = React.useMemo(() => {
    return { theme, toggleTheme };
  }, [theme]);

  // Use a separate component for first render
  if (!mounted) {
    return (
      <ThemeContext.Provider value={contextValue}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 