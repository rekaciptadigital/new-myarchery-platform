"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  ArrowLeft, 
  Award, 
  BarChart4, 
  CalendarDays, 
  Clock, 
  Cog, 
  Flag, 
  LucideTarget, 
  Medal, 
  Settings, 
  Tablet, 
  Users, 
  UserCog
} from "lucide-react";
import Link from "next/link";

// Data dummy untuk detail event
const eventDetails = {
  id: "123",
  name: "Kejuaraan Nasional Panahan 2025",
  location: "Lapangan Panahan Senayan, Jakarta",
  date: "15-17 Juni 2025",
  currentSession: "Kualifikasi Putaran 2",
  activeArchers: 72,
  categories: 8,
  status: "Sedang Berlangsung",
};

// Menu untuk Dashboard Scoring System
const scoringMenus = [
  {
    id: "settings",
    title: "Pengaturan Pertandingan",
    description: "Setting bantalan, bracket, FOP, dan jadwal",
    icon: <Cog className="h-10 w-10 text-blue-600" />,
    color: "bg-blue-50 border-blue-200",
    path: "settings"
  },
  {
    id: "participants",
    title: "Daftar Peserta",
    description: "Kelola peserta individu, team dan mix team",
    icon: <Users className="h-10 w-10 text-green-600" />,
    color: "bg-green-50 border-green-200",
    path: "participants"
  },
  {
    id: "scoring",
    title: "Data Pertandingan",
    description: "Input dan kelola skor kualifikasi dan eliminasi",
    icon: <Tablet className="h-10 w-10 text-amber-600" />,
    color: "bg-amber-50 border-amber-200",
    path: "scoring"
  },
  {
    id: "dashboard",
    title: "Dashboard Pertandingan",
    description: "Leaderboard dan statistik pertandingan",
    icon: <BarChart4 className="h-10 w-10 text-purple-600" />,
    color: "bg-purple-50 border-purple-200",
    path: "dashboard"
  },
  {
    id: "certificates",
    title: "Konfigurasi Sertifikat",
    description: "Desain dan kelola sertifikat pertandingan",
    icon: <Award className="h-10 w-10 text-cyan-600" />,
    color: "bg-cyan-50 border-cyan-200",
    path: "certificates"
  },
  {
    id: "users",
    title: "Manajemen User",
    description: "Kelola akses user ke sistem scoring",
    icon: <UserCog className="h-10 w-10 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200",
    path: "user-access"
  },
];

// Top statistics untuk overview - Add more detailed information
const scoringStatistics = [
  { 
    id: "active-participants", 
    title: "Peserta Aktif", 
    value: 72, 
    secondaryInfo: "dari 128 terdaftar",
    trend: "+3 dari kemarin",
    trendUp: true,
    icon: <Users className="h-5 w-5 text-blue-600" />,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700"
  },
  { 
    id: "categories", 
    title: "Kategori", 
    value: 8, 
    secondaryInfo: "Recurve terpopuler",
    trend: "6 aktif hari ini",
    trendUp: true,
    icon: <Flag className="h-5 w-5 text-green-600" />,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700"
  },
  { 
    id: "targets", 
    title: "Bantalan", 
    value: 24, 
    secondaryInfo: "16 sedang digunakan",
    trend: "8 tersedia",
    trendUp: null,
    icon: <LucideTarget className="h-5 w-5 text-amber-600" />,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700"
  },
  { 
    id: "active-judges", 
    title: "Juri Aktif", 
    value: 12, 
    secondaryInfo: "4 sesi terjadwal",
    trend: "3 pending konfirmasi",
    trendUp: false,
    icon: <UserCog className="h-5 w-5 text-purple-600" />,
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700"
  },
];

