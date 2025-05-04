import { Event, EventFormData, EventStatistics } from "../core/models/event";

// Mock data - would be replaced with Supabase client in production
const events = [
  {
    id: "123",
    name: "Kejuaraan Nasional Panahan 2025",
    description: "Kompetisi panahan nasional terbesar di Indonesia untuk tahun 2025.",
    location: "Lapangan Panahan Senayan, Jakarta",
    date: "15-17 Juni 2025",
    status: "Publikasi",
    participants: 80,
    categories: 8,
  },
  {
    id: "124",
    name: "Archery Open Junior 2025",
    description: "Turnamen panahan untuk atlet junior dengan kategori U-15 dan U-18.",
    location: "GOR Arcadia, Bandung",
    date: "1-2 Juni 2025",
    status: "Draft",
    participants: 30,
    categories: 4,
  },
  {
    id: "125",
    name: "Liga Panahan Kota 2025",
    description: "Kompetisi panahan antar klub di tingkat kota.",
    location: "Lapangan Panahan Kota, Surabaya",
    date: "25-27 April 2025",
    status: "Berlangsung",
    participants: 45,
    categories: 6,
  },
  {
    id: "126",
    name: "Invitational Archery Tournament",
    description: "Turnamen panahan khusus undangan untuk klub-klub terpilih.",
    location: "Lapangan Utama, Yogyakarta",
    date: "8-9 Juli 2025",
    status: "Selesai",
    participants: 60,
    categories: 6,
  },
];

export class EventRepository {
  async getEvents(): Promise<Event[]> {
    // In real implementation, this would call Supabase
    return Promise.resolve(events as Event[]);
  }

  async getEventById(id: string): Promise<Event | null> {
    const event = events.find(event => event.id === id);
    return Promise.resolve(event as Event || null);
  }

  async createEvent(eventData: EventFormData): Promise<Event> {
    // Mock implementation
    const newEvent = {
      ...eventData,
      id: Math.random().toString(36).substring(2, 9),
      participants: 0,
      categories: 1,
    };
    
    // In real implementation, this would insert to Supabase
    return Promise.resolve(newEvent as Event);
  }

  async updateEvent(id: string, eventData: Partial<EventFormData>): Promise<Event> {
    // Mock implementation
    const event = events.find(event => event.id === id);
    if (!event) throw new Error("Event not found");
    
    // In real implementation, this would update Supabase
    return Promise.resolve({...event, ...eventData} as Event);
  }

  async deleteEvent(id: string): Promise<void> {
    // Mock implementation - in real code we would delete the event with this id
    console.log(`Event with id ${id} would be deleted`);
    
    // In real implementation, this would delete from Supabase
    return Promise.resolve();
  }

  async getEventStatistics(): Promise<EventStatistics> {
    const activeEvents = events.filter(
      e => e.status === "Publikasi" || e.status === "Berlangsung"
    ).length;
    
    const totalParticipants = events.reduce(
      (sum, event) => sum + event.participants, 0
    );
    
    return Promise.resolve({
      totalEvents: events.length,
      activeEvents,
      totalParticipants
    });
  }
}
