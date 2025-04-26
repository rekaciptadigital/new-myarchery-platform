"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// Updated import path to match the new architecture
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context";
import OrganizerSidebar from "./OrganizerSidebar";

interface OrganizerLayoutContentProps {
  children: ReactNode;
}

// This component has access to sidebar context and adjusts the layout accordingly
function OrganizerLayoutContent({ children }: Readonly<OrganizerLayoutContentProps>) {
  const { isCollapsed, isHidden } = useSidebar(); // Remove isHovering from here
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Skip initial animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate the appropriate margin based on sidebar state
  const getMainMarginClass = () => {
    if (isHidden) return "ml-1"; // Simplified - just check if hidden
    if (isCollapsed) return "ml-16";
    return "ml-64";
  };

  const marginClass = getMainMarginClass();
  const transitionClasses = initialLoad ? "" : "transition-all duration-200 ease-out";
  
  return (
    <main className={`flex-1 ${marginClass} p-6 ${transitionClasses}`}>
      {children}
    </main>
  );
}

interface OrganizerLayoutProps {
  children: ReactNode;
}

export function OrganizerLayout({ children }: Readonly<OrganizerLayoutProps>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/organizer/login";

  // If we're on the login page, don't show the sidebar layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For all other organizer pages, show the sidebar layout
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50">
        <OrganizerSidebar />
        <OrganizerLayoutContent>
          {children}
        </OrganizerLayoutContent>
      </div>
    </SidebarProvider>
  );
}
