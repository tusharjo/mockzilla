import React, { useReducer, useEffect, useState, useContext } from "react";
import {
  reducer,
  mockmeAPIStore,
  mockmeSessionKey,
  appConstants,
  getToken,
} from "./util";

type ContextProps = {
  apiStore: { [x: string]: any };
  mockmeSessionKey: string;
  setAPIStore: (store: { [x: string]: any }) => void;
};

const StorageContext = React.createContext({} as ContextProps);

export const useStorage = () => {
  const { apiStore, mockmeSessionKey, setAPIStore } = useContext(StorageContext);
  return { apiStore, mockmeSessionKey, setAPIStore };
}

export function StorageProvider(props: any) {
  const [apiStore, setAPIStore] = useReducer(
    reducer,
    mockmeAPIStore || ({} as any)
  );
  const [sessionKey, setSessionKey] = useState(mockmeSessionKey || "");
  useEffect(() => {
    if (!sessionKey) {
      getToken().then((token) => {
        localStorage.setItem(appConstants.SESSION_KEY, token);
        setSessionKey(token);
      });
    }
  }, [sessionKey]);
  useEffect(() => {
    localStorage.setItem(appConstants.API_STORAGE, JSON.stringify(apiStore));
  }, [apiStore]);
  useEffect(() => { }, [sessionKey]);

  if (!sessionKey) {
    return null;
  }
  return (
    <StorageContext.Provider
      value={{ apiStore, mockmeSessionKey: sessionKey, setAPIStore }}
    >
      {props.children}
    </StorageContext.Provider>
  );
}