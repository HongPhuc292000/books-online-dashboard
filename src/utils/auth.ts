import { CookiesEnum, RolesPermission } from "types/enums";
import { getCookies, deleteCookie } from "./cookies";
import { TokenI } from "types";
import jwtDecode from "jwt-decode";
import moment from "moment";

const maxTimeReset = 5 * 60 * 1000;

export const isAuthenticated = () => {
  const authToken = getCookies(CookiesEnum.AUTHTOKEN);
  if (!!authToken) {
    const tokenDecoded: TokenI = jwtDecode(authToken);
    const exp = moment(tokenDecoded.exp).valueOf() * 1000;
    const now = moment().valueOf();
    const isTokenValid = exp - now <= maxTimeReset ? false : true;
    return isTokenValid;
  }
};

export const clearLoginData = () => {
  deleteCookie(CookiesEnum.AUTHTOKEN);
  deleteCookie(CookiesEnum.REFRESHTOKEN);
  localStorage.clear();
  window.location.href = "/auth/login";
};

export const checkPermission = (
  permitedRoles: RolesPermission,
  ownRoles?: RolesPermission[]
) => {
  if (
    ownRoles &&
    (ownRoles.includes(permitedRoles) ||
      ownRoles.includes(RolesPermission.SUPER_ADMIN))
  ) {
    return true;
  } else {
    return false;
  }
};
