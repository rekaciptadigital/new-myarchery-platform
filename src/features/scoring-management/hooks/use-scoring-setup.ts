import { useState, useEffect, useMemo } from "react";
import { ScoringSetup } from "../models/scoring-setup";
import { ScoringSetupService } from "../services/scoring-setup-service";

/**
 * Hook untuk mengakses data setup scoring
 */
export function useScoringSetup() {
  const [setup, setSetup] = useState<ScoringSetup | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Use useMemo to ensure the service instance remains stable across renders
  const service = useMemo(() => new ScoringSetupService(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await service.getScoringSetupData();
        setSetup(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [service]); // Now this dependency is stable

  return {
    setup,
    loading,
    error
  };
}
