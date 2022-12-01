import { Box } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useTranslation } from "react-i18next";
import { primaryColor } from "styles/constants";

interface LogoProps {
  onClick?: Function;
  displayXs?: "none" | "flex";
  displayMd?: "none" | "flex";
  mr?: number;
  color?: string;
  fontSize?: number;
  fontSizeDownMd?: number;
}

const Logo = ({
  onClick,
  displayXs = "flex",
  displayMd = "flex",
  mr = 0,
  color = primaryColor,
  fontSize = 24,
  fontSizeDownMd,
}: LogoProps) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: { xs: displayXs, md: displayMd },
        cursor: onClick ? "pointer" : "default",
        mr: mr,
        justifyContent: "center",
        alignItems: "center",
        fontSize: { xs: fontSizeDownMd || fontSize, md: fontSize },
        color: color,
      }}
      onClick={() => onClick && onClick()}
    >
      <MenuBookIcon sx={{ mr: 1 }} fontSize="inherit" />
      <p
        style={{
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
          fontSize: "inherit",
        }}
      >
        {t("common.logoText")}
      </p>
    </Box>
  );
};

export default Logo;
