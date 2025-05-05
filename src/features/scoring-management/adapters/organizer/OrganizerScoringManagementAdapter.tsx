"use client";

import { useScoringManagement } from "../../hooks/use-scoring-management";
import { OrganizerScoringDashboard } from "./components/OrganizerScoringDashboard";
import { ScoringEventStatus } from "../../models/scoring-event";

/**
 * Adapter untuk menghubungkan domain scoring management dengan UI organizer
 */
export function OrganizerScoringManagementAdapter() {
  // Mengakses data dan fungsi dari hook
  const { events, stats, loading, error, calculateProgress, getStatusBadgeClasses } = useScoringManagement();

  // Menampilkan state loading
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-t-blue-600 border-r-blue-600 border-b-blue-200 border-l-blue-200 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-600">Memuat data scoring...</p>
        </div>
      </div>
    );
  }

  // Menampilkan state error
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Error</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  // Render UI dengan data yang sudah diambil
  return (
    <OrganizerScoringDashboard 
      events={events}
      stats={stats}
      calculateProgress={calculateProgress}
      getStatusBadgeClasses={(status: ScoringEventStatus) => getStatusBadgeClasses(status)}
    />
  );
}
