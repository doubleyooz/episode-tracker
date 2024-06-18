import { AxiosResponse } from "axios";
import { api, config } from ".";

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

const findUsers = async (): Promise<AxiosResponse<Response>> => {
  return await api.get<Response>(`users`);
};

const updateUser = async (
  data: LooseIUser
): Promise<AxiosResponse<Response>> => {
  return await api.put<Response>("users", data);
};

export { findUsers, updateUser };
