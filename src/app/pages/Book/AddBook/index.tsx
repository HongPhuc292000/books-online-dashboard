import { Box, Button, Grid, Paper } from "@mui/material";
import PageTitle from "app/components/Label/PageTitle";
import MainWrap from "app/components/Layouts/MainWrap";
import { useAppDispatch } from "app/hooks";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ImageFileType } from "types";
import { BookSchema, defaultValue } from "../components/bookSchema.data";
import CommonFields from "../components/CommonFields";

const AddBook = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<ImageFileType>({
    file: null,
    url: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (values: {}) => {
    // onCloseDialog();
    // showLoading();
    // dispatch(
    //   customerActions.addNewCustomer(
    //     { formData: values, file: image.file },
    //     (error) => {
    //       if (error) {
    //         hideLoading();
    //         showErrorSnackbar(t(`customer.${error}`));
    //       } else {
    //         hideLoading();
    //         showSuccessSnackbar(t(`customer.addSuccess`));
    //         onFetchData({});
    //       }
    //     }
    //   )
    // );
  };

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: BookSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    const listAuthor = "";
  }, []);

  return (
    <MainWrap>
      <PageTitle title={t(`book.addNewBook`)} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields image={image} setImage={setImage} formik={formik} />
        <Grid container mt={4} justifyContent="flex-end">
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ mr: 1 }}
          >
            {t("common.addNew")}
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

export default AddBook;
