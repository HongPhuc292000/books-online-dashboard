import * as Yup from "yup";

export const MemberSchema = Yup.object().shape({
  name: Yup.string().required("author.nameRequired"),
  username: Yup.string().required("author.nameRequired"),
  password: Yup.string().required("author.nameRequired"),
  fullname: Yup.string().required("author.nameRequired"),
  phoneNumber: Yup.string().required("author.nameRequired"),
  birthday: Yup.string()
    .test(
      "validate-memberBirthday-passed",
      "author.yearOfBirthNotValid",
      (value, context) => value !== "Invalid date"
    )
    .required("author.nameRequired")
    .nullable(),
});
