"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/contexts/sidebar-context";
import dynamic from "next/dynamic";
import { SidebarLoader } from "@/components/ui/sidebar/SidebarLoader";

// Dynamic import of the organizer sidebar
const OrganizerSidebar = dynamic(
  () => import("@/features/dashboard/adapters/organizer/components/OrganizerSidebar").then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <SidebarLoader /> 
  }
);

interface OrganizerScoringLayoutProps {
  children: ReactNode;
}

export function OrganizerScoringLayout({ children }: Readonly<OrganizerScoringLayoutProps>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50">
        <OrganizerSidebar />
        <main className="flex-1 ml-16 md:ml-64 p-6 transition-all duration-200">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}