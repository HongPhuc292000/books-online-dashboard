import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { withLoading } from "app/components/HOC/withLinearLoading";
import PageTitle from "app/components/Label/PageTitle";
import { useAppSelector } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import { selectAuth } from "app/pages/Auth/slice/selector";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import CommonFields from "../components/CommonFields";
import {
  ImportBookSchema,
  defaultValue,
} from "../components/importBookSchema.data";
import { importBookActions } from "../slice";
import { selectImportBook } from "../slice/selector";

interface EditImportBookProps {
  setLoading: Function;
}

const EditImportBook = memo(({ setLoading }: EditImportBookProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { me } = useAppSelector(selectAuth);
  const { importBookDetail } = useAppSelector(selectImportBook);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
  const handleCancelOrderSubmit = () => {
    if (id) {
      const formValue = { isCancel: true };
      showLoading();
      dispatch(
        importBookActions.editImportBook(
          { id: id, formData: formValue },
          (error) => {
            if (error) {
              hideLoading();
              showErrorSnackbar(t(`importBook.${error}`));
            } else {
              hideLoading();
              showSuccessSnackbar(t(`importBook.cancelSuccess`));
            }
          }
        )
      );
    }
  };

  const handleAcceptOrderSubmit = () => {
    if (id) {
      const formValue = { isCancel: false };
      showLoading();
      dispatch(
        importBookActions.editImportBook(
          { id: id, formData: formValue },
          (error) => {
            if (error) {
              hideLoading();
              showErrorSnackbar(t(`importBook.${error}`));
            } else {
              hideLoading();
              showSuccessSnackbar(t(`importBook.acceptSuccess`));
            }
          }
        )
      );
    }
  };

  const randomBookCode = () => {
    const now = moment().unix();
    return `IB${now}`;
  };

  const formik = useFormik({
    initialValues: {
      ...defaultValue,
      orderCode: randomBookCode(),
    },
    validationSchema: ImportBookSchema,
    onSubmit: (values) => {
      handleCancelOrderSubmit();
    },
  });

  const handleResetForm = () => {
    if (importBookDetail) {
      formik.resetForm({
        values: {
          orderCode: importBookDetail.orderCode,
          products: importBookDetail.products,
        },
      });
    }
  };

  useEffect(() => {
    handleResetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importBookDetail]);

  useEffect(() => {
    showLoading();
    if (id) {
      dispatch(
        importBookActions.getDetailImportBook(id, (error) => {
          if (error) {
            showErrorSnackbar(t(`importBook.${error}`));
          }
          hideLoading();
        })
      );
    }

    return () => {
      dispatch(importBookActions.getDetailImportBookSuccess(undefined));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageTitle title={t("importBook.editImportBook")} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} isEdit={true} />
        <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
          {importBookDetail?.isCancel ? (
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 1 }}
              disabled={importBookDetail?.createdBy._id !== me?._id}
              onClick={() => {
                handleAcceptOrderSubmit();
              }}
            >
              {t("importBook.importOrder")}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              type="submit"
              sx={{ mr: 1 }}
              disabled={importBookDetail?.createdBy._id !== me?._id}
            >
              {t("importBook.cancelOrder")}
            </Button>
          )}

          <Button
            variant="contained"
            color="info"
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("common.back")}
          </Button>
        </Box>
      </Box>
    </>
  );
});

export default withLoading(EditImportBook);
