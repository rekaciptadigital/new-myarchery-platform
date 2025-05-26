import { useState, useCallback, useMemo } from "react";
import { ScoringEvent, ScoringStatistics } from "@/types/scoring";

const mockScoringEvents: ScoringEvent[] = [
  {
    id: "123",
    name: "Kejuaraan Nasional Panahan 2025",
    roundName: "Kualifikasi",
    status: "Active",
    location: "Lapangan Panahan Senayan, Jakarta",
    date: "15-17 Juni 2025",
    currentSession: "Kualifikasi Putaran 2",
    activeArchers: 72,
    completedScores: 45,
    pendingScores: 27,
    timeRemaining: "01:30:00",
    categories: 8,
    lastUpdated: new Date(),
  },
  {
    id: "124",
    name: "Archery Open Junior 2025",
    roundName: "Eliminasi",
    status: "Draft",
    location: "GOR Arcadia, Bandung",
    date: "1-2 Juni 2025",
    currentSession: "Eliminasi 1/8",
    activeArchers: 36,
    completedScores: 0,
    pendingScores: 36,
    timeRemaining: "00:45:00",
    categories: 4,
    lastUpdated: new Date(),
  },
];

export function useScoring() {
  const [events, setEvents] = useState<ScoringEvent[]>(mockScoringEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const statistics = useMemo((): ScoringStatistics => {
    const totalEvents = events.length;
    const activeEvents = events.filter(e => e.status === "Active").length;
    const totalArchers = events.reduce((sum, e) => sum + e.activeArchers, 0);
    const completedScores = events.reduce((sum, e) => sum + e.completedScores, 0);
    const pendingScores = events.reduce((sum, e) => sum + e.pendingScores, 0);

    return {
      totalEvents,
      activeEvents,
      totalArchers,
      activeJudges: 12, // Mock data
      completedScores,
      pendingScores,
      averageScore: 0, // Would be calculated from actual scores
      highestScore: 0, // Would be calculated from actual scores
    };
  }, [events]);

  const getEventById = useCallback((id: string): ScoringEvent | undefined => {
    return events.find(event => event.id === id);
  }, [events]);

  const updateEventStatus = useCallback(async (
    id: string, 
    status: ScoringEvent["status"]
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(prev => prev.map(event => 
        event.id === id 
          ? { ...event, status, lastUpdated: new Date() }
          : event
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update event status");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshEventData = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to refresh data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEvents(prev => prev.map(event => 
        event.id === id 
          ? { ...event, lastUpdated: new Date() }
          : event
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh event data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    events,
    statistics,
    isLoading,
    error,
    getEventById,
    updateEventStatus,
    refreshEventData,
  };
}
