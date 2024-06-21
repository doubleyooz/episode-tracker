import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { IList } from "../services/list";

interface ListContextData {
  loading: boolean;
  list: IList | null;

  setList: React.Dispatch<React.SetStateAction<IList | null>>;
}

const ListContext = createContext<ListContextData>({} as ListContextData);

export const useList = () => {
  return useContext(ListContext);
};

async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export const ListProvider: React.FC<{ children: any }> = ({ children }) => {
  const [list, setList] = useState<IList | null>(null);
  const [loading, setLoading] = useState(true);

  const value = {
    list,
    setList,
    loading,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
