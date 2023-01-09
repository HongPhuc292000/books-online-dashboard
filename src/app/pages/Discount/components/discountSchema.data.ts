import moment from "moment";
import { AddEditDiscountRequest } from "types";
import { DiscountTypeEnum } from "types/enums";
import * as Yup from "yup";

export const DiscountSchema = Yup.object().shape({
  code: Yup.string().required("discount.codeRequired"),
  type: Yup.string().required("discount.typeRequired"),
  value: Yup.number()
    .min(1, "discount.valueMinRequired")
    .when("type", {
      is: (type?: string) => type === DiscountTypeEnum.PERCENT,
      then: Yup.number().max(100, "discount.valueMaxPercentRequired"),
    })
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

export const defaultValue: AddEditDiscountRequest = {
  code: "",
  type: DiscountTypeEnum.PERCENT,
  value: 0,
  amount: 0,
  exp: null,
  enable: false,
};
