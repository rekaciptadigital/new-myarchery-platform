"use client";

import { useState } from "react";
import { Bell, Calendar, HelpCircle, Plus } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Organizer</h1>
        <p className="text-slate-500">Kelola event archery Anda dengan mudah</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <Link
          href="/organizer/events/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Buat Event
        </Link>
        
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-slate-100"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell size={20} className="text-slate-600" />
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-slate-200">
              <div className="px-4 py-2 border-b border-slate-100">
                <h3 className="font-medium">Notifikasi</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-2 hover:bg-slate-50 border-b border-slate-100">
                  <p className="text-sm font-medium">Pendaftaran baru</p>
                  <p className="text-xs text-slate-500">John Doe telah mendaftar ke event Anda</p>
                  <p className="text-xs text-slate-400 mt-1">2 jam yang lalu</p>
                </div>
                <div className="px-4 py-2 hover:bg-slate-50">
                  <p className="text-sm font-medium">Pembayaran diterima</p>
                  <p className="text-xs text-slate-500">Pembayaran dari Jane Smith telah dikonfirmasi</p>
                  <p className="text-xs text-slate-400 mt-1">Kemarin, 14:30</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-slate-100">
                <Link href="/organizer/notifications" className="text-xs text-blue-600 hover:text-blue-800">
                  Lihat semua notifikasi
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <button className="p-2 rounded-full hover:bg-slate-100">
          <Calendar size={20} className="text-slate-600" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-slate-100">
          <HelpCircle size={20} className="text-slate-600" />
        </button>
      </div>
    </div>
  );
}
