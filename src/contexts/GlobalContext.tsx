'use client'
import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { ProjectsCatsIds } from '../interfaces/IProject';
import useBreakpoints from 'hooks/useBreakpoints';


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
  currentView: 'points' | 'list';
  scrollPosition: number;
  setCurrentView: (view: 'points' | 'list') => void;
}>({
  filters: initialFiltersValues,
  setFilters: () => {},
  fixedTexts: [],
  setFixedTexts: () => {},
  currentView: "points",
  setCurrentView: () => {},
  scrollPosition: 0,
});

interface IGlobalProvider {
    children: ReactNode
}
// Create a provider component to wrap your application and provide access to the filter context
export const GlobalProvider: React.FC<IGlobalProvider> = ({ children }) => {
  const [filters, setFilters] = useState<FiltersI>(initialFiltersValues);
  const [fixedTexts, setFixedTexts] = useState<modules[]>([]);
  const [currentView, setCurrentView] = useState<'points' | 'list'>('points');
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { smallDevice } = useBreakpoints();

  useEffect(() => {
    if(smallDevice) { 
      setCurrentView("list") 
    } else {
      setCurrentView("points");
    }
  }, [smallDevice]);

  useEffect(() => {
    setScrollPosition(window.scrollY);
  }, [window.scrollY]);

  return (
    <GlobalContext.Provider value={{ filters, setFilters, fixedTexts, setFixedTexts, currentView, setCurrentView, scrollPosition }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to access filter context
export const useGlobalContext = () => useContext(GlobalContext);


