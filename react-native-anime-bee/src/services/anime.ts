import { AxiosResponse } from "axios";
import { api } from ".";

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

const createAnime = async (
  title: string,
  studio: string,
  description: string
): Promise<AxiosResponse<Response>> => {
  return await api.post<Response>("animes", { title, studio, description });
};

const findAnimes = async (userId: number): Promise<AxiosResponse<Response>> => {
  return await api.get<Response>(`animes?userId=${userId}`);
};

const updateAnimes = async (
  data: LooseIAnime
): Promise<AxiosResponse<Response>> => {
  return await api.put<Response>("animes", data);
};

export { createAnime, findAnimes, updateAnimes };
