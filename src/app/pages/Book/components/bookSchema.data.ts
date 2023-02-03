import { AddEditBookRequest } from "types";
import * as Yup from "yup";

export const BookSchema = Yup.object().shape({
  bookCode: Yup.string().required("common.usernameRequired"),
  name: Yup.string().required("common.passwordRequired"),
  defaultPrice: Yup.number()
    .min(1, "discount.valueMinRequired")
    .required("discount.valueRequired"),
  reducedPrice: Yup.number().nullable(),
});

export const defaultValue: AddEditBookRequest = {
  imageUrl: "",
  bookCode: "",
  name: "",
  defaultPrice: 0,
  amount: 0,
  authorId: "",
  categoryIds: [],
  isFull: false,
  status: true,
};
