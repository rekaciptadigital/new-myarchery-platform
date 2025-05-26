import { Calendar, ChevronRight, MapPin, Tag, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/events";

interface EventCardProps {
  readonly event: Event;
  readonly onEdit?: (id: string) => void;
  readonly onDelete?: (id: string) => void;
}

const getStatusBadgeStyle = (status: string): string => {
  switch (status) {
    case "Publikasi":
      return "bg-green-100 text-green-800";
    case "Draft":
      return "bg-yellow-100 text-yellow-800";
    case "Berlangsung":
      return "bg-blue-100 text-blue-800";
    case "Selesai":
      return "bg-gray-100 text-gray-800";
    case "Dibatalkan":
      return "bg-red-100 text-red-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="mb-3 lg:mb-0 flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-slate-900">{event.name}</h3>
            <span 
              className={`ml-3 text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeStyle(event.status)}`}
            >
              {event.status}
            </span>
          </div>
          
          <p className="text-slate-600 text-sm mb-3 line-clamp-2">{event.description}</p>
          
          <div className="flex flex-wrap gap-y-2 text-sm text-slate-600">
            <div className="flex items-center mr-4">
              <Calendar size={16} className="mr-1 flex-shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center mr-4">
              <MapPin size={16} className="mr-1 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center mr-4">
              <Users size={16} className="mr-1 flex-shrink-0" />
              <span>{event.participants} peserta</span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-1 flex-shrink-0" />
              <span>{event.categories} kategori</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 lg:ml-4">
          <Link 
            href={`/events/${event.id}/configure`}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md px-3 py-1.5 transition-colors"
          >
            Konfigurasi
            <ChevronRight size={16} className="ml-1" />
          </Link>
          
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(event.id)}
            >
              Edit
            </Button>
          )}
          
          <Button variant="outline" size="sm">
            Preview
          </Button>
          
          {onDelete && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-600 hover:text-red-800 border-red-200 hover:border-red-300"
              onClick={() => onDelete(event.id)}
            >
              Hapus
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
