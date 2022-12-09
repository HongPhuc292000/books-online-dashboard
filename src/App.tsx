import React from "react";
import Router from "app/routes";
import { BrowserRouter } from "react-router-dom";
import ThemeConfig from "styles/theme";
import GlobalStyles from "styles/theme/GlobalStyles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const globalStyles = <GlobalStyles />;

function App() {
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
