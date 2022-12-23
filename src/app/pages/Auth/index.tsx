import { Box, styled, Paper, Button, TextField } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import Logo from "app/components/Logo";
import { useAppDispatch } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "types";
import { CookiesEnum } from "types/enums";
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
  const dispatch = useAppDispatch();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar } = useToastMessage();
  const navigate = useNavigate();

  const handleLogin = (values: LoginRequest) => {
    showLoading();
    dispatch(
      authActions.login(values, (error) => {
        if (!error) {
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
    deleteCookie(CookiesEnum.AUTHTOKEN);
    deleteCookie(CookiesEnum.REFRESHTOKEN);
  }, []);

  return (
    <RootBox>
      <Paper elevation={3} sx={{ p: 4, width: 500 }}>
        <Logo fontSize={36} />
        <Box component="form" sx={{ mt: 4 }} onSubmit={formik.handleSubmit}>
          <TextField
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("auth.username")}`}
            error={formik.touched.username && !!formik.errors.username}
            helperText={
              formik.touched.username && t(formik.errors.username as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("auth.password")}`}
            error={formik.touched.password && !!formik.errors.password}
            helperText={
              formik.touched.password && t(formik.errors.password as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
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
