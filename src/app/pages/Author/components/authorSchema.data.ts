import * as Yup from "yup";

export const AuthorSchema = Yup.object().shape({
  name: Yup.string().required("author.nameRequired"),
  yearOfBirth: Yup.string()
    .test(
      "validate-year-passed",
      "author.yearOfBirthNotValid",
      (value, context) => value !== "Invalid date"
    )
    .nullable(),
  yearPassed: Yup.string()
    .test(
      "validate-year-passed",
      "author.yearPassedNotValid",
      (value, context) => value !== "Invalid date"
    )
    .nullable(),
});
