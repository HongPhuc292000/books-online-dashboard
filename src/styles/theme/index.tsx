import { ThemeOptions } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

import shape from "./shape";
import palette from "./palette";
import typography from "./typography";

interface ThemeConfigProps {
  children: React.ReactNode;
}
const themeOptions: ThemeOptions = {
  palette,
  shape,
  typography,
};

export let theme = createTheme(themeOptions);
theme = responsiveFontSizes(theme);

export default function ThemeConfig(props: ThemeConfigProps) {
  const { children } = props;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}
