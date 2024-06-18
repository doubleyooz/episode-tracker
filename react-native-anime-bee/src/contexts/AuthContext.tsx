import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getCurrentUser, logout, signIn } from "../services/auth";
import { IUser } from "../services/user";

interface AuthContextData {
  token: string | null;
  loading: boolean;
  user: IUser | null;
  handleSignout(): Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleSignIn(email: string, password: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  return useContext(AuthContext);
};

async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOldToken = async () => {
      const oldToken = await SecureStore.getItemAsync("token");
      if (!oldToken) return;
      setToken(oldToken);
    };

    const fetchStashedUser = async () => {
      const result = await getCurrentUser();

      const currentUser = result.data as unknown as IUser;

      if (!currentUser) return;
      setUser(currentUser);
    };
    console.log("old token");
    try {
      fetchOldToken();

      fetchStashedUser();
    } catch (error) {
      SecureStore.deleteItemAsync("token");
      setToken(null);
      setUser(null);
      console.log({ error });
    }
  }, [token]);

  async function handleSignIn(email: string, password: string) {
    setLoading(true);
    const result = await signIn(email, password);
    if (!result?.headers["set-cookie"]) throw new Error("login failed");

    const [, token] = result.headers["set-cookie"][0]
      .split("; ")[0]
      .split("jid=");

    if (!token) throw new Error("login failed");
    save("token", token);
    setToken(token);
    setLoading(false);
  }

  async function handleSignout() {
    setLoading(true);
    try {
      await logout();
    } catch (err) {}

    SecureStore.deleteItemAsync("token");
    setToken(null);
    setUser(null);
    setLoading(false);
  }

  const value = {
    token,
    setUser,
    user,
    handleSignIn,
    handleSignout,
    setToken,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
