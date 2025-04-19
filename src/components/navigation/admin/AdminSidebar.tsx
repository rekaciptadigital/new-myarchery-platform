"use client";

import { BarChart, Calendar, Home, Settings, Shield, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <Home size={20} /> },
  { label: "Manajemen Event", href: "/admin/events", icon: <Calendar size={20} /> },
  { label: "Manajemen User", href: "/admin/users", icon: <Users size={20} /> },
  { label: "Keamanan & Akses", href: "/admin/security", icon: <Shield size={20} /> },
  { label: "Laporan & Statistik", href: "/admin/reports", icon: <BarChart size={20} /> },
  { label: "Pengaturan Sistem", href: "/admin/settings", icon: <Settings size={20} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-800 text-white hidden md:flex flex-col min-h-screen">
      <div className="h-16 flex items-center px-6 border-b border-slate-700">
        <div className="font-bold text-xl tracking-tight flex items-center">
          <span className="text-blue-400">My</span>Archery
          <span className="ml-2 text-xs px-2 py-1 bg-blue-600 rounded-sm">Admin</span>
        </div>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={`flex items-center px-4 py-2 rounded transition ${
                    isActive 
                      ? "bg-slate-700 text-white" 
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white font-medium">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-slate-400">admin@myarchery.com</p>
          </div>
        </div>
        <button className="mt-4 text-xs text-slate-300 hover:text-white w-full text-left">
          Logout
        </button>
      </div>
    </aside>
  );
}