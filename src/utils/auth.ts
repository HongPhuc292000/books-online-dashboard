import { CookiesEnum } from "types/enums";
import { getCookies, deleteCookie } from "./cookies";

export const isAuthenticated = () => {
  const authToken = getCookies("auth_token");
  return !!authToken && authToken.length > 0;
};

export const clearLoginData = () => {
  deleteCookie(CookiesEnum.AUTHTOKEN);
  deleteCookie(CookiesEnum.REFRESHTOKEN);
  localStorage.clear();
  window.location.href = "/auth/login";
};
