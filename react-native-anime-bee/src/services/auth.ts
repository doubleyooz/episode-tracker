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

const getCurrentUser = async (): Promise<AxiosResponse<Response>> => {
  return await api.get<Response>(`auth/me`);
};

const signUp = async (email: string, username: string, password: string) => {
  const result = await api.post<Response>(`users`, {
    email: email,
    username: username,
    password: password,
  });

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

const recoverEmail = async (
  email: string
): Promise<AxiosResponse<Response>> => {
  return await api.post<Response>(`auth/recover-email`, {
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

const changeEmail = async (
  email: string,
  newEmail: string,
  code: string
): Promise<AxiosResponse<Response>> => {
  return await api.post<Response>(`auth/change-email`, {
    newEmail: newEmail,
    email: email,
    code: code,
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

const logout = async (): Promise<AxiosResponse<Response>> => {
  return await api.post<Response>(`/auth/logout`);
};

export {
  signIn,
  signUp,
  logout,
  activateAccount,
  activationCode,
  getCurrentUser,
  recoverPassword,
  changeEmail,
  changePassword,
  verifyCode,
  recoverEmail,
};
