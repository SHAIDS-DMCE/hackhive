"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const colors = {
    dark: {
      primary: "#1B1718", // 60% - primary background, sections, containers
      accent: "#C4161C", // 30% - accent color for highlights, headings, CTAs
      text: "#F2F3F4", // 10% - text, icons, subtle outlines
    },
    light: {
      primary: "#FCEDED", // 60% - primary background
      accent: "#DA2F35", // 30% - accent highlights, buttons
      text: "#586068", // 10% - text, icons, borders
    },
  };

  const currentColors = isDark ? colors.dark : colors.light;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const value = {
    isDark,
    colors: currentColors,
    toggleTheme,
    allColors: colors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
