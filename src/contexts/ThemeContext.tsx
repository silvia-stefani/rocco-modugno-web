import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { IThemes, themes } from '../models/themes';
import { hexToRGB } from '../utils/hexToRgb';

interface ThemeContextProps {
  currentTheme: IThemes;
  nextTheme: IThemes;
  toggleTheme: () => void;
}

const initialTheme = {
  currentTheme: themes[0],
  nextTheme: themes[1],
  toggleTheme: () => {}
}

const ThemeContext = createContext<ThemeContextProps>(initialTheme);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const toggleTheme = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    setCurrentThemeIndex(nextIndex);
  };

  const currentTheme = themes[currentThemeIndex];
  const nextTheme = currentThemeIndex === themes.length - 1 ? themes[0] : themes[(currentThemeIndex + 1) % themes.length];

  const handleThemeChange = (selectedTheme: IThemes) => {
    const root = document.body;
    root.style.setProperty('--primary', selectedTheme.colors.primary);
    root.style.setProperty('--primary-rgb', hexToRGB(selectedTheme.colors.primary));
    root.style.setProperty('--text', selectedTheme.colors.text);
    root.style.setProperty('--text-rgb', hexToRGB(selectedTheme.colors.text));
    root.style.setProperty('--bg', selectedTheme.colors.bg);
    root.style.setProperty('--bg-rgb', hexToRGB(selectedTheme.colors.bg));
  };

  useEffect(() => handleThemeChange(currentTheme), [currentTheme])
  
  const value: ThemeContextProps = {
    currentTheme,
    nextTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
