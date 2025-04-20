"use client";

import Sidebar from "@/components/navigation/Sidebar";
import { SidebarProvider, useSidebar } from "@/components/navigation/SidebarContext";
import { useEffect, useState } from "react";

// MainContent component that adjusts spacing based on sidebar state
function MainContent({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isCollapsed, isHidden } = useSidebar();
  const [isHovering, setIsHovering] = useState(false);
  
  // Calculate margin based on sidebar state
  const getMarginClass = () => {
    if (isHidden && !isHovering) {
      return "ml-2"; // Almost no margin when sidebar is hidden
    } else if (isCollapsed) {
      return "ml-16"; // Small margin when sidebar is collapsed
    } else {
      return "ml-64"; // Full margin when sidebar is expanded
    }
  };

  // Listen for hover state from the sidebar
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If sidebar is hidden, check if mouse is near left edge to show hover state
      if (isHidden && e.clientX < 10) {
        setIsHovering(true);
      } else if (isHidden && e.clientX > 64) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHidden]);

  return (
    <main 
      className={`transition-all duration-300 ease-in-out min-h-screen ${getMarginClass()}`}
    >
      <div className="p-6 md:p-8">
        {children}
      </div>
    </main>
  );
}

// Main layout wrapper that provides the sidebar context
export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50">
        <Sidebar />
        <MainContent>
          {children}
        </MainContent>
      </div>
    </SidebarProvider>
  );
}