'use client'
import React, { useState, useContext, createContext, ReactNode } from 'react';
import { ProjectsCatsIds } from '../interfaces/IProject';


type modules = { nums: number, font: string, x: number; y: number; s: number, r: number };

interface FiltersI {
  category: ProjectsCatsIds;
  listView: {
    order: "alph-asc" | "alph-desc",
    isExpanded: boolean;
  },
  dynamicView: {
    style: "titles" | "images",
    velocity: number
  }
}

const initialFiltersValues: FiltersI = {
  category: "all",
  listView: {
    order: 'alph-asc',
    isExpanded: false
  },
  dynamicView: {
    style: "images",
    velocity: 1
  }
}

// Create a context for managing filter settings
const GlobalContext = createContext<{
  filters: FiltersI;
  setFilters: React.Dispatch<React.SetStateAction<FiltersI>>;
  fixedTexts: modules[] | [];
  setFixedTexts: React.Dispatch<React.SetStateAction<modules[]>>;
}>({
  filters: initialFiltersValues,
  setFilters: () => {},
  fixedTexts: [],
  setFixedTexts: () => {}
});

interface IGlobalProvider {
    children: ReactNode
}
// Create a provider component to wrap your application and provide access to the filter context
export const GlobalProvider: React.FC<IGlobalProvider> = ({ children }) => {
  const [filters, setFilters] = useState<FiltersI>(initialFiltersValues);
  const [fixedTexts, setFixedTexts] = useState<modules[]>([]);

  return (
    <GlobalContext.Provider value={{ filters, setFilters, fixedTexts, setFixedTexts }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to access filter context
export const useGlobalContext = () => useContext(GlobalContext);


