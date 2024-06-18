export interface IAnime {
  id: number;
  title: string;
  description: string;
  studio: string;
  userId?: number;
  finished?: boolean;
}

export interface LooseIAnime {
  id?: number;
  title?: string;
  description?: string;
  studio?: string;
  userId?: number;
  finished?: boolean;
}
