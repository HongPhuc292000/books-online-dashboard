import jwtDecode from "jwt-decode";
import { get } from "lodash";

export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function getCookies(name: string) {
  const cookies = document.cookie.split(";");
  const selectedCookie = cookies.find((cookie) => !!cookie.includes(name));
  return selectedCookie?.split("=")?.find((item) => !item.includes(name));
}

export const decodeTokenGetId = (token?: string) => {
  if (token) {
    const decodedData = jwtDecode(token);
    return get(decodedData, "id") || "";
  } else {
    return "";
  }
};
