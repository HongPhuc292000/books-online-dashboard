import * as Yup from "yup";

export const AddCategorySchema = Yup.object().shape({
  type: Yup.string()
    .matches(/^[A-Z0-9]+$/, "category.typeRequired")
    .required("category.typeRequired"),
  name: Yup.string().required("category.nameRequired"),
});
