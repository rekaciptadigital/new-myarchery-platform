export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  status: EventStatus;
  participants: number;
  categories: number;
}

export type EventStatus = 'Publikasi' | 'Draft' | 'Berlangsung' | 'Selesai';

export interface EventFormData {
  name: string;
  description: string;
  location: string;
  date: string;
  status: EventStatus;
}

export interface EventStatistics {
  totalEvents: number;
  activeEvents: number;
  totalParticipants: number;
}
