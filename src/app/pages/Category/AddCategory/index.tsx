import { Box, Button } from "@mui/material";
import { SimpleTextField } from "app/components/TextField";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AddNewCategoryRequest, Filter } from "types";

import { categoryActions } from "../slice";
import { AddCategorySchema } from "./addCategorySchema.data";

interface AddCategoryProps {
  onCloseDialog: () => void;
  onFetchData: (params: Filter) => void;
  showLoading: () => void;
  hideLoading: () => void;
}

const AddCategory = memo(
  ({
    onCloseDialog,
    onFetchData,
    showLoading,
    hideLoading,
  }: AddCategoryProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
    const handleSubmit = (values: AddNewCategoryRequest) => {
      onCloseDialog();
      showLoading();
      dispatch(
        categoryActions.addNewCategory(values, (error) => {
          if (error) {
            hideLoading();
            showErrorSnackbar(t(`category.${error}`));
          } else {
            hideLoading();
            showSuccessSnackbar(t(`category.addSuccess`));
            onFetchData({});
          }
        })
      );
    };

    const formik = useFormik({
      initialValues: {
        type: "",
        name: "",
      },
      validationSchema: AddCategorySchema,
      onSubmit: (values) => {
        handleSubmit(values);
      },
    });

    return (
      <Box component="form" onSubmit={formik.handleSubmit}>
        <SimpleTextField
          formik={formik}
          field="type"
          tableName="category"
          required={true}
        />
        <SimpleTextField
          formik={formik}
          field="name"
          tableName="category"
          required={true}
        />
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

export default AddCategory;
