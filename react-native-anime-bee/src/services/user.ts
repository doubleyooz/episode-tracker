import { AxiosResponse } from "axios";
import { IResponse, IResponseArray, api, config } from ".";

export interface IUser {
  email: string;
  username: string;
  active: boolean;
  id: number;
}

export interface LooseIUser {
  email?: string;
  id?: number;
  username?: string;
  active?: boolean;
}

const findUsers = async (): Promise<AxiosResponse<IResponseArray>> => {
  return await api.get<IResponseArray>(`users`);
};

const updateUser = async (
  data: LooseIUser
): Promise<AxiosResponse<IResponse>> => {
  return await api.put<IResponse>("users", data);
};

export { findUsers, updateUser };
