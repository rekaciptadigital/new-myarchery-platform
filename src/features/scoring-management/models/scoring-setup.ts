export interface EventDetail {
  id: string;
  name: string;
  location: string;
  date: string;
  currentSession: string;
  activeArchers: number;
  categories: number;
  status: string;
}

export interface ScoringMenu {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  path: string;
}

export interface ScoringStatistic {
  id: string;
  title: string;
  value: number;
  secondaryInfo: string;
  trend: string;
  trendUp: boolean | null;
  icon: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export interface TopScore {
  rank: number;
  name: string;
  club: string;
  category: string;
  score: number;
}

export interface UpcomingMatch {
  time: string;
  fieldOfPlay: string;
  category: string;
  status: string;
}

export interface ScoringSetup {
  eventDetail: EventDetail;
  scoringMenus: ScoringMenu[];
  statistics: ScoringStatistic[];
  topScores: TopScore[];
  upcomingMatches: UpcomingMatch[];
}
