export interface Event {
  id: number;
  name: string;
  status: string;
  participants: number;
  income: number;
  date: string;
}

export type EventStatus = "Draft" | "Publikasi" | "Berlangsung" | "Selesai" | "Dibatalkan";

export interface EventFormData {
  name: string;
  date: string;
  status: string;
}

export interface StatusStat {
  status: string;
  count: number;
}
