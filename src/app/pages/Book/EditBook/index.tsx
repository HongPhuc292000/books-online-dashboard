import { Box, Button, Grid, Paper } from "@mui/material";
import MainWrap from "app/components/Layouts/MainWrap";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "app/components/Label/PageTitle";
import { useFormik } from "formik";
import { BookSchema, defaultValue } from "../components/bookSchema.data";
import CommonFields from "../components/CommonFields";
import { ImageFileType } from "types";
import { useNavigate } from "react-router-dom";

const EditBook = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [image, setImage] = useState<ImageFileType>({
    file: null,
    url: "",
  });

  const handleSubmit = (values: {}) => {};

  const handleResetForm = () => {};

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: BookSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <MainWrap>
      <PageTitle title={t(`book.editBook`)} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields image={image} setImage={setImage} formik={formik} />
        <Grid container mt={4} justifyContent="flex-end">
          <Button variant="contained" color="success" type="submit">
            {t("common.edit")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mx: 1 }}
            onClick={handleResetForm}
          >
            {t("common.reset")}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("common.cancel")}
          </Button>
        </Grid>
      </Box>
    </MainWrap>
  );
});

export default EditBook;
