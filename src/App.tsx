import React, { useEffect } from "react";
import Router from "app/routes";
import { BrowserRouter } from "react-router-dom";
import ThemeConfig from "styles/theme";
import GlobalStyles from "styles/theme/GlobalStyles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import jwtDecode from "jwt-decode";
import { getCookies } from "utils/cookies";
import { CookiesEnum } from "types/enums";
import { TokenI } from "types";
import moment from "moment";
import { useAppDispatch } from "app/hooks";

import { authActions } from "app/pages/Auth/slice";
import useToastMessage from "app/hooks/useToastMessage";
import { clearLoginData } from "utils/auth";

const globalStyles = <GlobalStyles />;
const maxTimeReset = 5 * 60 * 1000;
const timeCheckReset = 4 * 60 * 1000;

function App() {
  const dispatch = useAppDispatch();
  const { showErrorSnackbar } = useToastMessage();
  const renewAccessToken = () => {
    dispatch(
      authActions.refreshToken((err) => {
        if (err) {
          showErrorSnackbar("Lỗi");
          clearLoginData();
        }
      })
    );
  };

  useEffect(() => {
    const idRenewAccessToken = setInterval(async () => {
      const token = getCookies(CookiesEnum.AUTHTOKEN);
      if (token) {
        const tokenDecoded: TokenI = jwtDecode(token);
        const exp = moment(tokenDecoded.exp).valueOf() * 1000;
        const now = moment().valueOf();

        // if difference time now and expire time at least 3 minutes, get new access token
        if (exp - now <= maxTimeReset) {
          await renewAccessToken();
        }
      }
      // timeCheckReset minutes is the time that will be checked
    }, timeCheckReset);
    return () => {
      clearInterval(idRenewAccessToken);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <ThemeConfig>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {globalStyles}
          <Router />
        </LocalizationProvider>
      </ThemeConfig>
    </BrowserRouter>
  );
}

export default App;
