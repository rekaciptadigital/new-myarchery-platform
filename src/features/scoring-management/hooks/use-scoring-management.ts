import { useState, useEffect, useMemo } from "react";
import { ScoringEvent, ScoringStats } from "../models/scoring-event";
import { ScoringManagementService } from "../services/scoring-service";

/**
 * Hook untuk mengakses data dan fungsi scoring management
 */
export function useScoringManagement() {
  const [events, setEvents] = useState<ScoringEvent[]>([]);
  const [stats, setStats] = useState<ScoringStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Use useMemo to ensure service instance stays stable across renders
  const service = useMemo(() => new ScoringManagementService(), []);

  // Mengambil data saat komponen dipasang
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [eventsData, statsData] = await Promise.all([
          service.getScoringEvents(),
          service.getScoringStats()
        ]);
        
        setEvents(eventsData);
        setStats(statsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [service]); // Now this is stable

  return {
    events,
    stats,
    loading,
    error,
    calculateProgress: service.calculateProgress,
    getStatusBadgeClasses: service.getStatusBadgeClasses
  };
}
