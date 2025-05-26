export type EventStatus = "Draft" | "Publikasi" | "Berlangsung" | "Selesai" | "Dibatalkan";
export type EventVisibility = "public" | "private" | "unlisted";
export type EventType = "tournament" | "league" | "series" | "workshop" | "training";
export type DelegationType = "all" | "country" | "province" | "city" | "club";
export type PricingType = "single" | "multi";
export type QuotaType = "total" | "category";

export interface Event {
  readonly id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  status: EventStatus;
  participants: number;
  categories: number;
  type: EventType;
  visibility: EventVisibility;
}

export interface EventFormData {
  name: string;
  description: string;
  type: EventType;
  visibility: EventVisibility;
  inviteCode?: string;
  location: string;
  startDate: string;
  endDate?: string;
  registrationDeadline: string;
}

export interface EventPricing {
  type: PricingType;
  options: PricingOption[];
  earlyBird: EarlyBirdSettings;
  lateRegistration: LateRegistrationSettings;
}

export interface PricingOption {
  category: string;
  price: number;
  currency: string;
}

export interface EarlyBirdSettings {
  enabled: boolean;
  endDate: string;
  discount: number;
}

export interface LateRegistrationSettings {
  enabled: boolean;
  startDate: string;
  fee: number;
}

export interface AgeCategory {
  readonly id: string;
  name: string;
  minAge: number;
  maxAge: number;
}

export interface EventQuota {
  type: QuotaType;
  total?: number;
  perCategory?: CategoryQuota[];
}

export interface CategoryQuota {
  category: string;
  quota: number;
}

export interface CountdownSettings {
  eventStart: boolean;
  registrationEnd: boolean;
  registrationEndDate?: string;
}

export interface EventConfiguration {
  basicInfo: EventFormData;
  pricing: EventPricing;
  quota: EventQuota;
  ageCategories: AgeCategory[];
  delegationType: DelegationType;
  countdown: CountdownSettings;
}

export interface EventTypeOption {
  readonly id: EventType;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  popular?: boolean;
  coming?: boolean;
}

export interface EventStats {
  totalEvents: number;
  activeEvents: number;
  totalParticipants: number;
  eventsByStatus: Record<EventStatus, number>;
}
