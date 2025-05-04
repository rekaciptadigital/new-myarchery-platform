import { EventStatus } from "../../core/models/event";

export interface TournamentFormData {
  // Basic Information
  name: string;
  description: string;
  tournamentType: "individual" | "team" | "mixed";
  visibility: "public" | "private" | "unlisted";
  inviteCode: string;
  
  // Location and Date
  location: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  
  // Countdown Settings
  countdown: {
    eventStart: boolean;
    registrationEnd: boolean;
  };
  
  // Pricing Settings
  pricingType: "single" | "multi";
  singlePrice: {
    amount: string;
    currency: string;
  };
  multiPricing: Array<{
    category: string;
    price: string;
    currency: string;
  }>;
  
  // Early Bird and Late Registration
  earlyBird: {
    enabled: boolean;
    endDate: string;
    discount: string;
  };
  lateRegistration: {
    enabled: boolean;
    startDate: string;
    fee: string;
  };
  
  // Quota Settings
  quotaType: "total" | "category";
  totalQuota: string;
  categoryQuotas: Array<{
    category: string;
    quota: string;
  }>;
  
  // Age Categories
  ageCategories: Array<{
    name: string;
    minAge: string;
    maxAge: string;
  }>;
  ageCalculation: "event" | "range";
  
  // Competition Format
  competitionFormat: "standard" | "fita" | "720" | "indoor" | "field" | "3d" | "flight" | "clout" | "custom";
  formatConfig: {
    rounds: string;
    distances: string[];
    customRoundEnabled: boolean;
    customRound: string;
    seriesCount: string;
    indoorDistance: string;
    fieldTargetCount: string;
    threeDTargetCount: string;
  };
  
  // Delegation Settings
  delegationType: "all" | "country" | "club" | "province" | "city";
  verifyDelegation: boolean;
  
  // Status and Basic Fields (from original model)
  status: EventStatus;
  date: string;
  timeStart?: string;
  timeEnd?: string;
  categories?: number;
  registrationFee?: number;
  maxParticipants?: number;
  scoringSystem?: 'standard' | 'modified' | 'custom';
  roundsSetup?: 'qualification_elimination' | 'elimination_only' | 'qualification_only';
}

export const initialTournamentFormState: TournamentFormData = {
  // Basic Information
  name: "",
  description: "",
  tournamentType: "individual",
  visibility: "public",
  inviteCode: "",
  
  // Location and Date
  location: "",
  startDate: "",
  endDate: "",
  registrationDeadline: "",
  
  // Countdown Settings
  countdown: {
    eventStart: true,
    registrationEnd: true
  },
  
  // Pricing Settings
  pricingType: "single",
  singlePrice: {
    amount: "",
    currency: "IDR"
  },
  multiPricing: [
    { category: "Recurve Men", price: "250000", currency: "IDR" },
    { category: "Recurve Women", price: "250000", currency: "IDR" }
  ],
  
  // Early Bird and Late Registration
  earlyBird: {
    enabled: false,
    endDate: "",
    discount: ""
  },
  lateRegistration: {
    enabled: false,
    startDate: "",
    fee: ""
  },
  
  // Quota Settings
  quotaType: "total",
  totalQuota: "",
  categoryQuotas: [
    { category: "Recurve Men", quota: "50" },
    { category: "Recurve Women", quota: "50" }
  ],
  
  // Age Categories
  ageCategories: [
    { name: "U-15", minAge: "10", maxAge: "15" },
    { name: "U-18", minAge: "16", maxAge: "18" },
    { name: "Senior", minAge: "19", maxAge: "45" },
    { name: "Master", minAge: "46", maxAge: "99" }
  ],
  ageCalculation: "event",
  
  // Competition Format
  competitionFormat: "standard",
  formatConfig: {
    rounds: "4",
    distances: ["70", "60", "50", "30"],
    customRoundEnabled: false,
    customRound: "",
    seriesCount: "2",
    indoorDistance: "18",
    fieldTargetCount: "24",
    threeDTargetCount: "24"
  },
  
  // Delegation Settings
  delegationType: "all",
  verifyDelegation: false,
  
  // Status and Basic Fields
  status: "Draft",
  date: "",
  timeStart: "",
  timeEnd: "",
  categories: 1,
  registrationFee: 0,
  maxParticipants: 100,
  scoringSystem: "standard",
  roundsSetup: "qualification_elimination"
};
