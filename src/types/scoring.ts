export type ScoringStatus = "Draft" | "Active" | "Paused" | "Completed" | "Cancelled";
export type MatchStatus = "Pending" | "InProgress" | "Completed" | "Cancelled";
export type SessionType = "Qualification" | "Elimination" | "Final";
export type ScoreValidationStatus = "Valid" | "Invalid" | "Pending";

export interface ScoringEvent {
  readonly id: string;
  name: string;
  roundName: string;
  status: ScoringStatus;
  location: string;
  date: string;
  currentSession: string;
  activeArchers: number;
  completedScores: number;
  pendingScores: number;
  timeRemaining: string;
  categories: number;
  lastUpdated: Date;
}

export interface Archer {
  readonly id: string;
  name: string;
  club: string;
  category: string;
  class: string;
  gender: string;
  targetNo: string;
  status: MatchStatus;
  totalScore: number;
  qualificationScore?: number;
  memberSince: string;
}

export interface TargetAssignment {
  readonly id: string;
  targetNo: string;
  archerId: string;
  archerName: string;
  clubName: string;
  category: string;
  status: MatchStatus;
  totalScore: number;
  setScores: number[];
  currentEnd: number;
  totalEnds: number;
  judge: string;
  validationStatus: ScoreValidationStatus;
  lastScoreTime?: Date;
}

export interface ScoreEntry {
  readonly id: string;
  targetAssignmentId: string;
  endNumber: number;
  scores: number[];
  total: number;
  enteredBy: string;
  enteredAt: Date;
  validatedBy?: string;
  validatedAt?: Date;
  notes?: string;
}

export interface ScoringCategory {
  readonly id: string;
  name: string;
  type: string;
  class: string;
  gender?: string;
  distance: string;
  participants: number;
  activeParticipants: number;
}

export interface ScoringStatistics {
  totalEvents: number;
  activeEvents: number;
  totalArchers: number;
  activeJudges: number;
  completedScores: number;
  pendingScores: number;
  averageScore: number;
  highestScore: number;
}

export interface LeaderboardEntry {
  rank: number;
  archerId: string;
  name: string;
  club: string;
  category: string;
  totalScore: number;
  tens: number;
  xs: number;
  average: number;
}

export interface UpcomingMatch {
  readonly id: string;
  time: string;
  fieldOfPlay: string;
  category: string;
  round: string;
  participants: string[];
  status: MatchStatus;
}

export interface ScoringConfiguration {
  eventId: string;
  maxArrowsPerEnd: number;
  totalEnds: number;
  scoringSystem: "10-ring" | "5-ring";
  timePerEnd: number;
  allowScoreEdit: boolean;
  requireJudgeValidation: boolean;
  autoCalculateRankings: boolean;
}
