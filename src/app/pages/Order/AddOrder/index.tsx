import { Box } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AddOrderRequest } from "types";

import { withLoading } from "app/components/HOC/withLinearLoading";
import PageTitle from "app/components/Label/PageTitle";
import { useLoading } from "app/hooks/useLoading";
import { useNavigate } from "react-router-dom";
import CommonFields from "../components/CommonFields";
import { defaultValue, OrderSchema } from "../components/orderSchema.data";
import SubmitGroupBtn from "../components/SubmitGroupBtn";
import { orderActions } from "../slice";

interface AddOrderProps {
  setLoading: Function;
}

const AddOrder = memo(({ setLoading }: AddOrderProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();

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
          navigate(-1);
        }
      })
    );
  };

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: OrderSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const { orderDiscountPrices, totalPrices, orderPrices } = formik.values;

  return (
    <>
      <PageTitle title={t(`order.addOrder`)} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} />
        <SubmitGroupBtn
          orderDiscountPrices={orderDiscountPrices}
          orderPrices={orderPrices}
          totalPrices={totalPrices}
        />
      </Box>
    </>
  );
});

export default withLoading(AddOrder);
