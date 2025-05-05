import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Calendar, 
  Clock, 
  Eye, 
  LucideTarget, 
  Tag, 
  Timer, 
  Users,
  Cog
} from "lucide-react";
import Link from "next/link";
import { ScoringEvent, ScoringEventStatus, ScoringStats } from "../../../models/scoring-event";

interface OrganizerScoringDashboardProps {
  events: ScoringEvent[];
  stats: ScoringStats | null;
  calculateProgress: (completed: number, total: number) => number;
  getStatusBadgeClasses: (status: ScoringEventStatus) => string;
}

export function OrganizerScoringDashboard({
  events,
  stats,
  calculateProgress,
  getStatusBadgeClasses
}: Readonly<OrganizerScoringDashboardProps>) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manajemen Scoring</h1>
          <p className="text-slate-600">Kelola dan pantau scoring untuk semua event panahan.</p>
        </div>
        {/* Tombol setup scoring baru dihapus karena tidak diperlukan */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Event Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats?.activeEvents ?? 0}</p>
            <div className="text-sm text-blue-700 mt-1">Dengan skor sedang diproses</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Archer Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats?.activeArchers ?? 0}</p>
            <div className="text-sm text-green-700 mt-1">Sedang berpartisipasi hari ini</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Skor Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{stats?.completedScores ?? 0}</p>
            <div className="text-sm text-purple-700 mt-1">Total hari ini</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Juri Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{stats?.activeJudges ?? 0}</p>
            <div className="text-sm text-orange-700 mt-1">Memvalidasi scoring</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Event Scoring</h2>
        <div className="space-y-4">
          {events.map((event) => (
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
                    href={`/organizer/scoring/${event.id}/manage`}
                    className="inline-flex items-center justify-center text-base font-medium bg-blue-600 text-white rounded-md px-4 py-3 w-full hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <Eye size={18} className="mr-2" />
                    Kelola Scoring
                  </Link>
                  
                  <Link 
                    href={`/organizer/scoring/setup?eventId=${event.id}`}
                    className="inline-flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md px-4 py-2 w-full"
                  >
                    <Cog size={16} className="mr-2" />
                    Konfigurasi Scoring
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
