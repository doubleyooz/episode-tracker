import { AxiosResponse } from "axios";
import { api, config } from ".";

const findUsers = async (token: string): Promise<AxiosResponse<Response>> => {
  return await api.get<Response>(`users`, { ...config(token) });
};

export { findUsers };
