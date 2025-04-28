import React from 'react';
import { TournamentService } from '../../core/services/tournament-service';
import { TournamentFormData } from '../../core/models/tournament';

interface TournamentAdminAdapterProps {
  readonly tournamentId?: string; // Optional for create new scenario
}

/**
 * TournamentAdminAdapter - Role-specific adapter for tournament administration
 * 
 * This adapter handles the administrative implementation for tournament
 * creation, editing, and management features.
 */
export function TournamentAdminAdapter({
  tournamentId
}: TournamentAdminAdapterProps) {
  const [tournamentData, setTournamentData] = React.useState<TournamentFormData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    // If tournamentId is provided, fetch existing tournament data
    if (tournamentId) {
      const fetchTournament = async () => {
        try {
          setLoading(true);
          const data = await TournamentService.getTournamentById(tournamentId);
          setTournamentData(data);
          setError(null);
        } catch (err) {
          console.error('Error fetching tournament:', err);
          setError('Unable to load tournament details. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchTournament();
    } else {
      // No tournamentId means we're creating a new tournament
      setLoading(false);
    }
  }, [tournamentId]);
  
  if (loading) {
    return <div className="p-4">Loading tournament details...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }
  
  return (
    <div className="tournament-admin-view">
      <h1 className="text-2xl font-bold mb-6">
        {tournamentId ? 'Edit Tournament' : 'Create New Tournament'}
      </h1>
      
      {/* Tournament management interface would go here */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600">
          Tournament admin interface for {tournamentId ? `tournament ID: ${tournamentId}` : 'new tournament'}
        </p>
        {/* Show tournament data if available */}
        {tournamentData && (
          <div className="mt-4">
            <h2 className="text-lg font-medium">Current Tournament Data</h2>
            <p>Name: {tournamentData.name}</p>
            <p>Dates: {tournamentData.startDate} to {tournamentData.endDate}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>
    </div>
  );
}
