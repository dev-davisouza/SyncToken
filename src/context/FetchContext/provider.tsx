// src/context/FetchContext/provider.tsx

import { FetchProviderProps } from "./types";
import FetchContext from "./index";
import useFetchStaticData from "./staticFetch";
import useFetchDatabaseData from "./dynamicFetch";

export function FetchProvider({ children }: FetchProviderProps) {
  const staticData = useFetchStaticData();
  const databaseData = useFetchDatabaseData();

  return (
    <FetchContext.Provider value={{ ...staticData, ...databaseData }}>
      {children}
    </FetchContext.Provider>
  );
}
