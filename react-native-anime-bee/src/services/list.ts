import { AxiosResponse } from "axios";
import { api, config } from ".";

export interface List {
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

const findLists = async (userId: number): Promise<AxiosResponse<Response>> => {
  return await api.get<Response>(`lists`);
};

const updateList = async (
  data: LooseIList
): Promise<AxiosResponse<Response>> => {
  return await api.put<Response>("lists", data);
};

export { findLists, updateList };
