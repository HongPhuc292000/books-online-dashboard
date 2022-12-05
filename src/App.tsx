import React from "react";
import Router from "app/routes";
import { BrowserRouter } from "react-router-dom";
import ThemeConfig from "styles/theme";
import GlobalStyles from "styles/theme/GlobalStyles";

const globalStyles = <GlobalStyles />;

function App() {
  return (
    <BrowserRouter>
      <ThemeConfig>
        {globalStyles}
        <Router />
      </ThemeConfig>
    </BrowserRouter>
  );
}

export default App;
