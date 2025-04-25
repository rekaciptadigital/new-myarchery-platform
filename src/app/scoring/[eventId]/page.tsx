"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  ArrowUpCircle, 
  Award, 
  BarChart3, 
  BarChart4, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Download, 
  Edit, 
  Eye,
  Filter, 
  History, 
  LucideTarget, 
  Printer, 
  RefreshCcw, 
  Save, 
  Search, 
  Settings, 
  Timer, 
  Users 
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Data dummy untuk detail event scoring
const eventDetails = {
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
};

// Data dummy untuk kategori
const categories = [
  { id: 1, name: "Recurve Senior Putra" },
  { id: 2, name: "Recurve Senior Putri" },
  { id: 3, name: "Compound Senior Putra" },
  { id: 4, name: "Compound Senior Putri" },
  { id: 5, name: "Barebow Senior Putra" },
  { id: 6, name: "Barebow Senior Putri" },
  { id: 7, name: "Traditional Senior Putra" },
  { id: 8, name: "Traditional Senior Putri" },
];

// Data dummy untuk target assignments
const targetAssignments = [
  { 
    targetNo: "01A", 
    archerName: "Ahmad Fauzi", 
    clubName: "Arcadia Archery Club", 
    category: "Recurve Senior Putra",
    status: "Selesai",
    totalScore: 278,
    setScores: [10, 9, 10, 9, 8, 10, 10, 7, 9, 8, 9, 10, 9, 9, 10, 10, 9, 8, 10, 9, 9, 9, 10, 10],
    end: 8,
    judge: "Budi Santoso"
  },
  { 
    targetNo: "01B", 
    archerName: "Dimas Prayoga", 
    clubName: "Golden Arrow Archery", 
    category: "Recurve Senior Putra",
    status: "Selesai",
    totalScore: 265,
    setScores: [9, 8, 9, 10, 8, 7, 9, 9, 8, 10, 8, 9, 10, 8, 9, 10, 9, 8, 9, 10, 8, 9, 9, 8],
    end: 8,
    judge: "Budi Santoso"
  },
  { 
    targetNo: "01C", 
    archerName: "Bayu Setiawan", 
    clubName: "Jakarta Archery", 
    category: "Recurve Senior Putra",
    status: "Tertunda",
    totalScore: 178,
    setScores: [8, 9, 7, 10, 8, 9, 10, 9, 8, 10, 9, 9, 8, 7, 9, 10, 9, 9],
    end: 6,
    judge: "Pending"
  },
  { 
    targetNo: "01D", 
    archerName: "Rizky Pratama", 
    clubName: "Bandung Archery Club", 
    category: "Recurve Senior Putra",
    status: "Tertunda",
    totalScore: 190,
    setScores: [10, 9, 10, 9, 8, 9, 10, 10, 9, 8, 10, 8, 10, 10, 8, 9, 10, 9],
    end: 6,
    judge: "Pending"
  },
  { 
    targetNo: "02A", 
    archerName: "Maya Sari", 
    clubName: "Arcadia Archery Club", 
    category: "Recurve Senior Putri",
    status: "Selesai",
    totalScore: 268,
    setScores: [9, 8, 10, 9, 9, 10, 8, 9, 10, 10, 8, 9, 10, 9, 10, 8, 9, 10, 9, 8, 8, 9, 10, 9],
    end: 8,
    judge: "Siti Nurhaliza"
  },
  { 
    targetNo: "02B", 
    archerName: "Dewi Anggraini", 
    clubName: "Royal Archery", 
    category: "Recurve Senior Putri",
    status: "Selesai",
    totalScore: 270,
    setScores: [9, 10, 9, 8, 10, 9, 10, 9, 10, 9, 9, 10, 10, 9, 8, 10, 9, 9, 8, 10, 10, 9, 10, 8],
    end: 8,
    judge: "Siti Nurhaliza"
  },
  { 
    targetNo: "02C", 
    archerName: "Ratna Sari", 
    clubName: "Jakarta Archery", 
    category: "Recurve Senior Putri",
    status: "Tertunda",
    totalScore: 150,
    setScores: [8, 7, 9, 8, 10, 9, 8, 7, 9, 10, 8, 9, 8, 8, 10, 10, 9, 9],
    end: 6,
    judge: "Pending"
  },
  { 
    targetNo: "02D", 
    archerName: "Anisa Fazira", 
    clubName: "Surabaya Archery", 
    category: "Recurve Senior Putri",
    status: "Tertunda",
    totalScore: 165,
    setScores: [10, 9, 8, 9, 10, 10, 9, 8, 9, 9, 10, 8, 9, 10, 8, 9, 10, 10],
    end: 6,
    judge: "Pending"
  },
];

