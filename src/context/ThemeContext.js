'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // State for the user's selected mode: 'dark', 'light', or 'system'
  const [mode, setMode] = useState('system');
  
  // State for the actual active visual theme: 'dark' or 'light'
  const [resolvedTheme, setResolvedTheme] = useState('dark');

  const themes = {
    dark: {
      primary: '#0B0B0F',
      accent: '#E50914',
      text: '#EAEAEA',
      muted: '#9CA3AF',
      border: '#1F2937',
    },
    light: {
      primary: '#FFFFFF',
      accent: '#E50914',
      text: '#111827',
      muted: '#6B7280',
      border: '#E5E7EB',
    },
  };

  // 1. Load saved mode from LocalStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('site-theme-mode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // 2. Resolve the actual theme (Light vs Dark) based on Mode & System Preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let nextTheme = 'dark'; // Default fallback

      if (mode === 'system') {
        nextTheme = mediaQuery.matches ? 'dark' : 'light';
      } else {
        nextTheme = mode;
      }

      setResolvedTheme(nextTheme);

      // Update HTML class for Tailwind/Global CSS
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(nextTheme);
    };

    applyTheme();

    // Listen for system changes if in 'system' mode
    if (mode === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
    }

    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [mode]);

  // 3. Cycle: Dark -> Light -> System
  const toggleTheme = () => {
    setMode((prev) => {
      let next;
      if (prev === 'dark') next = 'light';
      else if (prev === 'light') next = 'system';
      else next = 'dark';
      
      localStorage.setItem('site-theme-mode', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,             // 'dark' | 'light' | 'system'
        theme: resolvedTheme, // 'dark' | 'light' (The actual visual look)
        colors: themes[resolvedTheme],
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);