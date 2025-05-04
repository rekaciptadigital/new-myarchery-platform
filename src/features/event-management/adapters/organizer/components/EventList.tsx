import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, MapPin, Tag, Users } from "lucide-react";
import { Event } from "../../../core/models/event";

type EventListProps = {
  events: Event[];
  onEdit: (id: string) => void;
  onPreview: (id: string) => void;
};

export function EventList({ events, onEdit, onPreview }: Readonly<EventListProps>) {
  // Helper function to get status badge classes based on status
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'Publikasi':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Berlangsung':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg shadow-sm border p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="mb-3 lg:mb-0">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusBadgeClasses(event.status)}`}>
                  {event.status}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-3">{event.description}</p>
              <div className="flex flex-wrap gap-y-2 text-sm text-slate-600">
                <div className="flex items-center mr-4">
                  <Calendar size={16} className="mr-1" />
                  {event.date}
                </div>
                <div className="flex items-center mr-4">
                  <MapPin size={16} className="mr-1" />
                  {event.location}
                </div>
                <div className="flex items-center mr-4">
                  <Users size={16} className="mr-1" />
                  {event.participants} peserta
                </div>
                <div className="flex items-center">
                  <Tag size={16} className="mr-1" />
                  {event.categories} kategori
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/organizer/events/${event.id}/configure`}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md px-3 py-1.5"
              >
                Konfigurasi
                <ChevronRight size={16} className="ml-1" />
              </Link>
              <Button variant="outline" size="sm" onClick={() => onEdit(event.id)}>
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => onPreview(event.id)}>
                Preview
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
