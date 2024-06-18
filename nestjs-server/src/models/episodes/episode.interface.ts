export interface Episode {
  id: number;
  title: string;
  description: string;
  stoppedAtHours: number;
  stoppedAtMinutes: number;
  stoppedAtSeconds: number;
  animeId?: number;
  finished?: boolean;
}
