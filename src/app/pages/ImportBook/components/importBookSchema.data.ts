import { AddEditImportBook } from "types";
import * as Yup from "yup";

export const ImportBookSchema = Yup.object().shape({
  orderCode: Yup.string().required("importBook.orderCodeRequired"),
  products: Yup.array().min(1, "importBook.productsRequired"),
});

export const defaultValue: AddEditImportBook = {
  orderCode: "",
  products: [],
};
