import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddEditCustomerRequest, Filter, ImageFileType } from "types";

import { customerActions } from "../slice";
import {
  CustomerSchema,
  defaultValue,
} from "../components/customerSchema.data";
import CommonFields from "../components/CommonFields";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectCustomer } from "../slice/selector";
import React from "react";

interface EditCustomerProps {
  onCloseDialog: () => void;
  onFetchData: (params: Filter) => void;
  showLoading: () => void;
  hideLoading: () => void;
  id?: string;
}

const EditCustomer = memo(
  ({
    onCloseDialog,
    onFetchData,
    showLoading,
    hideLoading,
    id,
  }: EditCustomerProps) => {
    const [image, setImage] = useState<ImageFileType>({
      file: null,
      url: "",
    });
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { detailCustomer } = useAppSelector(selectCustomer);
    const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
    const handleSubmit = (values: AddEditCustomerRequest) => {
      if (id) {
        onCloseDialog();
        showLoading();
        dispatch(
          customerActions.editCustomer(
            {
              id,
              formData: values,
              file: image.file,
              beforeImage: detailCustomer ? detailCustomer.imageUrl : "",
            },
            (error) => {
              if (error) {
                hideLoading();
                showErrorSnackbar(t(`customer.${error}`));
              } else {
                hideLoading();
                showSuccessSnackbar(t(`customer.editSuccess`));
                onFetchData({});
              }
            }
          )
        );
      }
    };

    const formik = useFormik({
      initialValues: defaultValue,
      validationSchema: CustomerSchema,
      onSubmit: (values) => {
        handleSubmit({ ...values, imageUrl: image.url });
      },
    });

    const handleResetForm = () => {
      if (detailCustomer) {
        formik.resetForm({
          values: {
            imageUrl: detailCustomer.imageUrl,
            username: detailCustomer.username,
            password: detailCustomer.password,
            fullname: detailCustomer.fullname,
            phoneNumber: detailCustomer.phoneNumber,
            email: detailCustomer.email,
            birthday: detailCustomer.birthday,
            gender: detailCustomer.gender,
          },
        });
        setImage({ ...image, url: detailCustomer.imageUrl });
      }
    };

    React.useEffect(() => {
      showLoading();
      if (!!id) {
        dispatch(
          customerActions.getDetailCustomer(id, (error) => {
            if (error) {
              showErrorSnackbar(t(`member.${error}`));
            }
            hideLoading();
          })
        );
      }

      return () => {
        dispatch(customerActions.getDetailCustomerSuccess(undefined));
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      handleResetForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailCustomer]);

    return (
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} image={image} setImage={setImage} />
        <Box sx={{ display: "flex", justifyContent: "right", mt: 4 }}>
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

export default EditCustomer;
