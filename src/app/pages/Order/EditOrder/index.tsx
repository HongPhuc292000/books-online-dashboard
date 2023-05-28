import { Box, Button, Grid } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AddOrderRequest, Filter } from "types";

import { orderActions } from "../slice";
import { defaultValue, OrderSchema } from "../components/orderSchema.data";
import CommonFields from "../components/CommonFields";
import { useLoading } from "app/hooks/useLoading";
import { withLoading } from "app/components/HOC/withLinearLoading";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "app/components/Label/PageTitle";
import { drawerWidth } from "app/components/Sidebar";
import SubmitGroupBtn from "../components/SubmitGroupBtn";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectOrder } from "../slice/selector";

interface AddOrderProps {
  setLoading: Function;
}

const EditOrder = memo(({ setLoading }: AddOrderProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { detailOrder } = useAppSelector(selectOrder);
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();

  const handleGetDetailOrder = () => {
    if (id) {
      showLoading();
      dispatch(
        orderActions.getDetailOrder(id, (error) => {
          if (error) {
            showErrorSnackbar(t(`order.${error}`));
          }
          hideLoading();
        })
      );
    }
  };

  const handleSubmit = (values: AddOrderRequest) => {
    if (id) {
      showLoading();
      dispatch(
        orderActions.editOrder({ id: id, formData: values }, (error) => {
          if (error) {
            hideLoading();
            showErrorSnackbar(t(`order.${error}`));
          } else {
            hideLoading();
            showSuccessSnackbar(t("order.editSuccess"));
            handleGetDetailOrder();
          }
        })
      );
    }
  };

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: OrderSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const { orderDiscountPrices, totalPrices, orderPrices } = formik.values;

  const handleResetForm = () => {
    if (detailOrder) {
      formik.resetForm({
        values: {
          customerName: detailOrder.customerName,
          customerPhoneNumber: detailOrder.customerPhoneNumber,
          products: detailOrder.products,
          orderPrices: detailOrder.orderPrices,
          orderDiscountId: detailOrder?.orderDiscountId,
          orderDiscountPrices: detailOrder.orderDiscountPrices,
          totalPrices: detailOrder.totalPrices,
          status: detailOrder.status,
        },
      });
    }
  };

  useEffect(() => {
    handleGetDetailOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleResetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOrder]);

  return (
    <>
      <PageTitle title={t(`order.editOrder`)} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} isEdit />
        <SubmitGroupBtn
          orderDiscountPrices={orderDiscountPrices}
          orderPrices={orderPrices}
          totalPrices={totalPrices}
          isEdit
        />
      </Box>
    </>
  );
});

export default withLoading(EditOrder);
