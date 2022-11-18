import { LoginRequest, LoginResponse, RegisterRequest } from "types";
import { Cookies } from "types/enums";
import { getCookies } from "utils/cookies";
import { createService, createServiceNoToken } from "./axios";

const authUrl = process.env.REACT_APP_API_AUTH;
const instance = createServiceNoToken(authUrl);
const instanceWithToken = createService(authUrl);

const login = async (formData: LoginRequest): Promise<LoginResponse> => {
  const response = await instance.post(`${authUrl}login`, formData);
  return response.data;
};

const register = async (formData: RegisterRequest): Promise<LoginRequest> => {
  const response = await instance.post(`${authUrl}register`, formData);
  return response.data;
};

const logout = async (): Promise<LoginResponse> => {
  const response = await instanceWithToken.post(
    `${authUrl}logout/${getCookies(Cookies.REFRESHTOKEN)}`
  );
  return response.data;
};

const authService = { login, logout, register };

export default authService;
