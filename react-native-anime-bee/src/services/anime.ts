import { AxiosResponse } from "axios";
import { IResponse, IResponseArray, api } from ".";

export interface IAnime {
  id: number;
  title: string;
  description: string;
  studio: string;
  numberOfEpisodes: number;
  allowGaps: boolean;
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
  numberOfEpisodes?: number;
  allowGaps?: boolean;
}

const createAnime = async (
  title: string,
  studio: string,
  description: string,
  numberOfEpisodes: number,
  allowGaps: boolean
): Promise<AxiosResponse<IResponse>> => {
  return await api.post<IResponse>("animes", {
    title,
    studio,
    description,
    numberOfEpisodes,
    allowGaps,
  });
};

const findAnimes = async (
  userId: number
): Promise<AxiosResponse<IResponseArray>> => {
  return await api.get<IResponseArray>(`animes?userId=${userId}`);
};

const updateAnimes = async (
  data: LooseIAnime
): Promise<AxiosResponse<IResponse>> => {
  return await api.put<IResponse>("animes", data);
};

export { createAnime, findAnimes, updateAnimes };
