"use client";

import { BarChart, Calendar, Home, Users, Map, Target, Settings, FileText, DollarSign, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSidebar } from "./SidebarContext";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
  { label: "Event Management", href: "/events", icon: <Calendar size={20} /> },
  { label: "Peserta", href: "/participants", icon: <Users size={20} /> },
  { label: "Venue", href: "/venues", icon: <Map size={20} /> },
  { label: "Scoring", href: "/scoring", icon: <Target size={20} /> },
  { label: "Laporan", href: "/reports", icon: <FileText size={20} /> },
  { label: "Keuangan", href: "/finances", icon: <DollarSign size={20} /> },
  { label: "Statistik", href: "/statistics", icon: <BarChart size={20} /> },
  { label: "Pengaturan", href: "/settings", icon: <Settings size={20} /> },
];

// Extracted toggle button component
function SidebarToggleButton({ 
  isCollapsed, 
  isHidden, 
  isHovering, 
  onToggle 
}: Readonly<{ 
  isCollapsed: boolean; 
  isHidden: boolean; 
  isHovering: boolean; 
  onToggle: () => void; 
}>) {
  const transitionClasses = "transition-all duration-300 ease-in-out";

  // Separate methods for each state to determine icon
  const getExpandedStateIcon = () => <ChevronLeft size={16} />;
  const getCollapsedStateIcon = () => <ChevronLeft size={16} className="rotate-180" />;
  const getHiddenStateIcon = () => <ChevronRight size={16} />;

  // Separate methods for each state to determine aria-label
  const getExpandedStateAriaLabel = () => "Collapse sidebar";
  const getCollapsedStateAriaLabel = () => "Hide sidebar";
  const getHiddenStateAriaLabel = () => "Expand sidebar";

  // Get the appropriate icon based on current state
  const getToggleIcon = () => {
    if (isHidden) return getHiddenStateIcon();
    if (isCollapsed) return getCollapsedStateIcon();
    return getExpandedStateIcon();
  };

  // Get the appropriate aria-label based on current state
  const getToggleAriaLabel = () => {
    if (isHidden) return getHiddenStateAriaLabel();
    if (isCollapsed) return getCollapsedStateAriaLabel();
    return getExpandedStateAriaLabel();
  };

  return (
    <button 
      className={`absolute -right-3 top-20 bg-white rounded-full p-1 border border-slate-200 shadow-sm ${
        isHidden && !isHovering ? "opacity-0" : "opacity-100"
      } ${transitionClasses} hover:bg-slate-50`}
      onClick={onToggle}
      aria-label={getToggleAriaLabel()}
    >
      {getToggleIcon()}
    </button>
  );
}

// Extracted logo component
function SidebarLogo({ 
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
    <div className={`h-16 flex items-center justify-center border-b border-slate-200 overflow-hidden ${transitionClasses} ${
      isHidden && !isHovering ? "opacity-0" : "opacity-100"
    }`}>
      {isCollapsed ? (
        <Image 
          src="/icon-myarchery.ico" 
          alt="MyArchery Icon" 
          width={24} 
          height={24} 
          className="object-contain"
          priority
        />
      ) : (
        <Link href="/dashboard" className="flex items-center">
          <Image 
            src="/logos/logo_myarchery.svg" 
            alt="MyArchery Logo" 
            width={140} 
            height={40} 
            className="object-contain"
            priority
          />
          <span className="ml-2 text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-sm whitespace-nowrap">Organizer</span>
        </Link>
      )}
    </div>
  );
}

// Extracted navigation items component
function SidebarNavItems({
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

// Extracted user profile component
function SidebarUserProfile({
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
          <Link href="/" className="mt-4 text-xs text-slate-600 hover:text-slate-900 block">
            Logout
          </Link>
        </>
      )}
    </div>
  );
}

// Mobile toggle button component
function MobileMenuButton({
  setIsCollapsed,
  setIsHidden,
  isHidden
}: Readonly<{
  setIsCollapsed: (value: boolean) => void;
  setIsHidden: (value: boolean) => void;
  isHidden: boolean;
}>) {
  return (
    <button 
      className="fixed top-4 left-4 p-2 bg-white rounded-md shadow-md z-50 md:hidden"
      onClick={() => {
        setIsCollapsed(false);
        setIsHidden(!isHidden);
      }}
    >
      <Menu size={20} />
    </button>
  );
}

export default function Sidebar() {
  const { isCollapsed, isHidden, setIsCollapsed, setIsHidden } = useSidebar();
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Toggle sidebar state - cycles through states: expanded -> collapsed -> hidden
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

  // Set up click outside handler
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
    if (isCollapsed) {
      return "w-16";
    }
    
    if (isHidden && !isHovering) {
      return "w-2";
    }
    
    return "w-64"; // Default expanded state
  };

  // Set appropriate sidebar width class based on state
  const sidebarWidthClass = getSidebarWidthClass();

  // Define transition classes
  const transitionClasses = "transition-all duration-300 ease-in-out";

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
        className={`fixed top-0 left-0 h-screen bg-white border-r border-slate-200 flex flex-col ${sidebarWidthClass} ${transitionClasses} ${
          (isHidden && !isHovering) ? "sidebar-hidden" : ""
        } z-40`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
        />

        <SidebarNavItems
          isCollapsed={isCollapsed}
          isHidden={isHidden}
          isHovering={isHovering}
        />

        <SidebarUserProfile
          isCollapsed={isCollapsed}
          isHidden={isHidden}
          isHovering={isHovering}
        />
      </aside>
    </>
  );
}