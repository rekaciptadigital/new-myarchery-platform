export interface ScoringSystemEvent {
  id: string;
  name: string;
  roundName: string;
  status: string;
  location: string;
  date: string;
  currentSession: string;
  activeArchers: number;
  completedScores: number;
  pendingScores: number;
  timeRemaining: string;
  categories: number;
}

export interface ScoringSystemCategory {
  id: number;
  name: string;
}

export interface ScoringSystemTarget {
  targetNo: string;
  archerName: string;
  clubName: string;
  category: string;
  status: string;
  totalScore: number;
  setScores: number[];
  end: number;
  judge: string;
}
