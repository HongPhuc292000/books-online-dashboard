import { Box, TextField, styled, Paper, useTheme, Button } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import Logo from "app/components/Logo";
import { SimpleTextField } from "app/components/TextField";
import { useAppDispatch } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "types";
import { Cookies } from "types/enums";
import { deleteCookie } from "utils/cookies";
import { LoginSchema } from "./loginShema.data";
import { authActions } from "./slice/index";

interface LoginFormProps {
  setLoading: Function;
}

const RootBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));

const Auth = ({ setLoading }: LoginFormProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showSuccessSnackbar, showErrorSnackbar } = useToastMessage();
  const navigate = useNavigate();

  const handleLogin = (values: LoginRequest) => {
    showLoading();
    dispatch(
      authActions.login(values, (error) => {
        if (!error) {
          showSuccessSnackbar(t("auth.loginSuccess"));
          navigate("/welcome");
          hideLoading();
        } else {
          showErrorSnackbar(t(`auth.${error}`));
          hideLoading();
        }
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  useEffect(() => {
    deleteCookie(Cookies.AUTHTOKEN);
    deleteCookie(Cookies.REFRESHTOKEN);
  }, []);

  return (
    <RootBox>
      <Paper elevation={3} sx={{ p: 4, width: 500 }}>
        <Logo
          displayXs="flex"
          displayMd="flex"
          variant="h5"
          color={theme.palette.primary.main}
          fontSize={36}
        />
        <Box component="form" sx={{ mt: 4 }} onSubmit={formik.handleSubmit}>
          <SimpleTextField formik={formik} field="username" />
          <SimpleTextField formik={formik} field="password" type="password" />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              type="submit"
            >
              {t("common.login")}
            </Button>
          </Box>
        </Box>
      </Paper>
    </RootBox>
  );
};

export default withLoading(Auth);
