import { getCookies } from "./cookies";

export const isAuthenticated = () => {
  const authToken = getCookies("auth_token");
  if (authToken) {
    return true;
  } else {
    return false;
  }
};
