"use client";

import Sidebar from "@/components/navigation/Sidebar";
import { SidebarProvider, useSidebar } from "@/components/navigation/SidebarContext";
import { useEffect, useState } from "react";

// MainContent component that adjusts spacing based on sidebar state
function MainContent({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isCollapsed, isHidden } = useSidebar();
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Set initial load to false after first render
  useEffect(() => {
    // Skip initial animation by setting initialLoad to false after a very short delay
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate classes for main content
  const getMainContentClasses = () => {
    // Base classes that are always applied
    let classes = "min-h-screen p-6 md:p-8 w-full ";
    
    // Determine left margin based on sidebar state
    if (!isHidden) {
      classes += isCollapsed ? "ml-16 " : "ml-64 ";
    } else {
      classes += "ml-1 ";
    }
    
    // Determine if we should apply transitions
    // Don't apply transitions on initial load to prevent unwanted animations
    if (!initialLoad) {
      classes += "transition-all duration-200 ease-out ";
    }
    
    return classes;
  };

  return (
    <main 
      className={getMainContentClasses()}
      style={{ willChange: "margin" }} // Optimize for animations
    >
      {children}
    </main>
  );
}

// Main layout wrapper that provides the sidebar context
export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 flex relative overflow-x-hidden">
        <Sidebar />
        <MainContent>
          {children}
        </MainContent>
      </div>
    </SidebarProvider>
  );
}