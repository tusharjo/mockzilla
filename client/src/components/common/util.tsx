import endpoint from "../../config";
import { api } from "../../api";

export const appConstants = {
  API_STORAGE: "mockme-local-api-store",
  SESSION_KEY: "mockme-session-key"
};

export const getToken = (setSessionKey: any) => {
  const url = `${endpoint.APP_URL}/token`;
  api(url, "GET").then((res: any) => {
    localStorage.setItem(appConstants.SESSION_KEY, res.token); setSessionKey(res.token);
  });
};

export const mockmeAPIStore = JSON.parse(localStorage.getItem(appConstants.API_STORAGE) as any);
export const mockmeSessionKey = localStorage.getItem(appConstants.SESSION_KEY) || "";

export let reducer = (info: any, newInfo: any) => {
  if (newInfo === null) {
    localStorage.removeItem(appConstants.API_STORAGE);
    return {};
  }
  return { ...info, ...newInfo };
};
