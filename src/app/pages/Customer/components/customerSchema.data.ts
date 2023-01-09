import { AddEditCustomerRequest } from "types";
import { GenderEnum } from "types/enums";
import { emailRegex } from "utils/constants";
import * as Yup from "yup";

export const CustomerSchema = Yup.object().shape({
  username: Yup.string().required("common.usernameRequired"),
  password: Yup.string().required("common.passwordRequired"),
  fullname: Yup.string().required("common.fullnameRequired"),
  phoneNumber: Yup.string()
    .test(
      "validate-phone-passed",
      "member.phoneNotValid",
      (value, context) => !!value && value[0] === "0"
    )
    .max(10, "member.phoneNotValid")
    .min(10, "member.phoneNotValid")
    .required("member.phoneRequired"),
  birthday: Yup.string()
    .test(
      "validate-memberBirthday-passed",
      "author.yearOfBirthNotValid",
      (value, context) => value !== "Invalid date"
    )
    .required("member.birthdayRequired")
    .nullable(),
  email: Yup.string().matches(emailRegex, "common.emailNotValid"),
});

export const defaultValue: AddEditCustomerRequest = {
  username: "",
  password: "",
  fullname: "",
  phoneNumber: "",
  birthday: "",
  gender: GenderEnum.MALE,
};
