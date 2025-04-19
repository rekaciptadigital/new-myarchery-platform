"use client";

import { BarChart, Calendar, Home, Users, Map, Target, Settings, FileText, DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col min-h-screen">
      <div className="h-16 flex items-center justify-center font-bold text-xl tracking-tight border-b border-slate-200">
        <span className="text-blue-600">My</span>Archery
        <span className="ml-2 text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-sm">Organizer</span>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={`flex items-center px-3 py-2 rounded-md transition ${
                    isActive 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className={`mr-3 ${isActive ? "text-blue-600" : "text-slate-500"}`}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-200">
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
      </div>
    </aside>
  );
}