import React from 'react';
import { TournamentCreationForm } from '../../components/TournamentCreationForm';
import { TournamentService } from '../../core/services/tournament-service';
import { TournamentFormData } from '../../core/models/tournament';

// Define the props interface for TournamentCreationForm
interface TournamentCreationFormProps {
  initialData?: Partial<TournamentFormData>;
  onSubmit: (formData: TournamentFormData) => Promise<string>;
  isEditMode: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

// Type assertion for the TournamentCreationForm component
const TypedTournamentCreationForm = TournamentCreationForm as React.ComponentType<TournamentCreationFormProps>;

interface TournamentOrganizerAdapterProps {
  readonly eventId?: string;
  readonly initialData?: Partial<TournamentFormData>;
  readonly onSubmitSuccess?: (tournamentId: string) => void;
}

/**
 * TournamentOrganizerAdapter - Role-specific adapter for tournament management
 * 
 * This adapter handles the organizer-specific implementation for tournament
 * creation, editing, and management.
 */
export function TournamentOrganizerAdapter({
  eventId,
  initialData,
  onSubmitSuccess
}: TournamentOrganizerAdapterProps) {
  // Organizer-specific permissions and functionality
  const canEdit = true; // In the future, this could check organizer permissions
  const canDelete = true; // Same as above
  
  const handleSubmit = async (formData: TournamentFormData) => {
    try {
      let tournamentId: string;
      
      if (eventId) {
        await TournamentService.updateTournament(eventId, formData);
        tournamentId = eventId;
      } else {
        tournamentId = await TournamentService.createTournament(formData);
      }
      
      if (onSubmitSuccess) {
        onSubmitSuccess(tournamentId);
      }
      
      return tournamentId;
    } catch (error) {
      console.error('Error submitting tournament data:', error);
      throw error;
    }
  };
  
  return (
    <div className="tournament-organizer-wrapper">
      <TypedTournamentCreationForm 
        initialData={initialData}
        onSubmit={handleSubmit}
        isEditMode={!!eventId}
        canEdit={canEdit}
        canDelete={canDelete}
      />
    </div>
  );
}