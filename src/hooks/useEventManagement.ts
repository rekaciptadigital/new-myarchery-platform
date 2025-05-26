import { useState, useCallback, useMemo } from "react";
import { Event, EventFormData, DashboardMetrics, EventStatus } from "@/types/event";

const statusList: EventStatus[] = ["Draft", "Publikasi", "Berlangsung", "Selesai", "Dibatalkan"];

const initialEvents: Event[] = [
  {
    id: 1,
    name: "Kejuaraan Nasional Panahan 2025",
    status: "Publikasi",
    participants: 80,
    income: 8000000,
    date: "2025-05-10",
  },
  {
    id: 2,
    name: "Archery Open Junior 2025",
    status: "Draft",
    participants: 20,
    income: 2000000,
    date: "2025-06-01",
  },
  {
    id: 3,
    name: "Liga Panahan Kota 2025",
    status: "Berlangsung",
    participants: 28,
    income: 2500000,
    date: "2025-04-25",
  },
];

export function useEventManagement() {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const metrics = useMemo((): DashboardMetrics => {
    const eventStats = statusList.map((status) => ({
      status,
      count: events.filter((e) => e.status === status).length,
    }));
    
    const totalParticipants = events.reduce((sum, e) => sum + e.participants, 0);
    const totalIncome = events.reduce((sum, e) => sum + e.income, 0);

    return { eventStats, totalParticipants, totalIncome };
  }, [events]);

  const addEvent = useCallback((formData: EventFormData) => {
    const newEvent: Event = {
      ...formData,
      id: Date.now(),
      participants: 0,
      income: 0,
    };
    setEvents(prev => [...prev, newEvent]);
  }, []);

  const updateEvent = useCallback((id: number, formData: EventFormData) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...formData } : event
    ));
  }, []);

  const deleteEvent = useCallback((id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  }, []);

  const getEventById = useCallback((id: number) => {
    return events.find(event => event.id === id);
  }, [events]);

  return {
    events,
    metrics,
    statusList,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
  };
}
