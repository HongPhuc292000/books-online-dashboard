import * as Yup from "yup";

export const AddAuthorSchema = Yup.object().shape({
  name: Yup.string().required("author.nameRequired"),
});
