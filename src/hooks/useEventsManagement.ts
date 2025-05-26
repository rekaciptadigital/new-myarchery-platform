import { useState, useCallback, useMemo } from "react";
import { Event, EventStats, EventStatus } from "@/types/events";

const initialEvents: Event[] = [
  {
    id: "evt-123",
    name: "Kejuaraan Nasional Panahan 2025",
    description: "Kompetisi panahan nasional terbesar di Indonesia untuk tahun 2025.",
    location: "Lapangan Panahan Senayan, Jakarta",
    date: "15-17 Juni 2025",
    status: "Publikasi",
    participants: 80,
    categories: 8,
    type: "tournament",
    visibility: "public",
  },
  {
    id: "evt-124",
    name: "Archery Open Junior 2025",
    description: "Turnamen panahan untuk atlet junior dengan kategori U-15 dan U-18.",
    location: "GOR Arcadia, Bandung",
    date: "1-2 Juni 2025",
    status: "Draft",
    participants: 30,
    categories: 4,
    type: "tournament",
    visibility: "public",
  },
  {
    id: "evt-125",
    name: "Liga Panahan Kota 2025",
    description: "Kompetisi panahan antar klub di tingkat kota.",
    location: "Lapangan Panahan Kota, Surabaya",
    date: "25-27 April 2025",
    status: "Berlangsung",
    participants: 45,
    categories: 6,
    type: "league",
    visibility: "public",
  },
  {
    id: "evt-126",
    name: "Invitational Archery Tournament",
    description: "Turnamen panahan khusus undangan untuk klub-klub terpilih.",
    location: "Lapangan Utama, Yogyakarta",
    date: "8-9 Juli 2025",
    status: "Selesai",
    participants: 60,
    categories: 6,
    type: "tournament",
    visibility: "private",
  },
];

export function useEventsManagement() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stats = useMemo((): EventStats => {
    const totalEvents = events.length;
    const activeEvents = events.filter(e => 
      e.status === "Publikasi" || e.status === "Berlangsung"
    ).length;
    const totalParticipants = events.reduce((sum, e) => sum + e.participants, 0);
    
    const eventsByStatus = events.reduce((acc, event) => {
      acc[event.status] = (acc[event.status] || 0) + 1;
      return acc;
    }, {} as Record<EventStatus, number>);

    return {
      totalEvents,
      activeEvents,
      totalParticipants,
      eventsByStatus,
    };
  }, [events]);

  const getEventById = useCallback((id: string): Event | undefined => {
    return events.find(event => event.id === id);
  }, [events]);

  const createEvent = useCallback(async (eventData: Omit<Event, "id">): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEvent: Event = {
        ...eventData,
        id: `evt-${Date.now()}`,
      };
      
      setEvents(prev => [...prev, newEvent]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (id: string, updates: Partial<Event>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(prev => prev.map(event => 
        event.id === id ? { ...event, ...updates } : event
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update event");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filterEvents = useCallback((status?: EventStatus, type?: string): Event[] => {
    return events.filter(event => {
      if (status && event.status !== status) return false;
      if (type && event.type !== type) return false;
      return true;
    });
  }, [events]);

  return {
    events,
    stats,
    isLoading,
    error,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    filterEvents,
  };
}