export default function EventScoringPage() {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTargets, setFilteredTargets] = useState(targetAssignments);
  const [refreshTime, setRefreshTime] = useState(new Date());
  

  // Helper function untuk status badge
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

  // Helper function untuk archer status badge
  const getArcherStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-800';
      case 'Tertunda':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sedang Berlangsung':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  // Filter archers berdasarkan kategori dan search query
  useEffect(() => {
    let filtered = targetAssignments;
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(target => 
        target.category === categories.find(cat => cat.id === selectedCategory)?.name
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(target => 
        target.archerName.toLowerCase().includes(query) ||
        target.targetNo.toLowerCase().includes(query) ||
        target.clubName.toLowerCase().includes(query)
      );
    }
    
    setFilteredTargets(filtered);
  }, [selectedCategory, searchQuery]);

  // Simulasi refresh data
  const handleRefresh = () => {
    setRefreshTime(new Date());
  };

  // Navigasi ke dashboard scoring
  const router = useRouter();
  const { eventId } = useParams();
  const navigateToDashboard = () => {
    router.push(`/scoring/${eventId}/dashboard`);
  };

  return (
    <MainLayout>
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/scoring"
          className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{eventDetails.name}</h1>
          <div className="flex items-center mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeClasses(eventDetails.status)}`}>
              {eventDetails.status}
            </span>
            <span className="text-sm text-slate-500 ml-3">
              <Clock size={14} className="inline mr-1" />
              Terakhir diperbarui: {refreshTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
        
        {/* Dashboard Link */}
        <div className="ml-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center" 
            onClick={navigateToDashboard}
          >
            <BarChart4 size={16} className="mr-2" />
            Dashboard Scoring
          </Button>
        </div>
      </div>

      {/* Event Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <LucideTarget size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Sesi</p>
              <p className="font-medium">{eventDetails.currentSession}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Timer size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Waktu Tersisa</p>
              <p className="font-medium text-green-600">{eventDetails.timeRemaining}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Users size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Pemanah Aktif</p>
              <p className="font-medium">{eventDetails.activeArchers} pemanah</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <ArrowUpCircle size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Progress Skor</p>
              <p className="font-medium">{calculateProgress(eventDetails.completedScores, eventDetails.activeArchers)}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1.5">
          <span>Progress Penilaian</span>
          <span>{eventDetails.completedScores}/{eventDetails.activeArchers} Selesai</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-green-500 h-2.5 rounded-full" 
            style={{ width: `${calculateProgress(eventDetails.completedScores, eventDetails.activeArchers)}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="targetLists" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="targetLists">
              Daftar Target
            </TabsTrigger>
            <TabsTrigger value="scoreboard">
              Papan Skor
            </TabsTrigger>
            <TabsTrigger value="statistics">
              Statistik
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} className="flex items-center">
              <RefreshCcw size={14} className="mr-1" />
              Refresh
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center">
              <Printer size={14} className="mr-1" />
              Print
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center">
              <Download size={14} className="mr-1" />
              Export
            </Button>
          </div>
        </div>
        
        <TabsContent value="targetLists" className="mt-0">
          {/* Filter dan Search */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cari pemanah atau target..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(Number(e.target.value))}
                  className="bg-white border border-slate-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter size={14} className="mr-1" />
                  Filter
                </Button>
              </div>
            </div>
            
            <Button className="flex items-center bg-green-600 hover:bg-green-700">
              <Edit size={16} className="mr-2" />
              Input Skor Baru
            </Button>
          </div>
          
          {/* Target List */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Target
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Pemanah
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Klub
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total Skor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    End
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Juri
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredTargets.map((target, idx) => (
                  <tr key={target.targetNo} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {target.targetNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {target.archerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {target.clubName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {target.totalScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {target.end}/8
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getArcherStatusBadgeClasses(target.status)}`}>
                        {target.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {target.judge}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-2 py-1">
                          <Eye size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 px-2 py-1">
                          <Edit size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 px-2 py-1">
                          <History size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-600">
              Menampilkan 1-8 dari 72 pemanah
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center bg-blue-100 text-blue-600 border-blue-300">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
                3
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="scoreboard" className="mt-0">
          <div className="bg-white rounded-lg border p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-1">{eventDetails.currentSession} - Leaderboard</h3>
              <p className="text-slate-500">{categories.find(cat => cat.id === selectedCategory)?.name}</p>
            </div>
            
            <div className="overflow-hidden rounded-lg border">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider w-16">
                      Posisi
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Pemanah
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Klub
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                      10s
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                      X
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredTargets
                    .sort((a, b) => b.totalScore - a.totalScore)
                    .map((target, idx) => (
                      <tr key={target.targetNo} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {idx === 0 ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 mx-auto">
                              <Award size={16} />
                            </div>
                          ) : (
                            <span className="text-sm font-medium">{idx + 1}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-slate-900">{target.archerName}</div>
                              <div className="text-xs text-slate-500">{target.targetNo}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {target.clubName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-center">
                          {target.totalScore}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          {target.setScores.filter(score => score === 10).length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          {/* Simulasi jumlah X (bull's eye) */}
                          {Math.floor(target.setScores.filter(score => score === 10).length / 3)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="statistics" className="mt-0">
          <div className="bg-white rounded-lg border p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-1">Statistik Scoring Event</h3>
              <p className="text-slate-500">Analisis performa berdasarkan kategori dan waktu</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Distribusi Skor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Grafik distribusi skor akan ditampilkan di sini</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Perbandingan Kategori</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Grafik perbandingan kategori akan ditampilkan di sini</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Tren Waktu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Grafik tren waktu akan ditampilkan di sini</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <p className="text-slate-600 text-sm mb-4">Statistik lengkap tersedia setelah event selesai.</p>
              <Button variant="outline">
                <BarChart3 size={16} className="mr-2" />
                Lihat Laporan Statistik Lengkap
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Footer Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href={`/scoring/${eventId}/settings`}>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center"
            >
              <Settings size={14} className="mr-1" />
              Pengaturan Pertandingan
            </Button>
          </Link>
          
          <Button variant="outline" size="sm">
            <Calendar size={14} className="mr-1" />
            Jadwal
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          {eventDetails.status === "Sedang Berlangsung" && (
            <Button variant="outline" size="sm" className="border-amber-500 text-amber-600 hover:bg-amber-50">
              Jeda Scoring
            </Button>
          )}
          
          {eventDetails.status === "Jeda" && (
            <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-50">
              Lanjutkan Scoring
            </Button>
          )}
          
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Save size={14} className="mr-1" />
            Simpan Semua Perubahan
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}