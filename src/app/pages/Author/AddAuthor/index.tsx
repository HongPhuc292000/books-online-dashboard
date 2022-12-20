import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AddEditAuthorRequest, Filter } from "types";

import { authorActions } from "../slice";
import { AuthorSchema } from "../components/authorSchema.data";
import CommonFields from "../components/CommonFields";

interface AddAuthorProps {
  onCloseDialog: () => void;
  onFetchData: (params: Filter) => void;
  showLoading: () => void;
  hideLoading: () => void;
}

const AddAuthor = memo(
  ({
    onCloseDialog,
    onFetchData,
    showLoading,
    hideLoading,
  }: AddAuthorProps) => {
    const [image, setImage] = useState<File | null>(null);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
    const handleSubmit = (values: AddEditAuthorRequest) => {
      onCloseDialog();
      showLoading();
      dispatch(
        authorActions.addNewAuthor(values, (error) => {
          if (error) {
            hideLoading();
            showErrorSnackbar(t(`author.${error}`));
          } else {
            hideLoading();
            showSuccessSnackbar(t(`author.addSuccess`));
            onFetchData({});
          }
        })
      );
    };

    const formik = useFormik({
      initialValues: {
        imageUrl: "",
        name: "",
        yearOfBirth: null,
        yearPassed: null,
        description: "",
      },
      validationSchema: AuthorSchema,
      onSubmit: (values) => {
        handleSubmit(values);
      },
    });

    return (
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} image={image} setImage={setImage} />
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
              onCloseDialog();
            }}
          >
            {t("common.cancel")}
          </Button>
        </Box>
      </Box>
    );
  }
);

export default AddAuthor;
