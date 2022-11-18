import { GlobalStyles as GlobalThemeStyles, useTheme } from "@mui/material";

export default function GlobalStyles() {
  const theme = useTheme();
  return (
    <GlobalThemeStyles
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          scrollBehavior: "smooth",
        },
        html: {
          fontFamily: "Roboto, Arial, sans-serif",
        },
        body: {
          backgroundImage: `linear-gradient(${theme.palette.grey[200]},${theme.palette.grey[50]})`,
          backgroundRepeat: "no-repeat",
        },
      }}
    />
  );
}
