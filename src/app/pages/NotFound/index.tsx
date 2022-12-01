import { styled, Box, Typography, Button } from "@mui/material";
import path from "app/routes/path";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFoundPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));

const NotFoundText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
    letterSpacing: 2,
  },
  fontSize: 14,
  letterSpacing: 1,
  marginBottom: theme.spacing(3),
}));

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <NotFoundPageContainer>
      <Box sx={{ textAlign: "center" }}>
        <NotFoundText>{t("common.pageNotFound")}</NotFoundText>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            navigate(path.welcome);
          }}
        >
          {t("common.returnHome")}
        </Button>
      </Box>
    </NotFoundPageContainer>
  );
};

export default NotFound;