// Data dummy untuk top scores
const topScores = [
  { rank: 1, name: "Ahmad Fauzi", club: "Arcadia Archery Club", category: "Recurve Senior Putra", score: 675 },
  { rank: 2, name: "Dimas Prayoga", club: "Golden Arrow Archery", category: "Recurve Senior Putra", score: 672 },
  { rank: 3, name: "Maya Sari", club: "Arcadia Archery Club", category: "Recurve Senior Putri", score: 668 },
  { rank: 4, name: "Dewi Anggraini", club: "Royal Archery", category: "Recurve Senior Putri", score: 665 },
  { rank: 5, name: "Rizky Pratama", club: "Bandung Archery Club", category: "Recurve Senior Putra", score: 662 },
];

// Data dummy untuk upcoming matches
const upcomingMatches = [
  { time: "10:30", fieldOfPlay: "FOP A", category: "Recurve Senior Putra 1/8", status: "Akan Datang" },
  { time: "11:45", fieldOfPlay: "FOP B", category: "Compound Senior Putri 1/4", status: "Akan Datang" },
  { time: "13:15", fieldOfPlay: "FOP A", category: "Recurve Senior Putri 1/4", status: "Akan Datang" },
  { time: "14:30", fieldOfPlay: "FOP C", category: "Compound Senior Putra Semifinal", status: "Akan Datang" },
];

// Define a proper type for event data
interface EventData {
  id: string;
  name: string;
  location: string;
  date: string;
}

/**
 * Adapter for Setup Scoring Dashboard
 */
