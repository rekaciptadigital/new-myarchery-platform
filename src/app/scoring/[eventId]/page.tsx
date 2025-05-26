"use client";

import { useCallback, useEffect, useState } from "react";
import { 
  ArrowLeft, 
  BarChart4, 
  Calendar, 
  Clock, 
  Download, 
  Edit, 
  Filter, 
  Printer, 
  RefreshCcw, 
  Save, 
  Search, 
  Settings 
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TargetTable } from "@/components/scoring/TargetTable";
import { useScoring } from "@/hooks/useScoring";
import { TargetAssignment, ScoringCategory } from "@/types/scoring";

// Mock data for target assignments
const mockTargetAssignments: TargetAssignment[] = [
  {
    id: "ta-1",
    targetNo: "01A",
    archerId: "archer-1",
    archerName: "Ahmad Fauzi",
    clubName: "Arcadia Archery Club",
    category: "Recurve Senior Putra",
    status: "Completed",
    totalScore: 278,
    setScores: [10, 9, 10, 9, 8, 10],
    currentEnd: 8,
    totalEnds: 8,
    judge: "Budi Santoso",
    validationStatus: "Valid",
  },
  {
    id: "ta-2",
    targetNo: "01B",
    archerId: "archer-2",
    archerName: "Dimas Prayoga",
    clubName: "Golden Arrow Archery",
    category: "Recurve Senior Putra",
    status: "Completed",
    totalScore: 265,
    setScores: [9, 8, 9, 10, 8, 7],
    currentEnd: 8,
    totalEnds: 8,
    judge: "Budi Santoso",
    validationStatus: "Valid",
  },
];

const mockCategories: ScoringCategory[] = [
  { id: "1", name: "Recurve Senior Putra", type: "Recurve", class: "Senior", gender: "Putra", distance: "70m", participants: 24, activeParticipants: 20 },
  { id: "2", name: "Recurve Senior Putri", type: "Recurve", class: "Senior", gender: "Putri", distance: "70m", participants: 18, activeParticipants: 16 },
];

export default function EventScoringPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  
  const { getEventById, refreshEventData } = useScoring();
  const event = getEventById(eventId);
  
  const [selectedCategory, setSelectedCategory] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTargets, setFilteredTargets] = useState<TargetAssignment[]>(mockTargetAssignments);
  const [refreshTime, setRefreshTime] = useState(new Date());

  // Filter targets based on category and search query
  useEffect(() => {
    let filtered = mockTargetAssignments;
    
    // Filter by category
    if (selectedCategory) {
      const category = mockCategories.find(cat => cat.id === selectedCategory);
      if (category) {
        filtered = filtered.filter(target => target.category === category.name);
      }
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

  const handleRefresh = useCallback(async () => {
    setRefreshTime(new Date());
    if (eventId) {
      await refreshEventData(eventId);
    }
  }, [eventId, refreshEventData]);

  const handleEdit = useCallback((targetId: string) => {
    router.push(`/scoring/${eventId}/targets/${targetId}/edit`);
  }, [eventId, router]);

  const handleView = useCallback((targetId: string) => {
    router.push(`/scoring/${eventId}/targets/${targetId}/view`);
  }, [eventId, router]);

  const handleHistory = useCallback((targetId: string) => {
    router.push(`/scoring/${eventId}/targets/${targetId}/history`);
  }, [eventId, router]);

  if (!event) {
    return (
      <MainLayout>
        <div className="text-center py-8">
          <p className="text-slate-500">Event tidak ditemukan.</p>
          <Link href="/scoring">
            <Button className="mt-4">Kembali ke Daftar Event</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/scoring"
          className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{event.name}</h1>
          <div className="flex items-center mt-1 text-sm text-slate-500">
            <Clock size={14} className="mr-1" />
            <span>Terakhir diperbarui: {refreshTime.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="flex items-center"
          >
            <RefreshCcw size={14} className="mr-1" />
            Refresh
          </Button>
          
          <Link href={`/scoring/${eventId}/dashboard`}>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center"
            >
              <BarChart4 size={16} className="mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Event Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Sesi Aktif</p>
              <p className="font-medium">{event.currentSession}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Clock size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Waktu Tersisa</p>
              <p className="font-medium text-green-600">{event.timeRemaining}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Calendar size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Pemanah Aktif</p>
              <p className="font-medium">{event.activeArchers} pemanah</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Settings size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Progress Skor</p>
              <p className="font-medium">
                {Math.floor((event.completedScores / event.activeArchers) * 100)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="targets" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="targets">Daftar Target</TabsTrigger>
            <TabsTrigger value="leaderboard">Papan Skor</TabsTrigger>
            <TabsTrigger value="statistics">Statistik</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
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
        
        <TabsContent value="targets" className="space-y-4">
          {/* Filter and Search */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
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
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-slate-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {mockCategories.map(category => (
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
          
          <TargetTable 
            targets={filteredTargets}
            onEdit={handleEdit}
            onView={handleView}
            onHistory={handleHistory}
          />
        </TabsContent>
        
        <TabsContent value="leaderboard">
          <div className="bg-white rounded-lg border p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Leaderboard</h3>
            <p className="text-slate-500">Leaderboard akan ditampilkan di sini</p>
          </div>
        </TabsContent>
        
        <TabsContent value="statistics">
          <div className="bg-white rounded-lg border p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Statistik Scoring</h3>
            <p className="text-slate-500">Statistik akan ditampilkan di sini</p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-6">
        <div className="flex items-center gap-3">
          <Link href={`/scoring/${eventId}/settings`}>
            <Button variant="outline" size="sm" className="flex items-center">
              <Settings size={14} className="mr-1" />
              Pengaturan
            </Button>
          </Link>
          
          <Button variant="outline" size="sm">
            <Calendar size={14} className="mr-1" />
            Jadwal
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          {event.status === "Active" && (
            <Button variant="outline" size="sm" className="border-amber-500 text-amber-600 hover:bg-amber-50">
              Jeda Scoring
            </Button>
          )}
          
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Save size={14} className="mr-1" />
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}