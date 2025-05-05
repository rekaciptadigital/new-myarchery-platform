export type ScoringEventStatus = 'Sedang Berlangsung' | 'Menunggu Mulai' | 'Jeda' | 'Selesai';

export interface ScoringEvent {
  id: string;
  name: string;
  roundName: string;
  status: ScoringEventStatus;
  location: string;
  date: string;
  currentSession: string;
  activeArchers: number;
  completedScores: number;
  pendingScores: number;
  timeRemaining: string;
  categories: number;
}

export interface ScoringStats {
  activeEvents: number;
  activeArchers: number;
  completedScores: number;
  activeJudges: number;
}
