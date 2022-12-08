import { GlobalStyles as GlobalThemeStyles, useTheme } from "@mui/material";

export default function GlobalStyles() {
  const theme = useTheme();
  return (
    <GlobalThemeStyles
      styles={{
        "::selection": {
          color: theme.palette.common.white,
          background: theme.palette.primary.light,
        },
        "::-moz-selection": {
          color: theme.palette.common.white,
          background: theme.palette.primary.light,
        },
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          scrollBehavior: "smooth",
        },
        "::-webkit-scrollbar": {
          width: "16px",
        },
        "::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 4px grey",
          borderRadius: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          background: theme.palette.grey[400],
          borderRadius: "8px",
        },

        "::-webkit-scrollbar-thumb:hover": {
          background: theme.palette.grey[600],
        },
        html: {
          fontFamily: "Roboto, Arial, sans-serif",
        },
        body: {
          backgroundColor: `#F0F0F0`,
        },
      }}
    />
  );
}
