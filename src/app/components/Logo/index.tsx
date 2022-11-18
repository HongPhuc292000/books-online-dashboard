import { Box, Typography, styled } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useTranslation } from "react-i18next";

interface LogoProps {
  onClick?: Function;
  displayXs: "none" | "flex";
  displayMd: "none" | "flex";
  variant: "h6" | "h5";
  mr?: number;
  color?: string;
  fontSize?: number;
}

const LogoText = styled(Typography)(({}) => ({}));

const Logo = ({
  onClick,
  displayXs,
  displayMd,
  variant,
  mr = 0,
  color = "#000",
  fontSize = 24,
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
        fontSize: fontSize,
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
