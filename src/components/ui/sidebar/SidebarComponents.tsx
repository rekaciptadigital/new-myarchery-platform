"use client";

import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Toggle button component
export function SidebarToggleButton({ 
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

  // Get the appropriate icon based on current state
  const getToggleIcon = () => {
    if (isHidden) return <ChevronRight size={16} />;
    if (isCollapsed) return <ChevronRight size={16} />;
    return <ChevronLeft size={16} />;
  };

  // Get the appropriate aria-label based on current state
  const getToggleAriaLabel = () => {
    if (isHidden) return "Expand sidebar";
    if (isCollapsed) return "Expand sidebar";
    return "Collapse sidebar";
  };

  return (
    <button 
      className={`absolute -right-3 top-20 bg-white rounded-full p-1 border border-slate-200 shadow-sm 
        ${isHidden && !isHovering ? "opacity-0" : "opacity-100"}
        ${transitionClasses} hover:bg-slate-50 z-50 sidebar-toggle-btn`}
      onClick={onToggle}
      aria-label={getToggleAriaLabel()}
    >
      {getToggleIcon()}
    </button>
  );
}

// Logo component
export function SidebarLogo({ 
  isCollapsed, 
  isHidden, 
  isHovering,
  roleLabel,
}: Readonly<{ 
  isCollapsed: boolean; 
  isHidden: boolean; 
  isHovering: boolean;
  roleLabel: string;
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
        <Link href="/organizer/dashboard" className="flex items-center">
          <Image 
            src="/logos/logo_myarchery.svg" 
            alt="MyArchery Logo" 
            width={140} 
            height={40} 
            className="object-contain"
            priority
          />
          <span className="ml-2 text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-sm whitespace-nowrap">
            {roleLabel}
          </span>
        </Link>
      )}
    </div>
  );
}

// Mobile toggle button component
export function MobileMenuButton({
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
      className="fixed top-4 left-4 p-2 bg-white rounded-md shadow-md z-50 md:hidden sidebar-toggle-btn"
      onClick={() => {
        setIsCollapsed(false);
        setIsHidden(!isHidden);
      }}
    >
      <Menu size={20} />
    </button>
  );
}
