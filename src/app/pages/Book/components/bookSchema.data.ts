import { AddEditBookRequest } from "types";
import { EnableEnum } from "types/enums";
import * as Yup from "yup";

export const BookSchema = Yup.object().shape({
  bookCode: Yup.string().required("common.usernameRequired"),
  name: Yup.string().required("common.passwordRequired"),
  defaultPrice: Yup.number()
    .min(1, "discount.valueMinRequired")
    .required("discount.valueRequired"),
});

export const defaultValue: AddEditBookRequest = {
  bookCode: "",
  name: "",
  defaultPrice: 0,
  isFull: false,
  status: EnableEnum.ENABLE,
};
