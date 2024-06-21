import axios, { AxiosInstance } from "axios";
console.log({ EXPO_PUBLIC_SERVER_URL: process.env.EXPO_PUBLIC_SERVER_URL });
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";
axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  process.env.EXPO_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export interface IResponse {
  data: any;
  message: string;
  metadata: { accessToken: string };
}

export interface IResponseArray {
  data: any[];
  message: string;
  metadata: { accessToken: string };
}

export const api: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
  withCredentials: true,
});

export const config = (token: string) => {
  return {
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
};
