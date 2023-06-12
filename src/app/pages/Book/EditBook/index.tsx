import { Box, Button, Grid } from "@mui/material";
import { memo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "app/components/Label/PageTitle";
import { useFormik } from "formik";
import { BookSchema, defaultValue } from "../components/bookSchema.data";
import CommonFields from "../components/CommonFields";
import { AddEditBookRequest, ImageFileType } from "types";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { bookActions } from "../slice";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { withLoading } from "app/components/HOC/withLinearLoading";
import { selectBook } from "../slice/selector";
import { EnableEnum } from "types/enums";

interface EditBookProps {
  setLoading: Function;
}

const EditBook = memo(({ setLoading }: EditBookProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { detailBook } = useAppSelector(selectBook);
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
  const [image, setImage] = useState<ImageFileType>({
    file: null,
    url: "",
  });

  const handleSubmit = (values: AddEditBookRequest) => {
    if (id) {
      showLoading();
      dispatch(
        bookActions.editBook(
          {
            id,
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
              showSuccessSnackbar(t(`book.editSuccess`));
            }
          }
        )
      );
    }
  };

  const handleGetDetailBook = () => {
    if (id) {
      showLoading();
      dispatch(
        bookActions.getDetailBook(id, (error) => {
          if (error) {
            showErrorSnackbar(t(`book.${error}`));
          }
          hideLoading();
        })
      );
    }
  };

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: BookSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleResetForm = () => {
    if (detailBook) {
      formik.resetForm({
        values: {
          imageUrl: detailBook.imageUrl,
          bookCode: detailBook.bookCode,
          name: detailBook.name,
          defaultPrice: detailBook.defaultPrice,
          reducedPrice: detailBook.reducedPrice,
          amount: detailBook.amount,
          authorId: detailBook.authorId._id,
          categoryIds: detailBook?.categoryIds
            ? detailBook.categoryIds.map((item) => item._id)
            : [],
          description: detailBook?.description,
          status: detailBook.status === EnableEnum.ENABLE,
        },
      });
      setImage({ ...image, url: detailBook.imageUrl });
    }
  };

  useEffect(() => {
    dispatch(bookActions.getAllAuthors(() => {}));
    dispatch(bookActions.getAllCategories(() => {}));

    return () => {
      dispatch(bookActions.getDetailBookSuccess(undefined));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetDetailBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    handleResetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailBook]);

  return (
    <>
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
    </>
  );
});

export default withLoading(EditBook);
