export type EventStatus = "Draft" | "Publikasi" | "Berlangsung" | "Selesai" | "Dibatalkan";

export interface Event {
  id: number;
  name: string;
  status: EventStatus;
  participants: number;
  income: number;
  date: string;
}

export interface EventFormData {
  name: string;
  date: string;
  status: EventStatus;
}

export interface EventStats {
  status: EventStatus;
  count: number;
}

export interface DashboardMetrics {
  totalParticipants: number;
  totalIncome: number;
  eventStats: EventStats[];
}
