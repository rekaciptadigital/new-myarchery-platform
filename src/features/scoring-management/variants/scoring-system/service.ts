import { ScoringSystemEvent, ScoringSystemTarget, ScoringSystemCategory } from "./model";

export class ScoringSystemService {
  /**
   * Mendapatkan detail event scoring
   * @param eventId ID event
   */
  async getEventDetails(eventId: string): Promise<ScoringSystemEvent> {
    // Mock data untuk keperluan demo
    return {
      id: eventId,
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
    };
  }

  /**
   * Mendapatkan daftar kategori
   */
  async getCategories(): Promise<ScoringSystemCategory[]> {
    return [
      { id: 1, name: "Recurve Senior Putra" },
      { id: 2, name: "Recurve Senior Putri" },
      { id: 3, name: "Compound Senior Putra" },
      { id: 4, name: "Compound Senior Putri" },
      { id: 5, name: "Barebow Senior Putra" },
      { id: 6, name: "Barebow Senior Putri" },
      { id: 7, name: "Traditional Senior Putra" },
      { id: 8, name: "Traditional Senior Putri" },
    ];
  }

  /**
   * Mendapatkan daftar target assignment
   */
  async getTargetAssignments(): Promise<ScoringSystemTarget[]> {
    return [
      { 
        targetNo: "01A", 
        archerName: "Ahmad Fauzi", 
        clubName: "Arcadia Archery Club", 
        category: "Recurve Senior Putra",
        status: "Selesai",
        totalScore: 278,
        setScores: [10, 9, 10, 9, 8, 10, 10, 7, 9, 8, 9, 10, 9, 9, 10, 10, 9, 8, 10, 9, 9, 9, 10, 10],
        end: 8,
        judge: "Budi Santoso"
      },
      { 
        targetNo: "01B", 
        archerName: "Dimas Prayoga", 
        clubName: "Golden Arrow Archery", 
        category: "Recurve Senior Putra",
        status: "Selesai",
        totalScore: 265,
        setScores: [9, 8, 9, 10, 8, 7, 9, 9, 8, 10, 8, 9, 10, 8, 9, 10, 9, 8, 9, 10, 8, 9, 9, 8],
        end: 8,
        judge: "Budi Santoso"
      },
      // ... Tambahkan data target assignments lainnya
    ];
  }

  /**
   * Menghitung progress scoring
   */
  calculateProgress(completed: number, total: number): number {
    return Math.floor((completed / total) * 100);
  }

  /**
   * Mendapatkan kelas untuk status badge
   */
  getStatusBadgeClasses(status: string): string {
    switch (status) {
      case 'Sedang Berlangsung':
        return 'bg-green-100 text-green-800';
      case 'Menunggu Mulai':
        return 'bg-yellow-100 text-yellow-800';
      case 'Jeda':
        return 'bg-blue-100 text-blue-800';
      case 'Selesai':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  }

  /**
   * Mendapatkan kelas untuk archer status badge
   */
  getArcherStatusBadgeClasses(status: string): string {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-800';
      case 'Tertunda':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sedang Berlangsung':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  }
}
