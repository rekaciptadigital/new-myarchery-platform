import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  BarChart3, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Eye, 
  Medal, 
  RefreshCw,
  Target, 
  Timer, 
  Users 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScoringEvent } from "@/types/scoring";

interface ScoringEventCardProps {
  readonly event: ScoringEvent;
  readonly onStatusChange?: (id: string, status: ScoringEvent["status"]) => void;
  readonly onRefresh?: (id: string) => void;
}

const getStatusBadgeStyle = (status: ScoringEvent["status"]): string => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Draft":
      return "bg-yellow-100 text-yellow-800";
    case "Paused":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-gray-100 text-gray-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

const calculateProgress = (completed: number, total: number): number => {
  return Math.floor((completed / total) * 100);
};

export function ScoringEventCard({ event, onStatusChange, onRefresh }: ScoringEventCardProps) {
  const progress = calculateProgress(event.completedScores, event.activeArchers);

  const handleStatusChange = (newStatus: ScoringEvent["status"]) => {
    onStatusChange?.(event.id, newStatus);
  };

  const handleRefresh = () => {
    onRefresh?.(event.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between">
        <div className="mb-3 lg:mb-0 lg:pr-6 lg:w-8/12">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-slate-900">{event.name}</h3>
            <span className={`ml-3 text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeStyle(event.status)}`}>
              {event.status}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-y-2 text-sm text-slate-600 mb-3">
            <div className="flex items-center mr-4">
              <Calendar size={16} className="mr-1 flex-shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center mr-4">
              <Target size={16} className="mr-1 flex-shrink-0" />
              <span>{event.roundName}</span>
            </div>
            <div className="flex items-center mr-4">
              <Users size={16} className="mr-1 flex-shrink-0" />
              <span>{event.activeArchers} pemanah</span>
            </div>
            <div className="flex items-center">
              <Medal size={16} className="mr-1 flex-shrink-0" />
              <span>{event.categories} kategori</span>
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
                <span className={`font-medium ${event.status === 'Active' ? 'text-green-600' : 'text-slate-600'}`}>
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
              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-slate-500">
            Progress: {progress}% skor tercatat
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
            className="inline-flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md px-4 py-2 w-full transition-colors"
          >
            <Medal size={16} className="mr-2" />
            Leaderboard
            <ChevronRight size={16} className="ml-1" />
          </Link>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <BarChart3 size={16} className="mr-2" />
              Statistik
            </Button>
            
            {onRefresh && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="px-3"
                title="Refresh data"
              >
                <RefreshCw size={16} />
              </Button>
            )}
          </div>
          
          {onStatusChange && event.status === "Active" && (
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleStatusChange("Paused")}
                className="flex-1 text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              >
                Jeda
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleStatusChange("Completed")}
                className="flex-1 text-green-600 border-green-600 hover:bg-green-50"
              >
                Selesai
              </Button>
            </div>
          )}
          
          {onStatusChange && event.status === "Paused" && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleStatusChange("Active")}
              className="w-full text-green-600 border-green-600 hover:bg-green-50"
            >
              Lanjutkan
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
