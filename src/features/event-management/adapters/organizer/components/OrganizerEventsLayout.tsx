import { ReactNode } from "react";
import { SidebarProvider } from "@/contexts/sidebar-context";
import OrganizerSidebar from "@/features/dashboard/adapters/organizer/components/OrganizerSidebar";

interface OrganizerEventsLayoutProps {
  children: ReactNode;
}

// Using default export instead of named export
export default function OrganizerEventsLayout({ children }: Readonly<OrganizerEventsLayoutProps>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 flex relative overflow-x-hidden">
        <OrganizerSidebar />
        <main className="w-full">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}