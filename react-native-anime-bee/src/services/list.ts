import { AxiosResponse } from "axios";
import { IResponse, IResponseArray, api, config } from ".";

export interface IList {
  id: number;
  title: string;
  description: string;
  userId?: number;
}

export interface LooseIList {
  id?: number;
  title?: string;
  description?: string;
  userId?: number;
}

const createList = async (
  title: string,
  description: string
): Promise<AxiosResponse<IResponse>> => {
  return await api.post<IResponse>("lists", {
    title,

    description,
  });
};

const findLists = async (
  userId: number
): Promise<AxiosResponse<IResponseArray>> => {
  return await api.get<IResponseArray>(`lists?userId=${userId}`);
};

const updateList = async (
  data: LooseIList
): Promise<AxiosResponse<IResponse>> => {
  return await api.put<IResponse>("lists", data);
};

export { createList, findLists, updateList };
