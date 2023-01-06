import moment from "moment";
import * as Yup from "yup";

export const DiscountSchema = Yup.object().shape({
  code: Yup.string().required("discount.codeRequired"),
  type: Yup.string().required("discount.typeRequired"),
  value: Yup.number()
    .min(1, "discount.valueRequired")
    .required("discount.valueRequired"),
  exp: Yup.string()
    .test(
      "validate-codeExp-passed",
      "discount.expNotValid",
      (value, context) => value !== "Invalid date"
    )
    .test(
      "validate-codeExp-min-passed",
      "discount.expMinRequired",
      (value, context) => moment(value).valueOf() >= moment().valueOf()
    )
    .required("discount.expRequired")
    .nullable(),
});
