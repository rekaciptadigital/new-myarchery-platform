"use client";

import { SidebarProvider } from "@/contexts/sidebar-context";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Conditional imports for role-specific sidebars
import dynamic from "next/dynamic";

// Simple SidebarLoader component
function SidebarLoader() {
  return (
    <div className="h-screen w-16 md:w-64 bg-white border-r border-slate-200 animate-pulse">
      <div className="h-16 border-b border-slate-200"></div>
      <div className="p-4">
        <div className="h-8 bg-slate-200 rounded mb-4"></div>
        <div className="h-8 bg-slate-200 rounded mb-4"></div>
        <div className="h-8 bg-slate-200 rounded mb-4"></div>
        <div className="h-8 bg-slate-200 rounded mb-4"></div>
        <div className="h-8 bg-slate-200 rounded mb-4"></div>
      </div>
    </div>
  );
}

// Update the dynamic import with loading component
const OrganizerSidebar = dynamic(
  () => import("@/features/dashboard/adapters/organizer/components/OrganizerSidebar").then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <SidebarLoader /> 
  }
);

// You can add other role sidebars as needed
// const AdminSidebar = dynamic(
//   () => import("@/features/dashboard/adapters/admin/components/AdminSidebar"),
//   { ssr: false }
// );

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  // Determine which role sidebar to show based on pathname
  const getLayoutForPath = () => {
    if (pathname?.startsWith("/organizer")) {
      return "organizer";
    } else if (pathname?.startsWith("/admin")) {
      return "admin";
    } else if (pathname?.startsWith("/customer")) {
      return "customer";
    }
    return null;
  };

  const currentRole = getLayoutForPath();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show appropriate sidebar based on the role path
  const renderSidebar = () => {
    if (!isClient) return null;

    // Replace switch with if/else if statements for better readability
    if (currentRole === "organizer") {
      return <OrganizerSidebar />;
    } else if (currentRole === "admin") {
      // Uncomment when AdminSidebar is implemented
      // return <AdminSidebar />;
      return null;
    } else if (currentRole === "customer") {
      // Uncomment when CustomerSidebar is implemented
      // return <CustomerSidebar />;
      return null;
    } else {
      return null;
    }
  };

  // Only render the sidebar if we're on a role-specific path
  const shouldRenderSidebar = currentRole !== null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50">
        {shouldRenderSidebar && renderSidebar()}
        <main className={`flex-1 transition-all duration-200 p-6 ${shouldRenderSidebar ? 'md:ml-64 ml-16' : ''}`}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}