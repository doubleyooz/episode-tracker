import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getCurrentUser, signIn } from "../services/auth";
import { IUser } from "../services/user";

interface AuthContextData {
  token: string;
  loading: boolean;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
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
  const [token, setToken] = useState("");
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
      const currentUser = (result.data as unknown as { result: IUser[] })
        .result;
      if (currentUser.length === 0) return;
      setUser(currentUser[0]);
    };
    fetchOldToken();
    fetchStashedUser();
  }, [token]);

  async function handleSignIn(email: string, password: string) {
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

  const value = {
    token,
    setUser,
    user,
    handleSignIn,
    setToken,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
