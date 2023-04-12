import { Box, Button, Grid } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AddOrderRequest, Filter } from "types";

import { orderActions } from "../slice";
import { defaultValue, DiscountSchema } from "../components/orderSchema.data";
import CommonFields from "../components/CommonFields";
import { useLoading } from "app/hooks/useLoading";
import { withLoading } from "app/components/HOC/withLinearLoading";
import { useNavigate } from "react-router-dom";
import PageTitle from "app/components/Label/PageTitle";

interface AddOrderProps {
  setLoading: Function;
}

const AddOrder = memo(({ setLoading }: AddOrderProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
  const navigate = useNavigate();

  const handleSubmit = (values: AddOrderRequest) => {
    showLoading();
    dispatch(
      orderActions.addNewOrder(values, (error) => {
        if (error) {
          hideLoading();
          showErrorSnackbar(t(`order.${error}`));
        } else {
          hideLoading();
          showSuccessSnackbar(t(`order.addSuccess`));
        }
      })
    );
  };

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: DiscountSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <PageTitle title={t(`order.addOrder`)} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} />
        <Grid container mt={4} justifyContent="flex-end">
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
        </Grid>
      </Box>
    </>
  );
});

export default withLoading(AddOrder);
