import { Box, Button, TextField } from "@mui/material";
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
        <TextField
          id="type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          fullWidth
          sx={{ mb: 2 }}
          label={`${t("category.type")}`}
          error={formik.touched.type && !!formik.errors.type}
          helperText={formik.touched.type && t(formik.errors.type as string)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          fullWidth
          sx={{ mb: 2 }}
          label={`${t("category.name")}`}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && t(formik.errors.name as string)}
          InputLabelProps={{
            shrink: true,
          }}
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
