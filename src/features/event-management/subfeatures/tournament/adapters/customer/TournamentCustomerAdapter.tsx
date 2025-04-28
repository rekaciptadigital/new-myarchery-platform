import React from 'react';
import Image from 'next/image';
import { TournamentService } from '../../core/services/tournament-service';
import { TournamentFormData } from '../../core/models/tournament';

interface TournamentCustomerAdapterProps {
  readonly tournamentId: string;
}

/**
 * TournamentCustomerAdapter - Role-specific adapter for tournament view
 * 
 * This adapter handles the customer/athlete-specific implementation for tournament
 * viewing and registration experience.
 */
export function TournamentCustomerAdapter({
  tournamentId
}: TournamentCustomerAdapterProps) {
  const [tournamentData, setTournamentData] = React.useState<TournamentFormData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);
        // Replace with the correct method from TournamentService
        // Assuming there might be a getTournamentById method or similar
        const data = await TournamentService.getTournamentById(tournamentId);
        // If that doesn't exist either, you may need to add this method to TournamentService
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
  }, [tournamentId]);
  
  if (loading) {
    return <div className="p-4">Loading tournament details...</div>;
  }
  
  if (error || !tournamentData) {
    return <div className="p-4 text-red-600">{error ?? 'Tournament not found'}</div>;
  }
  
  return (
    <div className="tournament-customer-view">
      {/* Tournament Header */}
      <div className="relative">
        {tournamentData.bannerImage && (
          <div className="h-40 md:h-64 overflow-hidden rounded-lg relative">
            <Image 
              src={typeof tournamentData.bannerImage === 'string' ? tournamentData.bannerImage : '#'}
              alt={tournamentData.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority // For banner images above the fold
            />
          </div>
        )}
        
        <div className="mt-4 flex items-center">
          {tournamentData.logo && (
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-100 flex-shrink-0 relative">
              <Image 
                src={typeof tournamentData.logo === 'string' ? tournamentData.logo : '#'}
                alt="Logo"
                fill
                sizes="64px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          
          <div>
            <h1 className="text-2xl font-bold">{tournamentData.name}</h1>
            <p className="text-gray-600">
              {new Date(tournamentData.startDate).toLocaleDateString()} - 
              {tournamentData.endDate ? new Date(tournamentData.endDate).toLocaleDateString() : 'TBD'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Tournament Details */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About This Tournament</h2>
            <div className="prose max-w-none">
              {tournamentData.description}
            </div>
          </section>
          
          {/* Rules */}
          {tournamentData.generalRules && (
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Tournament Rules</h2>
              <div className="prose max-w-none">
                {tournamentData.generalRules}
              </div>
            </section>
          )}
        </div>
        
        {/* Registration Panel */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Registration</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Registration Period</p>
                <p className="font-medium">
                  {tournamentData.registrationStartDate ? 
                    new Date(tournamentData.registrationStartDate).toLocaleDateString() : 'Now'} - 
                  {new Date(tournamentData.registrationEndDate).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Event Type</p>
                <p className="font-medium">{tournamentData.eventType}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">
                  {tournamentData.locationType === 'offline' 
                    ? `${tournamentData.venue}, ${tournamentData.city}` 
                    : 'Online Event'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Entry Fee</p>
                <p className="font-medium">
                  {tournamentData.pricingType === 'single' && tournamentData.singlePrice
                    ? `${tournamentData.singlePrice.currency} ${tournamentData.singlePrice.price}`
                    : 'Multiple categories available'}
                </p>
              </div>
              
              <button className="w-full py-3 bg-primary-600 text-white rounded-md font-medium">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}