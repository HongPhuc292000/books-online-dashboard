import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Cookies } from "types/enums";
import { getCookies } from "utils/cookies";

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const interceptAuth = (config: AxiosRequestConfig) => {
  const instance = axios.create(config);
  instance.interceptors.request.use((cf) => {
    const authToken = getCookies(Cookies.AUTHTOKEN);
    const refreshToken = getCookies(Cookies.REFRESHTOKEN);
    if (authToken) {
      cf.headers!["token"] = `Bearer ${authToken}`;
    }
    if (refreshToken) {
      cf.headers!["refreshToken"] = refreshToken;
    }
    return cf;
  });
  instance.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance;
};

const baseConfig = (
  baseURL?: string,
  contentType: string = "application/json"
) => {
  return {
    baseURL,
    headers: {
      // 'Accept-Language': 'vi',
      "Content-Type": contentType,
    },
  };
};

export const createService = (
  baseURL?: string,
  contentType: string = "application/json"
): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, contentType));
};

// Service with no token
export const createServiceNoToken = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use((config) => {
    return config;
  });
  return instance;
};
