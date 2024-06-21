import { AxiosResponse } from "axios";
import { IResponse, IResponseArray, api } from ".";

export interface IEpisode {
  id: number;
  title: string;
  description: string;
  stoppedAtHours: number;
  stoppedAtMinutes: number;
  stoppedAtSeconds: number;
  animeId?: number;
  finished?: boolean;
}

export interface LooseIEpisode {
  id?: number;
  title?: string;
  description?: string;
  stoppedAtHours?: number;
  stoppedAtMinutes?: number;
  stoppedAtSeconds?: number;
  animeId?: number;
  finished?: boolean;
}

const createEpisode = async (
  title: string,

  description: string,
  animeId: number,
  stoppedAtHours: number,
  stoppedAtMinutes: number,
  stoppedAtSeconds: number,
  finished: boolean
): Promise<AxiosResponse<IResponse>> => {
  return await api.post<IResponse>("episodes", {
    title,
    animeId,
    description,
    stoppedAtHours,
    stoppedAtMinutes,
    stoppedAtSeconds,
    finished,
  });
};

const findEpisodes = async (
  animeId: number
): Promise<AxiosResponse<IResponseArray>> => {
  return await api.get<IResponseArray>(`episodes?AnimeId=${animeId}`);
};

const updateEpisodes = async (
  data: LooseIEpisode
): Promise<AxiosResponse<IResponse>> => {
  return await api.put<IResponse>("episodes", data);
};

export { createEpisode, findEpisodes, updateEpisodes };
