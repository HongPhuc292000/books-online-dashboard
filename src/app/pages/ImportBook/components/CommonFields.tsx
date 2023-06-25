import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { memo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAppDispatch } from "app/hooks";
import { orderActions } from "app/pages/Order/slice";
import { UpdateAmountEnum } from "types/enums";
import { ProductImport } from "types";
import ProductAdded from "./ProductAdded";

interface CommonFieldsProps {
  formik: any;
  isEdit?: boolean;
}

const CommonFields = memo(({ formik, isEdit = false }: CommonFieldsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [bookCode, setBookCode] = useState<string>("");

  const handleRemoveProduct = useCallback(
    (id: string) => {
      const selectedBooks = formik.values["products"];
      formik.setFieldValue(
        "products",
        selectedBooks.filter((item: ProductImport) => item.productId !== id)
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik.values]
  );

  const handleUpdateProductData = (productNeedUpdate: ProductImport) => {
    const selectedBooks = formik.values["products"];
    formik.setFieldValue(
      "products",
      selectedBooks.map((item: ProductImport) => {
        if (item.productId === productNeedUpdate.productId) {
          return { ...item, ...productNeedUpdate };
        } else {
          return item;
        }
      })
    );
  };

  // Update Amount In Product
  const handleUpdateProductAmount = useCallback(
    (id: string, type: UpdateAmountEnum, amount?: number) => {
      const selectedBooks = formik.values["products"];
      const readOnlyProductNeedUpdate = selectedBooks.find(
        (item: ProductImport) => item.productId === id
      );
      if (readOnlyProductNeedUpdate) {
        const productNeedUpdate: ProductImport = {
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
              formik.setFieldValue(
                "products",
                selectedBooks.filter(
                  (item: ProductImport) => item.productId !== id
                ),
                true
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik.values]
  );

  const handleAddBookToOrder = () => {
    if (bookCode) {
      const fullBookCode = "BS" + bookCode;
      dispatch(
        orderActions.getDetailBookByCode(fullBookCode, (result) => {
          if (result) {
            const selectedBooks = formik.values["products"];
            const existBook = selectedBooks.find(
              (item: any) => item.bookCode === fullBookCode
            );
            if (existBook) {
              handleUpdateProductAmount(
                existBook.productId,
                UpdateAmountEnum.INCREASE
              );
            } else {
              formik.setFieldValue(
                "products",
                [
                  ...selectedBooks,
                  {
                    productId: result.productId,
                    amount: result.amount,
                    bookCode: result.bookCode,
                    imageUrl: result.imageUrl,
                    name: result.name,
                  },
                ],
                true
              );
            }
          }
          //   else {
          //     handleSetInfoNote("add");
          //   }
        })
      );
    }
  };

  console.log(formik.values);

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="orderCode"
            name="orderCode"
            value={formik.values.orderCode}
            onChange={formik.handleChange}
            fullWidth
            disabled
            sx={{ mb: 2 }}
            label={`${t("importBook.orderCode")}*`}
            error={formik.touched.orderCode && !!formik.errors.orderCode}
            helperText={
              formik.touched.orderCode && t(formik.errors.orderCode as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
            error={!!formik.errors.products}
          >
            <InputLabel htmlFor="outlined-adornment-productCode">
              {t("book.bookCode")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-productCode"
              startAdornment={
                <InputAdornment position="start">BS</InputAdornment>
              }
              disabled={isEdit}
              onChange={(e) => {
                // handleSetInfoNote();
                setBookCode(e.target.value);
              }}
              // error={!!formik.errors.products}
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
            <FormHelperText color="error" id="outlined-productCode-helper-text">
              {t(formik.errors.products)}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        {formik.values["products"]
          ? formik.values["products"].map((product: ProductImport) => (
              <ProductAdded
                key={product.productId}
                detailBook={product}
                handleUpdateProductAmount={handleUpdateProductAmount}
                handleRemoveProduct={handleRemoveProduct}
                isEdit={isEdit}
              />
            ))
          : null}
      </Grid>
    </Paper>
  );
});

export default CommonFields;