export function OrganizerScoringSetupAdapter() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Add this effect to handle the timestamp client-side only
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);
  
  // Fetch event data if eventId is provided
  useEffect(() => {
    if (eventId) {
      setLoading(true);
      
      // Simulate API call with mock data
      setTimeout(() => {
        // Find the event with matching ID from our mock data
        // Using different mock events to show variety in titles
        const mockEvents: EventData[] = [
          {
            id: "123",
            name: "Kejuaraan Nasional Panahan 2025",
            location: "Lapangan Panahan Senayan, Jakarta",
            date: "15-17 Juni 2025"
          },
          {
            id: "124",
            name: "Archery Open Junior 2025",
            location: "GOR Arcadia, Bandung",
            date: "1-2 Juni 2025"
          },
          {
            id: "125",
            name: "Liga Panahan Kota 2025",
            location: "Lapangan Panahan Kota, Surabaya",
            date: "25-27 April 2025"
          },
          {
            id: "126",
            name: "Invitational Archery Tournament",
            location: "Lapangan Utama, Yogyakarta",
            date: "8-9 Juli 2025"
          }
        ];
        
        const foundEvent = mockEvents.find(e => e.id === eventId) || mockEvents[0];
        setEvent(foundEvent);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [eventId]);
  
  return (
    <div>
      {/* Header with back button and event info */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/organizer/scoring-management"
          className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-7 w-64 bg-slate-200 rounded mb-2"></div>
              <div className="h-5 w-48 bg-slate-200 rounded"></div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">
                {event ? event.name : "Setup Scoring Baru"}
              </h1>
              <div className="flex items-center mt-1">
                <span className="text-sm text-slate-500">
                  <Clock size={14} className="inline mr-1" />
                  {event ? `${event.date} • ${event.location}` : "Buat konfigurasi scoring baru"}
                </span>
              </div>
            </>
          )}
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Settings size={16} className="mr-2" />
            Pengaturan Event
          </Button>
          <Button size="sm" className="flex items-center bg-blue-600 hover:bg-blue-700">
            Sedang Berlangsung
          </Button>
        </div>
      </div>

      {/* Responsive Tabs for mobile */}
      <div className="block md:hidden mb-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 w-full">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="quick">Quick Actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Overview pertandingan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {scoringStatistics.map(stat => (
                    <div key={stat.id} className="flex flex-col items-center justify-center p-3 border rounded-md">
                      {stat.icon}
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="menu">
            <div className="grid grid-cols-2 gap-3">
              {scoringMenus.map(menu => (
                <Card key={menu.id} className={`${menu.color} cursor-pointer hover:shadow-md transition-shadow`}>
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                    <div className="p-1">{menu.icon}</div>
                    <CardTitle className="text-sm mb-1">{menu.title}</CardTitle>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="quick">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full flex items-center justify-start" variant="outline">
                    <LucideTarget size={16} className="mr-2" />
                    Input Skor Kualifikasi
                  </Button>
                  <Button className="w-full flex items-center justify-start" variant="outline">
                    <Activity size={16} className="mr-2" />
                    Input Skor Eliminasi
                  </Button>
                  <Button className="w-full flex items-center justify-start" variant="outline">
                    <Medal size={16} className="mr-2" />
                    Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-col space-y-6">
        {/* Section Title for Quick Statistics */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Overview Pertandingan</h2>
          <p className="text-sm text-slate-500">Terakhir diperbarui: {currentTime}</p>
        </div>
        
        {/* Quick Statistics - Compact version with consistent color */}
        <div className="grid grid-cols-4 gap-4">
          {scoringStatistics.map(stat => (
            <Card key={stat.id} className="bg-slate-50 border border-slate-200">
              <CardContent className="py-2 px-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.secondaryInfo}</p>
                    </div>
                  </div>
                  <div className={`h-8 w-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-1 text-xs text-slate-500 flex items-center">
                  {stat.trendUp !== null && (
                    <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1 ${stat.trendUp ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  )}
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Title for Main Menu */}
        <div className="pt-2">
          <h2 className="text-lg font-semibold text-slate-800">Manajemen Pertandingan</h2>
          <p className="text-sm text-slate-500 mt-1">Pilih menu untuk mengelola berbagai aspek pertandingan</p>
        </div>
        
        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scoringMenus.map(menu => (
            <Card key={menu.id} className={`${menu.color} hover:shadow-md transition-shadow`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4">
                    {menu.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base mb-1">{menu.title}</CardTitle>
                    <CardDescription className="text-xs">{menu.description}</CardDescription>
                  </div>
                </div>
                <Link href={`/organizer/scoring-management/${eventDetails.id}/${menu.path}`}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Settings size={14} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Title for Analysis */}
        <div className="pt-2">
          <h2 className="text-lg font-semibold text-slate-800">Analisis & Jadwal</h2>
          <p className="text-sm text-slate-500 mt-1">Pantau performa peserta dan jadwal pertandingan mendatang</p>
        </div>
        
        {/* Bottom Row: Top Scores & Upcoming Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Scores */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Top Scores</CardTitle>
                <Button variant="link" size="sm" className="flex items-center p-0">
                  <Medal size={16} className="mr-1" />
                  Lihat Semua
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-12">
                        Rank
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Pemanah
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Skor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {topScores.map((score) => (
                      <tr key={`${score.name}-${score.category}`}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">
                          {score.rank}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-900">
                          <div>
                            <div className="font-medium">{score.name}</div>
                            <div className="text-xs text-slate-500">{score.club}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-900">
                          {score.category}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-bold text-right">
                          {score.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Matches */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Jadwal Pertandingan</CardTitle>
                <Button variant="link" size="sm" className="flex items-center p-0">
                  <CalendarDays size={16} className="mr-1" />
                  Lihat Semua
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-16">
                        Waktu
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        FOP
                      </th>
                      <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {upcomingMatches.map((match) => (
                      <tr key={`${match.time}-${match.fieldOfPlay}-${match.category}`}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">
                          {match.time}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-900">
                          {match.category}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-900">
                          {match.fieldOfPlay}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-center">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {match.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Access Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex items-center justify-between md:hidden">
        <Button variant="ghost" size="sm" className="flex flex-col items-center text-xs">
          <LucideTarget className="h-5 w-5 mb-1" />
          Scoring
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center text-xs">
          <Users className="h-5 w-5 mb-1" />
          Peserta
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center text-xs">
          <Medal className="h-5 w-5 mb-1" />
          Leaderboard
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center text-xs">
          <Settings className="h-5 w-5 mb-1" />
          Setting
        </Button>
      </div>
    </div>
  );
}
