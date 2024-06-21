export interface Review {
  id: number;
  description: string;
  animeId?: number;
  userId?: number;
  finished?: boolean;
}
