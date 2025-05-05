export interface ScoringSettingCategory {
  id: number;
  name: string;
  description?: string;
}

export interface ScoringSettingOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  path: string;
}

export interface ScoringSettingConfig {
  eventId: string;
  title: string;
  description: string;
  options: ScoringSettingOption[];
  backLink: string;
}
