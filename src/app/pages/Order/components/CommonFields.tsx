import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { debounce } from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DetailBookByCode } from "types";
import { DiscountTypeEnum, UpdateAmountEnum } from "types/enums";
import { orderActions } from "../slice";
import { selectOrder } from "../slice/selector";
import ProductAdded from "./ProductAdded";
import OrderSteps from "./OrderSteps";

interface CommonFieldsProps {
  formik: any;
  isEdit?: boolean;
}

const CommonFields = memo(({ formik, isEdit = false }: CommonFieldsProps) => {
  const { t } = useTranslation();
  const { detailCustomer, selectedDiscount, detailOrder } =
    useAppSelector(selectOrder);
  const dispatch = useAppDispatch();

  const [bookCode, setBookCode] = useState<string>("");
  const [selectedBooks, setSelectedBooks] = useState<DetailBookByCode[]>([]);
  const [infoBookNote, setInfoBookNote] = useState<string>("");

  const handleRemoveProduct = useCallback((id: string) => {
    setSelectedBooks((prev) => prev.filter((item) => item.productId !== id));
  }, []);

  const handleUpdateProductData = (productNeedUpdate: DetailBookByCode) => {
    setSelectedBooks((prev) => {
      return prev.map((item) => {
        if (item.productId === productNeedUpdate.productId) {
          return { ...item, ...productNeedUpdate };
        } else {
          return item;
        }
      });
    });
  };

  // Update Amount In Product
  const handleUpdateProductAmount = useCallback(
    (id: string, type: UpdateAmountEnum, amount?: number) => {
      const readOnlyProductNeedUpdate = selectedBooks.find(
        (item) => item.productId === id
      );
      if (readOnlyProductNeedUpdate) {
        const productNeedUpdate: DetailBookByCode = {
          ...readOnlyProductNeedUpdate,
        };
        switch (type) {
          case UpdateAmountEnum.INCREASE:
            productNeedUpdate.amount = productNeedUpdate.amount + 1;
            handleUpdateProductData(productNeedUpdate);
            break;
          case UpdateAmountEnum.REDUCE:
            productNeedUpdate.amount = productNeedUpdate.amount - 1;
            if (productNeedUpdate.amount < 1) {
              setSelectedBooks((prev) =>
                prev.filter((item) => item.productId !== id)
              );
            } else {
              handleUpdateProductData(productNeedUpdate);
            }
            break;
          case UpdateAmountEnum.INSERT:
            if (amount) {
              productNeedUpdate.amount = amount;
            } else {
              productNeedUpdate.amount = 0;
            }
            handleUpdateProductData(productNeedUpdate);
            break;
          default:
            break;
        }
      }
    },
    [selectedBooks]
  );

  const handleSetInfoNote = (type?: string) => {
    if (type) {
      setInfoBookNote(t("order.bookInfoNote") || "");
    } else {
      setInfoBookNote("");
    }
  };

  // Add New Book To Order
  const handleAddBookToOrder = () => {
    if (bookCode) {
      const fullBookCode = "BS" + bookCode;
      dispatch(
        orderActions.getDetailBookByCode(fullBookCode, (result) => {
          if (result) {
            const existBook = selectedBooks.find(
              (item) => item.bookCode === fullBookCode
            );
            if (existBook) {
              handleUpdateProductAmount(
                existBook.productId,
                UpdateAmountEnum.INCREASE
              );
            } else {
              setSelectedBooks((prev) => [...prev, result]);
            }
          } else {
            handleSetInfoNote("add");
          }
        })
      );
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchCustomer = useCallback(
    debounce((phoneNumber) => {
      if (phoneNumber.length === 10) {
        dispatch(orderActions.getDetailCustomerByPhone(phoneNumber));
      }
    }, 500),
    []
  );

  const handleChangePhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formik.setFieldValue("customerPhoneNumber", e.target.value);
    debounceSearchCustomer(e.target.value);
  };

  // Update Prices In Formik
  const handleUpdatePrices = () => {
    let totalOrderPrices = 0;
    if (selectedBooks) {
      selectedBooks.forEach((book) => {
        const bookPrice = book.reducedPrice
          ? book.reducedPrice
          : book.defaultPrice;
        totalOrderPrices += bookPrice * book.amount;
      });
    }
    const orderDiscountPrices = (() => {
      if (selectedDiscount) {
        if (selectedDiscount.type === DiscountTypeEnum.CASH) {
          return selectedDiscount.value;
        } else {
          return (totalOrderPrices * selectedDiscount.value) / 100;
        }
      } else {
        return 0;
      }
    })();

    const totalPrices =
      orderDiscountPrices > totalOrderPrices
        ? 0
        : totalOrderPrices - orderDiscountPrices;
    formik.setFieldValue("orderPrices", totalOrderPrices);
    formik.setFieldValue("orderDiscountId", selectedDiscount?._id);
    formik.setFieldValue("orderDiscountPrices", orderDiscountPrices);
    formik.setFieldValue("totalPrices", totalPrices);
  };

  const handleUpdateProductsSubmit = () => {
    formik.setFieldValue("products", selectedBooks);
  };

  const handleResetForm = () => {
    if (detailOrder) {
      setSelectedBooks([...detailOrder.products]);
      if (detailOrder?.orderDiscountId) {
        dispatch(
          orderActions.resetSelectedDiscount(detailOrder.orderDiscountId)
        );
      }
    }
  };

  useEffect(() => {
    if (detailCustomer) {
      formik.setFieldValue("customerName", detailCustomer.fullname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailCustomer]);

  useEffect(() => {
    handleUpdatePrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBooks, selectedDiscount]);

  useEffect(() => {
    handleUpdateProductsSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBooks]);

  useEffect(() => {
    if (isEdit) {
      handleResetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOrder]);

  useEffect(() => {
    return () => {
      dispatch(orderActions.setSelectedDiscount(undefined));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{ p: 2, maxHeight: "62vh", overflowY: "auto", marginTop: "-6px" }}
    >
      {isEdit ? <OrderSteps formik={formik} /> : null}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="customerPhoneNumber"
            name="customerPhoneNumber"
            value={formik.values.customerPhoneNumber}
            onChange={handleChangePhoneNumber}
            fullWidth
            disabled={isEdit}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            sx={{ mb: 2 }}
            label={`${t("member.phoneNumber")}*`}
            error={
              formik.touched.customerPhoneNumber &&
              !!formik.errors.customerPhoneNumber
            }
            helperText={
              formik.touched.customerPhoneNumber &&
              t(formik.errors.customerPhoneNumber as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="customerName"
            name="customerName"
            value={formik.values.customerName}
            onChange={formik.handleChange}
            fullWidth
            disabled={isEdit}
            sx={{ mb: 2 }}
            label={`${t("order.customerName")}*`}
            error={formik.touched.customerName && !!formik.errors.customerName}
            helperText={
              formik.touched.customerName &&
              t(formik.errors.customerName as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item container xs={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-adornment-bookCode">
              {t("book.bookCode")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-bookCode"
              startAdornment={
                <InputAdornment position="start">BS</InputAdornment>
              }
              disabled={isEdit}
              onChange={(e) => {
                handleSetInfoNote();
                setBookCode(e.target.value);
              }}
              value={bookCode}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="large"
                    sx={{ marginRight: "-14px" }}
                    onClick={handleAddBookToOrder}
                    disabled={isEdit}
                  >
                    <AddCircleIcon fontSize="inherit" />
                  </IconButton>
                </InputAdornment>
              }
              label={t("book.bookCode")}
            />
            <FormHelperText id="outlined-bookCode-helper-text">
              {infoBookNote}
            </FormHelperText>
          </FormControl>
        </Grid>

        {detailOrder?.customerAddress ? (
          <Grid item xs={6}>
            <Typography variant="body2">
              {t("order.receiveAddress", {
                receiveAddress: detailOrder?.customerAddress,
              })}
            </Typography>
          </Grid>
        ) : null}
      </Grid>
      <Box>
        <Typography variant="body1">{t("order.listBooks")}</Typography>
        {!!formik.errors.products ? (
          <FormHelperText error>{t(formik.errors.products)}</FormHelperText>
        ) : null}
        {selectedBooks.map((book) => (
          <ProductAdded
            key={book.productId}
            detailBook={book}
            handleUpdateProductAmount={handleUpdateProductAmount}
            handleRemoveProduct={handleRemoveProduct}
            isEdit={isEdit}
          />
        ))}
      </Box>
    </Paper>
  );
});

export default CommonFields;
