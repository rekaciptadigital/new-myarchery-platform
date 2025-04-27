"use client";

import { BarChart, Calendar, Home, Users, Map, Target, Settings, FileText, DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// Updated import path to match the new architecture
import { useSidebar } from "@/contexts/sidebar-context";
import { 
  SidebarToggleButton, 
  SidebarLogo, 
  MobileMenuButton 
} from "@/components/ui/sidebar/SidebarComponents";

// Define organizer-specific navigation items with correct routing paths
const navItems = [
  { label: "Dashboard", href: "/organizer/dashboard", icon: <Home size={20} /> },
  { label: "Event Management", href: "/organizer/events", icon: <Calendar size={20} /> },
  { label: "Scoring Management", href: "/organizer/scoring", icon: <Target size={20} /> },
  { label: "Peserta", href: "/organizer/participants", icon: <Users size={20} /> },
  { label: "Venue", href: "/organizer/venues", icon: <Map size={20} /> },
  { label: "Laporan", href: "/organizer/reports", icon: <FileText size={20} /> },
  { label: "Keuangan", href: "/organizer/finances", icon: <DollarSign size={20} /> },
  { label: "Statistik", href: "/organizer/statistics", icon: <BarChart size={20} /> },
  { label: "Pengaturan", href: "/organizer/settings", icon: <Settings size={20} /> },
];

// Navigation items component specific to organizer
function OrganizerNavItems({
  isCollapsed,
  isHidden,
  isHovering
}: Readonly<{
  isCollapsed: boolean;
  isHidden: boolean;
  isHovering: boolean;
}>) {
  const pathname = usePathname();
  const transitionClasses = "transition-all duration-300 ease-in-out";

  return (
    <nav className={`flex-1 py-4 overflow-y-auto ${isHidden && !isHovering ? "opacity-0" : "opacity-100"} ${transitionClasses}`}>
      <ul className={`space-y-1 ${isCollapsed ? "px-2" : "px-3"}`}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className={`flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-2 rounded-md transition ${
                  isActive 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                title={isCollapsed ? item.label : ""}
              >
                <span className={`${isCollapsed ? "mr-0" : "mr-3"} ${isActive ? "text-blue-600" : "text-slate-500"}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// User profile component specific to organizer
function OrganizerUserProfile({
  isCollapsed,
  isHidden,
  isHovering
}: Readonly<{
  isCollapsed: boolean;
  isHidden: boolean;
  isHovering: boolean;
}>) {
  const transitionClasses = "transition-all duration-300 ease-in-out";

  return (
    <div className={`p-4 border-t border-slate-200 ${isHidden && !isHovering ? "opacity-0" : "opacity-100"} ${transitionClasses}`}>
      {isCollapsed ? (
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            O
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              O
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Perpani Organizer</p>
              <p className="text-xs text-slate-500">perpani@example.com</p>
            </div>
          </div>
          <Link href="/auth/logout" className="mt-4 text-xs text-slate-600 hover:text-slate-900 block">
            Logout
          </Link>
        </>
      )}
    </div>
  );
}

export default function OrganizerSidebar() {
  const { isCollapsed, isHidden, setIsCollapsed, setIsHidden } = useSidebar();
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Skip initial animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Toggle sidebar state
  const toggleSidebar = () => {
    if (!isCollapsed && !isHidden) {
      // If expanded, then collapse
      setIsCollapsed(true);
      setIsHidden(false);
    } else if (isCollapsed && !isHidden) {
      // If collapsed, then hide
      setIsCollapsed(false);
      setIsHidden(true);
    } else {
      // If hidden, then expand
      setIsCollapsed(false);
      setIsHidden(false);
    }
  };

  // Handle mouseenter event for hidden sidebar
  const handleMouseEnter = () => {
    if (isHidden) {
      setIsHovering(true);
    }
  };

  // Handle mouseleave event for hidden sidebar
  const handleMouseLeave = () => {
    if (isHidden) {
      setIsHovering(false);
    }
  };

  // Set up click outside handler for mobile view
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const shouldHide = 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) && 
        window.innerWidth < 768 && 
        !isHidden && 
        !isCollapsed;
        
      if (shouldHide) {
        setIsHidden(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHidden, isCollapsed, setIsHidden]);

  // Get sidebar width class based on current state
  const getSidebarWidthClass = () => {
    if (isCollapsed) return "w-16";
    if (isHidden && !isHovering) return "w-1";
    return "w-64"; // Default expanded state
  };

  // Set appropriate sidebar classes based on state
  const sidebarWidthClass = getSidebarWidthClass();
  const transitionClasses = initialLoad ? "" : "transition-all duration-200 ease-out";
  
  return (
    <>
      <MobileMenuButton 
        setIsCollapsed={setIsCollapsed}
        setIsHidden={setIsHidden}
        isHidden={isHidden}
      />

      {/* Main sidebar component */}
      <aside 
        ref={sidebarRef}
        className={`h-screen bg-white border-r border-slate-200 flex flex-col flex-shrink-0 ${sidebarWidthClass} fixed left-0 top-0 ${transitionClasses} ${
          (isHidden && !isHovering) ? "opacity-60 overflow-hidden" : "opacity-100"
        } z-40`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: "width, transform" }}
      >
        <SidebarToggleButton 
          isCollapsed={isCollapsed}
          isHidden={isHidden}
          isHovering={isHovering}
          onToggle={toggleSidebar}
        />

        <SidebarLogo 
          isCollapsed={isCollapsed}
          isHidden={isHidden}
          isHovering={isHovering}
          roleLabel="Organizer"
        />

        <OrganizerNavItems
          isCollapsed={isCollapsed}
          isHidden={isHidden}
          isHovering={isHovering}
        />

        <OrganizerUserProfile
          isCollapsed={isCollapsed}
          isHidden={isHidden}
          isHovering={isHovering}
        />
      </aside>
    </>
  );
}
