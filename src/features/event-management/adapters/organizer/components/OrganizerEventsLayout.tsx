"use client";

import { ReactNode, useEffect, useState } from "react";
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context";
import OrganizerSidebar from "@/features/dashboard/adapters/organizer/components/OrganizerSidebar";

interface OrganizerEventsContentProps {
  children: ReactNode;
}

// This component has access to sidebar context and adjusts the layout accordingly
function OrganizerEventsContent({ children }: Readonly<OrganizerEventsContentProps>) {
  const { isCollapsed, isHidden } = useSidebar();
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Skip initial animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate the appropriate margin based on sidebar state
  // Must match with sidebar width calculations
  const getMainMarginClass = () => {
    if (isHidden) return "ml-1"; // For hidden sidebar
    if (isCollapsed) return "ml-16"; // For collapsed sidebar
    return "ml-64"; // Default expanded state
  };

  const marginClass = getMainMarginClass();
  const transitionClasses = initialLoad ? "" : "transition-all duration-200 ease-out";
  
  return (
    <main className={`flex-1 ${marginClass} p-6 ${transitionClasses}`} style={{ willChange: "margin" }}>
      {children}
    </main>
  );
}

interface OrganizerEventsLayoutProps {
  children: ReactNode;
}

/**
 * Event management layout for organizers.
 * IMPORTANT: This layout should be consistent with the main OrganizerLayout from dashboard feature.
 * Any changes here should be coordinated with the dashboard implementation.
 */
export default function OrganizerEventsLayout({ children }: Readonly<OrganizerEventsLayoutProps>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50">
        <OrganizerSidebar />
        <OrganizerEventsContent>
          {children}
        </OrganizerEventsContent>
      </div>
    </SidebarProvider>
  );
}