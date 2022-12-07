import { styled, Typography, Box } from "@mui/material";
import MainWrap from "app/components/Layouts/MainWrap";
import Logo from "app/components/Logo";
import { useTranslation } from "react-i18next";
import { appbarHeight } from "styles/constants";

const WelcomePageContainer = styled(MainWrap)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    height: `calc(100vh - ${appbarHeight.mainXs})`,
  },
  [theme.breakpoints.up("md")]: {
    height: `calc(100vh - ${appbarHeight.mainMd})`,
  },
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    fontSize: 18,
    letterSpacing: 2,
  },
  fontSize: 14,
  letterSpacing: 1,
}));

const Welcome = () => {
  const { t } = useTranslation();
  return (
    <WelcomePageContainer>
      <Box sx={{ textAlign: "center" }}>
        <Logo fontSize={60} fontSizeDownMd={40} />
        <WelcomeText>{t("common.welcome")}</WelcomeText>
      </Box>
    </WelcomePageContainer>
  );
};

export default Welcome;
