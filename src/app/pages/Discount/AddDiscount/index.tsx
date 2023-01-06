import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AddEditDiscountRequest, Filter } from "types";

import { discountActions, initialState } from "../slice";
import { DiscountSchema } from "../components/discountSchema.data";
import CommonFields from "../components/CommonFields";
import { omit } from "lodash";

interface AddDiscountProps {
  onCloseDialog: () => void;
  onFetchData: (params: Filter) => void;
  showLoading: () => void;
  hideLoading: () => void;
}

const AddDiscount = memo(
  ({
    onCloseDialog,
    onFetchData,
    showLoading,
    hideLoading,
  }: AddDiscountProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
    const handleSubmit = (values: AddEditDiscountRequest) => {
      onCloseDialog();
      showLoading();
      dispatch(
        discountActions.addNewDiscount(values, (error) => {
          if (error) {
            hideLoading();
            showErrorSnackbar(t(`discount.${error}`));
          } else {
            hideLoading();
            showSuccessSnackbar(t(`discount.addSuccess`));
            onFetchData({});
          }
        })
      );
    };

    const formik = useFormik({
      initialValues: {
        ...omit(initialState.detailDiscount, ["_id", "exp"]),
        exp: null,
      },
      validationSchema: DiscountSchema,
      onSubmit: (values) => {
        handleSubmit(values);
      },
    });

    return (
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

export default AddDiscount;
