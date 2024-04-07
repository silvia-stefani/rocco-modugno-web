import React, { useState, useContext, createContext, ReactNode } from 'react';
import { ProjectsCatsType } from '../interfaces/IProject';


type modules = { nums: number, font: string, x: number; y: number; s: number, r: number };

interface FilterSettings {
  category: ProjectsCatsType;
}

// Create a context for managing filter settings
const GlobalContext = createContext<{
  filters: FilterSettings;
  setFilters: React.Dispatch<React.SetStateAction<FilterSettings>>;
  fixedTexts: modules[] | [];
  setFixedTexts: React.Dispatch<React.SetStateAction<modules[]>>;
}>({
  filters: { category: 'all' },
  setFilters: () => {},
  fixedTexts: [],
  setFixedTexts: () => {}
});

interface IGlobalProvider {
    children: ReactNode
}
// Create a provider component to wrap your application and provide access to the filter context
export const GlobalProvider: React.FC<IGlobalProvider> = ({ children }) => {
  const [filters, setFilters] = useState<FilterSettings>({
    category: 'all'
  });
  const [fixedTexts, setFixedTexts] = useState<modules[]>([]);

  return (
    <GlobalContext.Provider value={{ filters, setFilters, fixedTexts, setFixedTexts }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to access filter context
export const useGlobalContext = () => useContext(GlobalContext);


