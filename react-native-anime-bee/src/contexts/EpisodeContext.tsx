import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { IEpisode } from "../services/episode";

interface EpisodeContextData {
  loading: boolean;
  episode: IEpisode | null;

  setEpisode: React.Dispatch<React.SetStateAction<IEpisode | null>>;
}

const EpisodeContext = createContext<EpisodeContextData>(
  {} as EpisodeContextData
);

export const useEpisode = () => {
  return useContext(EpisodeContext);
};

async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export const EpisodeProvider: React.FC<{ children: any }> = ({ children }) => {
  const [episode, setEpisode] = useState<IEpisode | null>(null);
  const [loading, setLoading] = useState(true);

  const value = {
    episode,
    setEpisode,
    loading,
  };

  return (
    <EpisodeContext.Provider value={value}>{children}</EpisodeContext.Provider>
  );
};
