"use client";

import { ReactNode } from "react";
// Updated import path to match the new architecture
import { SidebarProvider } from "@/contexts/sidebar-context";
import OrganizerSidebar from "./OrganizerSidebar";

interface OrganizerLayoutProps {
  children: ReactNode;
}

export function OrganizerLayout({ children }: Readonly<OrganizerLayoutProps>) {
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
