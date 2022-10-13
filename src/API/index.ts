import axios from "axios";
import { getTokenCookie } from "../utils/cookie.helpers";

export const serverUrl = process.env.REACT_APP_API_URL || "http://localhost:7777";

export const $instance = axios.create({
  withCredentials: true,
  baseURL: serverUrl,
});

export const $authInstance = axios.create({
  withCredentials: true,
  baseURL: serverUrl,
});

$authInstance.interceptors.request.use((config) => {
  const token = getTokenCookie();
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
