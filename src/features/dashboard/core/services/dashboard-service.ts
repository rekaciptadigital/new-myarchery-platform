import { Event, EventFormData, StatusStat } from "../models/dashboard";

// Initial demo data - in a real app, this would come from Supabase
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

export const statusList = ["Draft", "Publikasi", "Berlangsung", "Selesai", "Dibatalkan"];

export const DashboardService = {
  // In a real app, these methods would call Supabase
  async getEvents(): Promise<Event[]> {
    // Simulate API call
    return Promise.resolve(initialEvents);
  },
  
  async addEvent(eventData: EventFormData): Promise<Event> {
    const newEvent: Event = {
      ...eventData,
      id: Date.now(),
      participants: 0,
      income: 0,
    };
    
    // In a real app, you would save to Supabase here
    return Promise.resolve(newEvent);
  },
  
  async updateEvent(id: number, eventData: EventFormData): Promise<Event> {
    // Find and update the event
    const event = initialEvents.find(e => e.id === id);
    if (!event) {
      throw new Error("Event not found");
    }
    
    const updatedEvent = { ...event, ...eventData };
    // In a real app, you would update in Supabase here
    
    return Promise.resolve(updatedEvent);
  },
  
  async deleteEvent(id: number): Promise<void> {
    // In a real app, you would delete from Supabase here
    return Promise.resolve();
  },
  
  getStatusStats(events: Event[]): StatusStat[] {
    return statusList.map((status) => ({
      status,
      count: events.filter((e) => e.status === status).length,
    }));
  },
  
  getTotalParticipants(events: Event[]): number {
    return events.reduce((sum, e) => sum + e.participants, 0);
  },
  
  getTotalIncome(events: Event[]): number {
    return events.reduce((sum, e) => sum + e.income, 0);
  }
};
