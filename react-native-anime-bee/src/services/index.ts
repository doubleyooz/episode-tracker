import axios, { AxiosInstance } from "axios";
console.log({ EXPO_PUBLIC_SERVER_URL: process.env.EXPO_PUBLIC_SERVER_URL });
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";
axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  process.env.EXPO_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export interface Response {
  data: { _id: string };
  message: string;
  metadata: { accessToken: string };
}

export const api: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
});

export const config = (token: string) => {
  return {
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
};
