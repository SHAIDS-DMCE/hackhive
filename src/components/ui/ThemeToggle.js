'use client';
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full border transition-all duration-300 hover:scale-110"
      style={{
        backgroundColor: colors.primary,
        borderColor: colors.accent,
        color: colors.text
      }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="transition-all duration-300" />
      ) : (
        <Moon size={20} className="transition-all duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
