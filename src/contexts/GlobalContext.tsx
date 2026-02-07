'use client'
import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { ProjectsCatsIds } from '../interfaces/IProject';
import useBreakpoints from 'hooks/useBreakpoints';

/**
 * Type definition for a stamped generative module.
 */
type modules = {
  nums: number;
  font: string;
  x: number;
  y: number;
  s: number;
  r: number
};

/**
 * Interface for the application's global filtering and view settings.
 */
interface FiltersI {
  category: ProjectsCatsIds; // Active project category filter
  listView: {
    order: "alph-asc" | "alph-desc", // Alphabetical sorting order
    isExpanded: boolean;            // Whether list items are expanded to show details
  },
  dynamicView: {
    style: "titles" | "images",     // Visual style of the dynamic/points view
    velocity: number,               // Velocity of moving elements (if applicable)
    cohesion: number,
    alignment: number,
    separation: number
  }
}

/**
 * Initial values for the filters and view settings.
 */
const initialFiltersValues: FiltersI = {
  category: "all",
  listView: {
    order: 'alph-asc',
    isExpanded: false
  },
  dynamicView: {
    style: "images",
    velocity: 0.8,
    cohesion: 0.8,
    alignment: -0.8,
    separation: 0.9
  }
}

/**
 * GlobalContext defines the shared state for the entire application.
 * It tracks project filters, stamped modules (fixedTexts), and the current active view.
 */
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
  setFilters: () => { },
  fixedTexts: [],
  setFixedTexts: () => { },
  currentView: "points",
  setCurrentView: () => { },
  scrollPosition: 0,
});

interface IGlobalProvider {
  children: ReactNode
}

/**
 * GlobalProvider component that wraps the application and manages the shared state.
 */
export const GlobalProvider: React.FC<IGlobalProvider> = ({ children }) => {
  const [filters, setFilters] = useState<FiltersI>(initialFiltersValues);
  const [fixedTexts, setFixedTexts] = useState<modules[]>([]);
  const [currentView, setCurrentView] = useState<'points' | 'list'>('points');
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { smallDevice } = useBreakpoints();

  // Automatically switch to 'list' view on small devices (mobile)
  useEffect(() => {
    if (smallDevice) {
      setCurrentView("list")
    } else {
      setCurrentView("points");
    }
  }, [smallDevice]);

  // Track the window scroll position for potential parallax or UI effects
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <GlobalContext.Provider value={{ filters, setFilters, fixedTexts, setFixedTexts, currentView, setCurrentView, scrollPosition }}>
      {children}
    </GlobalContext.Provider>
  );
};

/**
 * Custom hook to easily access the global context in functional components.
 */
export const useGlobalContext = () => useContext(GlobalContext);



