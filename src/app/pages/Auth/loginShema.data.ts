import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required("common.usernameRequired"),
  password: Yup.string().required("common.passwordRequired"),
});
