import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AddEditDiscountRequest, Filter } from "types";

import { discountActions } from "../slice";
import {
  DiscountSchema,
  defaultValue,
} from "../components/discountSchema.data";
import CommonFields from "../components/CommonFields";
import moment from "moment";
import { useAppSelector } from "app/hooks";
import { selectDiscount } from "../slice/selector";
import React from "react";

interface EditDiscountProps {
  onCloseDialog: () => void;
  onFetchData: (params: Filter) => void;
  showLoading: () => void;
  hideLoading: () => void;
  id?: string;
}

const EditDiscount = memo(
  ({
    onCloseDialog,
    onFetchData,
    showLoading,
    hideLoading,
    id,
  }: EditDiscountProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { detailDiscount } = useAppSelector(selectDiscount);
    const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
    const handleSubmit = (values: AddEditDiscountRequest) => {
      if (id) {
        onCloseDialog();
        showLoading();
        dispatch(
          discountActions.editDiscount({ id, formData: values }, (error) => {
            if (error) {
              hideLoading();
              showErrorSnackbar(t(`discount.${error}`));
            } else {
              hideLoading();
              showSuccessSnackbar(t(`discount.editSuccess`));
              onFetchData({});
            }
          })
        );
      }
    };

    const formik = useFormik({
      initialValues: defaultValue,
      validationSchema: DiscountSchema,
      onSubmit: (values) => {
        handleSubmit(values);
      },
    });

    const handleResetForm = () => {
      if (detailDiscount) {
        formik.resetForm({
          values: {
            code: detailDiscount.code,
            type: detailDiscount.type,
            description: detailDiscount.description,
            value: detailDiscount.value,
            amount: detailDiscount.amount,
            exp: moment(detailDiscount.exp).toString(),
            enable: detailDiscount.enable,
          },
        });
      }
    };

    React.useEffect(() => {
      handleResetForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailDiscount]);

    React.useEffect(() => {
      showLoading();
      if (id) {
        dispatch(
          discountActions.getDetailDiscount(id, (error) => {
            if (error) {
              showErrorSnackbar(t(`discount.${error}`));
            }
            hideLoading();
          })
        );
      }

      return () => {
        dispatch(discountActions.getDetailDiscountSuccess(undefined));
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} disabled={!!detailDiscount?.used} />
        <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={!!detailDiscount?.used}
          >
            {t("common.edit")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mx: 1 }}
            onClick={handleResetForm}
            disabled={!!detailDiscount?.used}
          >
            {t("common.reset")}
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

export default EditDiscount;
