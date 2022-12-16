import { LoginRequest, LoginResponse } from "types";
import { CookiesEnum } from "types/enums";
import { baseUrl } from "utils/constants";
import { getCookies } from "utils/cookies";
import { createService, createServiceNoToken } from "./axios";

const instance = createServiceNoToken(baseUrl);
const instanceWithToken = createService(baseUrl);

const login = async (formData: LoginRequest): Promise<LoginResponse> => {
  const response = await instance.post(`admin/v1/auth/login`, formData);
  return response.data;
};

const logout = async (): Promise<LoginResponse> => {
  const response = await instanceWithToken.post(
    `admin/v1/auth/logout/${getCookies(CookiesEnum.REFRESHTOKEN)}`
  );
  return response.data;
};

const refreshToken = async (): Promise<LoginResponse> => {
  const rfToken = getCookies(CookiesEnum.REFRESHTOKEN);
  const response = await instance.post(`admin/v1/auth/refresh/${rfToken}`);
  return response.data;
};

const authService = { login, logout, refreshToken };

export default authService;
