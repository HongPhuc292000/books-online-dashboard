import moment from "moment";
import { AddEditDiscountRequest, AddOrderRequest } from "types";
import { DiscountTypeEnum, OrderStatusesEnum } from "types/enums";
import * as Yup from "yup";

export const DiscountSchema = Yup.object().shape({
  customerName: Yup.string().required("order.customerNameRequired"),
  products: Yup.array().required("order.productsRequired"),
  phoneNumber: Yup.string()
    .test(
      "validate-phone-passed",
      "member.phoneNotValid",
      (value, context) => !!value && value[0] === "0"
    )
    .max(10, "member.phoneNotValid")
    .min(10, "member.phoneNotValid")
    .required("member.phoneRequired"),
});

export const defaultValue: AddOrderRequest = {
  customerName: "",
  products: [],
  phoneNumber: "",
  status: OrderStatusesEnum.INCART,
};
