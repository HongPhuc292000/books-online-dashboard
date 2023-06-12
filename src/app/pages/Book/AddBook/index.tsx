import { Box, Button, Grid } from "@mui/material";
import { withLoading } from "app/components/HOC/withLinearLoading";
import PageTitle from "app/components/Label/PageTitle";
import { useAppDispatch } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AddEditBookRequest, ImageFileType } from "types";
import { EnableEnum } from "types/enums";
import { BookSchema, defaultValue } from "../components/bookSchema.data";
import CommonFields from "../components/CommonFields";
import { bookActions } from "../slice";

interface AddBookProps {
  setLoading: Function;
}

const AddBook = memo(({ setLoading }: AddBookProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<ImageFileType>({
    file: null,
    url: "",
  });
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();

  const handleSubmit = (values: AddEditBookRequest) => {
    showLoading();
    dispatch(
      bookActions.addNewBook(
        {
          formData: {
            ...values,
            status: values.status ? EnableEnum.ENABLE : EnableEnum.DISABLE,
          },
          file: image.file,
        },
        (error) => {
          if (error) {
            hideLoading();
            showErrorSnackbar(t(`book.${error}`));
          } else {
            hideLoading();
            showSuccessSnackbar(t(`book.addSuccess`));
            navigate(-1);
          }
        }
      )
    );
  };

  const randomBookCode = () => {
    const now = moment().unix();
    return `BS${now}`;
  };

  const formik = useFormik({
    initialValues: { ...defaultValue, bookCode: randomBookCode() },
    validationSchema: BookSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    dispatch(bookActions.getAllAuthors(() => {}));
    dispatch(bookActions.getAllCategories(() => {}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
    </>
  );
});

export default withLoading(AddBook);
