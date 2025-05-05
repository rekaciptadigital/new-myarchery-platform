import { ScoringEvent, ScoringStats } from "./models/scoring-event";

// Data dummy untuk event scoring
const scoringEventsMock: ScoringEvent[] = [
  {
    id: "123",
    name: "Kejuaraan Nasional Panahan 2025",
    roundName: "Kualifikasi",
    status: "Sedang Berlangsung",
    location: "Lapangan Panahan Senayan, Jakarta",
    date: "15-17 Juni 2025",
    currentSession: "Kualifikasi Putaran 2",
    activeArchers: 72,
    completedScores: 45,
    pendingScores: 27,
    timeRemaining: "01:30:00",
    categories: 8,
  },
  {
    id: "124",
    name: "Archery Open Junior 2025",
    roundName: "Eliminasi",
    status: "Menunggu Mulai",
    location: "GOR Arcadia, Bandung",
    date: "1-2 Juni 2025",
    currentSession: "Eliminasi 1/8",
    activeArchers: 36,
    completedScores: 0,
    pendingScores: 36,
    timeRemaining: "00:45:00",
    categories: 4,
  },
  {
    id: "125",
    name: "Liga Panahan Kota 2025",
    roundName: "Final",
    status: "Selesai",
    location: "Lapangan Panahan Kota, Surabaya",
    date: "25-27 April 2025",
    currentSession: "Final",
    activeArchers: 8,
    completedScores: 8,
    pendingScores: 0,
    timeRemaining: "00:00:00",
    categories: 6,
  },
  {
    id: "126",
    name: "Invitational Archery Tournament",
    roundName: "Kualifikasi",
    status: "Jeda",
    location: "Lapangan Utama, Yogyakarta",
    date: "8-9 Juli 2025",
    currentSession: "Kualifikasi Putaran 1",
    activeArchers: 48,
    completedScores: 32,
    pendingScores: 16,
    timeRemaining: "00:15:00",
    categories: 6,
  },
];

// Stats dummy untuk dashboard
const scoringStatsMock: ScoringStats = {
  activeEvents: 2,
  activeArchers: 108,
  completedScores: 77,
  activeJudges: 12,
};

/**
 * Repository untuk mengakses data scoring events
 * Dalam implementasi nyata, ini akan terhubung ke Supabase atau API lainnya
 */
export class ScoringManagementRepository {
  /**
   * Mengambil daftar scoring events
   */
  async getScoringEvents(): Promise<ScoringEvent[]> {
    // Simulasi network request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(scoringEventsMock);
      }, 500);
    });
  }

  /**
   * Mengambil statistik scoring
   */
  async getScoringStats(): Promise<ScoringStats> {
    // Simulasi network request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(scoringStatsMock);
      }, 300);
    });
  }

  /**
   * Mengambil scoring event berdasarkan ID
   */
  async getScoringEventById(id: string): Promise<ScoringEvent | null> {
    // Simulasi network request
    return new Promise((resolve) => {
      setTimeout(() => {
        const event = scoringEventsMock.find((event) => event.id === id);
        resolve(event || null);
      }, 300);
    });
  }
}
