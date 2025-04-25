"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  BarChart3, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Eye, 
  LucideTarget, 
  Medal, 
  Tag, 
  Timer, 
  Users 
} from "lucide-react";
import Link from "next/link";

// Data dummy untuk event scoring
const scoringEvents = [
  {
    id: "123",
    name: "Kejuaraan Nasional Panahan 2025",
    roundName: "Kualifikasi",
    status: "Sedang Berlangsung",
    location: "Lapangan Panahan Senayan, Jakarta",
    date: "15-17 Juni 2025",
    currentSession: "Kualifikasi Putaran 2",
    activeArchers: 72,
    completedScores: 45,
    pendingScores: 27,
    timeRemaining: "01:30:00",
    categories: 8,
  },
  {
    id: "124",
    name: "Archery Open Junior 2025",
    roundName: "Eliminasi",
    status: "Menunggu Mulai",
    location: "GOR Arcadia, Bandung",
    date: "1-2 Juni 2025",
    currentSession: "Eliminasi 1/8",
    activeArchers: 36,
    completedScores: 0,
    pendingScores: 36,
    timeRemaining: "00:45:00",
    categories: 4,
  },
  {
    id: "125",
    name: "Liga Panahan Kota 2025",
    roundName: "Final",
    status: "Selesai",
    location: "Lapangan Panahan Kota, Surabaya",
    date: "25-27 April 2025",
    currentSession: "Final",
    activeArchers: 8,
    completedScores: 8,
    pendingScores: 0,
    timeRemaining: "00:00:00",
    categories: 6,
  },
  {
    id: "126",
    name: "Invitational Archery Tournament",
    roundName: "Kualifikasi",
    status: "Jeda",
    location: "Lapangan Utama, Yogyakarta",
    date: "8-9 Juli 2025",
    currentSession: "Kualifikasi Putaran 1",
    activeArchers: 48,
    completedScores: 32,
    pendingScores: 16,
    timeRemaining: "00:15:00",
    categories: 6,
  },
];

export default function ScoringPage() {
  // Helper function untuk mendapatkan status badge classes berdasarkan status
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'Sedang Berlangsung':
        return 'bg-green-100 text-green-800';
      case 'Menunggu Mulai':
        return 'bg-yellow-100 text-yellow-800';
      case 'Jeda':
        return 'bg-blue-100 text-blue-800';
      case 'Selesai':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  // Helper function untuk progress bar
  const calculateProgress = (completed: number, total: number) => {
    return Math.floor((completed / total) * 100);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manajemen Scoring</h1>
          <p className="text-slate-600">Kelola dan pantau scoring untuk semua event panahan.</p>
        </div>
        <Link href="/scoring/setup">
          <Button className="flex items-center">
            <BarChart3 size={16} className="mr-2" />
            Setup Scoring Baru
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Event Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">2</p>
            <div className="text-sm text-blue-700 mt-1">Dengan skor sedang diproses</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Archer Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">108</p>
            <div className="text-sm text-green-700 mt-1">Sedang berpartisipasi hari ini</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Skor Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">77</p>
            <div className="text-sm text-purple-700 mt-1">Total hari ini</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Juri Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">12</p>
            <div className="text-sm text-orange-700 mt-1">Memvalidasi scoring</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Event Scoring</h2>
        <div className="space-y-4">
          {scoringEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border p-5">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                <div className="mb-3 lg:mb-0 lg:pr-6 lg:w-8/12">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusBadgeClasses(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-y-2 text-sm text-slate-600 mb-3">
                    <div className="flex items-center mr-4">
                      <Calendar size={16} className="mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center mr-4">
                      <LucideTarget size={16} className="mr-1" />
                      {event.roundName}
                    </div>
                    <div className="flex items-center mr-4">
                      <Users size={16} className="mr-1" />
                      {event.activeArchers} pemanah
                    </div>
                    <div className="flex items-center">
                      <Tag size={16} className="mr-1" />
                      {event.categories} kategori
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded-md border mb-3">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1.5 text-slate-600" />
                        <span className="font-medium">Sesi: {event.currentSession}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Timer size={16} className="mr-1.5 text-slate-600" />
                        <span className={`font-medium ${event.status === 'Sedang Berlangsung' ? 'text-green-600' : ''}`}>
                          {event.timeRemaining}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <ArrowUpCircle size={16} className="mr-1.5 text-green-500" />
                        <span>Selesai: {event.completedScores}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <ArrowDownCircle size={16} className="mr-1.5 text-orange-500" />
                        <span>Tertunda: {event.pendingScores}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${calculateProgress(event.completedScores, event.activeArchers)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500">
                    Progress: {calculateProgress(event.completedScores, event.activeArchers)}% skor tercatat
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 lg:w-4/12">
                  <Link 
                    href={`/scoring/${event.id}/dashboard`}
                    className="inline-flex items-center justify-center text-base font-medium bg-blue-600 text-white rounded-md px-4 py-3 w-full hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <Eye size={18} className="mr-2" />
                    Kelola Scoring Event
                  </Link>
                  
                  <Link 
                    href={`/scoring/${event.id}/leaderboard`}
                    className="inline-flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md px-4 py-2 w-full"
                  >
                    <Medal size={16} className="mr-2" />
                    Leaderboard
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart3 size={16} className="mr-2" />
                    Statistik
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}