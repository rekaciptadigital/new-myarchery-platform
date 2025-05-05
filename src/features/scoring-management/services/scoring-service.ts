import { ScoringEvent, ScoringEventStatus, ScoringStats } from "../models/scoring-event";
import { ScoringManagementRepository } from "../repository";

/**
 * Service untuk mengelola logika bisnis scoring
 */
export class ScoringManagementService {
  private readonly repository: ScoringManagementRepository;

  constructor() {
    this.repository = new ScoringManagementRepository();
  }

  /**
   * Mengambil daftar scoring events
   */
  async getScoringEvents(): Promise<ScoringEvent[]> {
    return await this.repository.getScoringEvents();
  }

  /**
   * Mengambil statistik scoring
   */
  async getScoringStats(): Promise<ScoringStats> {
    return await this.repository.getScoringStats();
  }

  /**
   * Mengambil scoring event berdasarkan ID
   */
  async getScoringEventById(id: string): Promise<ScoringEvent | null> {
    return await this.repository.getScoringEventById(id);
  }

  /**
   * Menghitung persentase progres scoring
   */
  calculateProgress(completed: number, total: number): number {
    return Math.floor((completed / total) * 100);
  }

  /**
   * Mendapatkan kelas CSS untuk badge status
   */
  getStatusBadgeClasses(status: ScoringEventStatus): string {
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
}
