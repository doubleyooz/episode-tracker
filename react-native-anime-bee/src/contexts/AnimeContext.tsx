import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { IAnime } from "../services/anime";

interface AnimeContextData {
  loading: boolean;
  anime: IAnime | null;

  setAnime: React.Dispatch<React.SetStateAction<IAnime | null>>;
}

const AnimeContext = createContext<AnimeContextData>({} as AnimeContextData);

export const useAnime = () => {
  return useContext(AnimeContext);
};

async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export const AnimeProvider: React.FC<{ children: any }> = ({ children }) => {
  const [anime, setAnime] = useState<IAnime | null>(null);
  const [loading, setLoading] = useState(true);

  const value = {
    anime,
    setAnime,
    loading,
  };

  return (
    <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>
  );
};
