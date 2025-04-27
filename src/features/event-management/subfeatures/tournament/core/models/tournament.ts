/**
 * Tournament data models
 */

export interface AgeCategory {
  name: string;
  minAge: number | string;
  maxAge: number | string;
}

export interface Document {
  title: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
}

// Interface for single pricing option
export interface SinglePrice {
  // Add price property
  price: number;
  // Add currency property
  currency: string;
}

// Interface for pricing category option
export interface PricingCategory {
  category: string;
  // Change type to number
  price: number;
  currency: string;
}

// Define a type for early bird settings
export interface EarlyBirdSettings {
  enabled?: boolean;
  endDate?: string; // ISO date string
  discount?: number | string; // Percentage or fixed amount? Assuming percentage based on input props
}

// Define a type for late registration settings
export interface LateRegistrationSettings {
  enabled?: boolean;
  startDate?: string; // ISO date string
  fee?: number | string; // Percentage or fixed amount? Assuming percentage based on input props
}

// Define a type for category quotas
export interface CategoryQuota {
  category: string;
  quota: number | string; // Allow string for input flexibility
}

// Define a type alias for image inputs
export type ImageInput = File | string | null;

// Define the DocumentRequirement interface
export interface DocumentRequirement {
  name: string;
  description: string;
  required: boolean;
}

// Define a type for social media links
export interface SocialMediaLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
}

// Define a type for countdown settings
export interface CountdownSettings {
  eventStart?: boolean;
  registrationEnd?: boolean;
}

// Define a union type for possible form field values
export type TournamentFormDataValue =
  | string
  | number
  | boolean
  | File
  | null
  | undefined
  | string[]
  | PricingCategory[]
  | CategoryQuota[]
  | AgeCategory[]
  | DocumentRequirement[]
  | CountdownSettings
  | SocialMediaLinks
  | SinglePrice
  | EarlyBirdSettings
  | LateRegistrationSettings;

export interface TournamentFormData {
  // Basic Info
  name: string;
  description: string;
  organizer?: string; // Added
  visibility?: 'public' | 'unlisted' | 'private'; // Added
  eventType: string;
  logo: ImageInput;
  bannerImage: ImageInput;
  featuredImage: ImageInput;

  // Location
  locationType: "offline" | "online";
  address?: string;
  city?: string;
  province?: string;
  venue?: string; // Assuming 'venue' exists based on TournamentLocationTab usage
  venueDetails?: string; // Keep if used elsewhere
  googleMapsUrl?: string;
  onlineLink?: string; // Add onlineLink property

  // Schedule Fields
  startDate: string;
  endDate?: string; // Made optional based on tab code
  registrationStartDate?: string; // Made optional based on tab code
  registrationEndDate: string;
  startTime?: string;
  endTime?: string;
  timezone?: string;
  technicalMeetingDate?: string;
  technicalMeetingTime?: string;
  technicalMeetingLocation?: string;
  countdown?: CountdownSettings; // Added

  // Contact Info
  contactEmail?: string; // Added
  contactPhone?: string; // Added
  eventWebsite?: string; // Added
  socialMedia?: SocialMediaLinks; // Added

  // Pricing & Quota
  maxParticipants: number; // Ensure this is handled if needed
  // registrationType: string; // Ensure this is handled if needed
  // pricingModel: string; // Ensure this is handled if needed
  // basePrice: number; // Ensure this is handled if needed
  pricingType?: 'single' | 'multi'; // Added
  singlePrice?: SinglePrice; // Added
  multiPricing?: PricingCategory[]; // Added
  earlyBird?: EarlyBirdSettings; // Added
  lateRegistration?: LateRegistrationSettings; // Added
  quotaType?: 'total' | 'category'; // Added
  totalQuota?: number | string; // Added
  categoryQuotas?: CategoryQuota[]; // Added

  // Categories & Format Fields
  competitionFormat?: string;
  numberOfRounds?: string;
  numberOfSeries?: string;
  customRoundEnabled?: boolean;
  customRoundDescription?: string;
  roundDistances?: string[];
  indoorDistance?: string;
  numberOfTargets?: string;
  numberOf3DTargets?: string;
  ageCalculationMethod?: 'competitionDate' | 'yearOnly' | 'birthDateRange';
  autoPlaceByAge?: boolean;
  ageCategories?: AgeCategory[];

  // Documentation
  generalRules: string;
  technicalRules?: string;
  dressCode?: string;
  requireDocumentUpload: boolean;
  documentRequirements?: DocumentRequirement[];
  schedule?: string;
  rulesFileUrl?: string;
  rulesFileName?: string;
  scheduleFileUrl?: string;
  scheduleFileName?: string;
  termsAndConditions?: string;
  requireTermsAcceptance: boolean;
  status?: 'draft' | 'published';
}