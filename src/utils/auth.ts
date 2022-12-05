import { getCookies } from "./cookies";

export const isAuthenticated = () => {
  const authToken = getCookies("auth_token");
  return !!authToken && authToken.length > 0;
};
