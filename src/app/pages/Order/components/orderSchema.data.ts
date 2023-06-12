import { AddOrderRequest } from "types";
import { OrderStatusesEnum } from "types/enums";
import * as Yup from "yup";

export const OrderSchema = Yup.object().shape({
  customerName: Yup.string().required("order.customerNameRequired"),
  products: Yup.array().min(1, "order.productsRequired"),
  customerPhoneNumber: Yup.string()
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
  customerPhoneNumber: "",
  orderPrices: 0,
  totalPrices: 0,
  status: OrderStatusesEnum.DONE,
  checkout: true,
};
