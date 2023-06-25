import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AddEditImportBook } from "types";

import { withLoading } from "app/components/HOC/withLinearLoading";
import PageTitle from "app/components/Label/PageTitle";
import { useAppSelector } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import { selectAuth } from "app/pages/Auth/slice/selector";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CommonFields from "../components/CommonFields";
import {
  ImportBookSchema,
  defaultValue,
} from "../components/importBookSchema.data";
import { importBookActions } from "../slice";

interface AddImportBookProps {
  setLoading: Function;
}

const AddImportBook = memo(({ setLoading }: AddImportBookProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { me } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
  const handleSubmit = (values: AddEditImportBook) => {
    const formValue = { ...values, createdBy: me?._id };

    showLoading();
    dispatch(
      importBookActions.addNewImportBook(formValue, (error) => {
        if (error) {
          hideLoading();
          showErrorSnackbar(t(`importBook.${error}`));
        } else {
          hideLoading();
          navigate(-1);
          showSuccessSnackbar(t(`importBook.addSuccess`));
        }
      })
    );
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
      handleSubmit(values);
    },
  });

  return (
    <>
      <PageTitle title={t("importBook.addNewImportBook")} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} />
        <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
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
        </Box>
      </Box>
    </>
  );
});

export default withLoading(AddImportBook);
