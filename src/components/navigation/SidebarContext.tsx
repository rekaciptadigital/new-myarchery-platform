"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Use useMemo to prevent the context value from being recreated on every render
  const value = useMemo(() => ({
    isCollapsed,
    isHidden,
    setIsCollapsed,
    setIsHidden
  }), [isCollapsed, isHidden]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}