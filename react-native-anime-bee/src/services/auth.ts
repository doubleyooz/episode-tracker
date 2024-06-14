import { AxiosResponse } from "axios";
import { api } from ".";

const signIn = async (
  email: string,
  password: string
): Promise<AxiosResponse<Response>> => {
  return await api.post<Response>(`/auth/login`, {
    email: email,
    password: password,
  });
};

const signUp = async (email: string, username: string, password: string) => {
  const result = await api.post<Response>(`users`, {
    email: email,
    username: username,
    password: password,
  });

  console.log({ result });

  return result;
};
const recoverPassword = async (
  email: string
): Promise<AxiosResponse<Response>> => {
  return await api.post<Response>(`auth/recover-password`, {
    email: email,
    skipEmail: true,
  });
};

const changePassword = async (
  email: string,
  password: string,
  code: string
): Promise<AxiosResponse<Response>> => {
  return await api.post<Response>(`auth/change-password`, {
    email: email,
    code: code,
    password: password,
  });
};

const activationCode = async (
  email: string
): Promise<AxiosResponse<Response>> => {
  return await api.post<Response>(`auth/activation-code`, {
    email: email,
    skipEmail: true,
  });
};

const activateAccount = async (
  email: string,
  code: string
): Promise<AxiosResponse<Response>> => {
  return await api.post<Response>(`auth/activate-account`, {
    email: email,
    code: code,
  });
};

const verifyCode = async (
  email: string,
  code: string
): Promise<AxiosResponse<Response>> => {
  return await api.post<Response>(`auth/validate-code`, {
    email: email,
    code: code,
  });
};

export {
  signIn,
  signUp,
  activateAccount,
  activationCode,
  recoverPassword,
  changePassword,
  verifyCode,
};
