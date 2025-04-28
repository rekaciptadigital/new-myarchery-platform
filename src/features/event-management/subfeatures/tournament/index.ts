/**
 * Tournament subfeature public API
 */

// Export core models and types
export type { 
  TournamentFormData, 
  AgeCategory,
  PricingCategory,
  CategoryQuota,
  EarlyBirdSettings,
  LateRegistrationSettings,
  DocumentRequirement
} from './core/models/tournament';

// Export core services
export { TournamentService } from './core/services/tournament-service';

// Export role-specific adapters
export { TournamentAdminAdapter } from './adapters/admin/TournamentAdminAdapter';
export { TournamentOrganizerAdapter } from './adapters/organizer/TournamentOrganizerAdapter';
export { TournamentCustomerAdapter } from './adapters/customer/TournamentCustomerAdapter';

// We don't export internal components directly,
// they should only be used through the adapters