"use client";

export function SidebarLoader() {
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
