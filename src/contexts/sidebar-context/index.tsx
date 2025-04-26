"use client";

import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  isHidden: boolean;
  setIsCollapsed: (value: boolean) => void;
  setIsHidden: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  isHidden: false,
  setIsCollapsed: () => {},
  setIsHidden: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: Readonly<{ children: ReactNode }>) {
  // Initialize with default values, these will be immediately overridden 
  // by localStorage values if they exist (in the useEffect)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Custom setters to update localStorage
  const updateIsCollapsed = (value: boolean) => {
    setIsCollapsed(value);
    localStorage.setItem('myarchery-sidebar-collapsed', String(value));
  };

  const updateIsHidden = (value: boolean) => {
    setIsHidden(value);
    localStorage.setItem('myarchery-sidebar-hidden', String(value));
  };

  // Load saved preferences from localStorage on initial render
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedCollapsed = localStorage.getItem('myarchery-sidebar-collapsed');
      const savedHidden = localStorage.getItem('myarchery-sidebar-hidden');
      
      // Only update if values exist in localStorage
      if (savedCollapsed !== null) {
        setIsCollapsed(savedCollapsed === 'true');
      }
      
      if (savedHidden !== null) {
        setIsHidden(savedHidden === 'true');
      }
    }
  }, []);

  // Use useMemo to prevent the context value from being recreated on every render
  const value = useMemo(() => ({
    isCollapsed,
    isHidden,
    setIsCollapsed: updateIsCollapsed,
    setIsHidden: updateIsHidden
  }), [isCollapsed, isHidden]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}
