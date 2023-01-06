import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { omit } from "lodash";
import { AddEditCustomerRequest, Filter, ImageFileType } from "types";

import { customerActions, initialState } from "../slice";
import { CustomerSchema } from "../components/customerSchema.data";
import CommonFields from "../components/CommonFields";

interface AddCustomerProps {
  onCloseDialog: () => void;
  onFetchData: (params: Filter) => void;
  showLoading: () => void;
  hideLoading: () => void;
}

const AddCustomer = memo(
  ({
    onCloseDialog,
    onFetchData,
    showLoading,
    hideLoading,
  }: AddCustomerProps) => {
    const [image, setImage] = useState<ImageFileType>({
      file: null,
      url: "",
    });
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
    const handleSubmit = (values: AddEditCustomerRequest) => {
      onCloseDialog();
      showLoading();
      dispatch(
        customerActions.addNewCustomer(
          { formData: values, file: image.file },
          (error) => {
            if (error) {
              hideLoading();
              showErrorSnackbar(t(`customer.${error}`));
            } else {
              hideLoading();
              showSuccessSnackbar(t(`customer.addSuccess`));
              onFetchData({});
            }
          }
        )
      );
    };

    const formik = useFormik({
      initialValues: omit(initialState.detailCustomer, ["_id"]),
      validationSchema: CustomerSchema,
      onSubmit: (values) => {
        handleSubmit(values);
      },
    });

    return (
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} image={image} setImage={setImage} />
        <Box sx={{ display: "flex", justifyContent: "right", mt: 4 }}>
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
            {t("common.close")}
          </Button>
        </Box>
      </Box>
    );
  }
);

export default AddCustomer;
