import {
  Box,
  Button,
  Chip,
  Grid,
  Radio,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { memo, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectOrder } from "../slice/selector";
import { Discount } from "types";
import moment from "moment";
import { DiscountTypeEnum } from "types/enums";
import { formatVND } from "utils";
import { initialState, orderActions } from "../slice";

const DiscountCodeContainer = styled(Box)(({ theme }) => ({
  maxHeight: "60vh",
  overflowY: "auto",
}));

interface DiscountCodeProps {
  codeDetail: Discount;
  handleToggleCodeTemp: (discount?: Discount) => void;
  selectedCodeTemp?: Discount;
}

const DiscountCode = memo(
  ({
    codeDetail,
    handleToggleCodeTemp,
    selectedCodeTemp,
  }: DiscountCodeProps) => {
    const { code, description, type, value, exp } = codeDetail;
    const theme = useTheme();
    const { t } = useTranslation();

    const controlProps = () => ({
      checked: selectedCodeTemp?.code === code,
      onClick: () => {
        if (selectedCodeTemp?.code === code) {
          handleToggleCodeTemp(undefined);
        } else {
          handleToggleCodeTemp(codeDetail);
        }
      },
      value: code,
      name: "coupon-radio-box",
      inputProps: { "aria-label": code },
    });

    return (
      <Grid container alignItems="center" mb={1}>
        <Grid item>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              fontSize: "68px",
              display: "flex",
              marginRight: 2,
            }}
          >
            <MonetizationOnIcon fontSize="inherit" color="inherit" />
          </Box>
        </Grid>
        <Grid item flex={1}>
          <Typography variant="body2">{`${code} - ${description}`}</Typography>
          <Typography variant="body2">
            {t("order.saleForOrder", {
              value:
                type === DiscountTypeEnum.CASH
                  ? `${formatVND(value)}`
                  : `${value}%`,
            })}
          </Typography>
          <Typography variant="caption">
            {t("discount.exp")}: {moment(exp).format("h:mm:ss A - DD/MM/YYYY")}
          </Typography>
        </Grid>
        <Grid item>
          <Radio {...controlProps()} />
        </Grid>
      </Grid>
    );
  }
);

interface ApplyCodeDialogProps {
  handleCloseDialog: () => void;
}

const ApplyCodeDialog = memo(({ handleCloseDialog }: ApplyCodeDialogProps) => {
  const { t } = useTranslation();
  const { listCodesForOrder, filterCode, selectedDiscount } =
    useAppSelector(selectOrder);
  const dispatch = useAppDispatch();

  const [searchKey, setSearchKey] = useState<string>("");
  const [selectedCodeTemp, setSelectedCodeTemp] = useState<
    Discount | undefined
  >(undefined);

  const handleToggleCodeTemp = useCallback((discount?: Discount) => {
    setSelectedCodeTemp(discount);
  }, []);

  const handleToggleShowData = () => {
    if (filterCode.all) {
      dispatch(orderActions.setFilterCode({ ...filterCode, all: false }));
    } else {
      dispatch(orderActions.setFilterCode({ ...filterCode, all: true }));
    }
  };

  const handleSaveSelectedDiscount = () => {
    dispatch(orderActions.setSelectedDiscount(selectedCodeTemp));
    handleCloseDialog();
  };

  useEffect(() => {
    dispatch(orderActions.getAllDiscounts(filterCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCode]);

  useEffect(() => {
    if (selectedDiscount) {
      handleToggleCodeTemp(selectedDiscount);
    }
    return () => {
      dispatch(orderActions.setFilterCode(initialState.filterCode));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Grid container spacing={1} alignItems="center" mb={2}>
        <Grid item>{t("order.inputBookCode")}</Grid>
        <Grid item flex={1}>
          <TextField
            fullWidth
            size="small"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              dispatch(
                orderActions.setFilterCode({ ...filterCode, searchKey })
              );
            }}
          >
            {t("common.apply")}
          </Button>
        </Grid>
      </Grid>
      <DiscountCodeContainer>
        {listCodesForOrder?.data?.length ? (
          listCodesForOrder.data.map((code) => (
            <DiscountCode
              key={code._id}
              handleToggleCodeTemp={handleToggleCodeTemp}
              selectedCodeTemp={selectedCodeTemp}
              codeDetail={code}
            />
          ))
        ) : (
          <Grid container justifyContent="center" width="inherit">
            <Chip
              sx={{
                "height": "auto",
                "& .MuiChip-label": {
                  display: "block",
                  whiteSpace: "normal",
                },
              }}
              label={t("order.notFoundDiscountCode")}
              color="error"
              variant="outlined"
            />
          </Grid>
        )}
      </DiscountCodeContainer>
      <Box textAlign="center" mt={2}>
        <Button variant="outlined" onClick={handleToggleShowData}>
          {filterCode.all ? t("common.hideaway") : t("common.showmore")}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSaveSelectedDiscount}
          sx={{ mr: 1, ml: 1 }}
        >
          {t("common.accept")}
        </Button>
        <Button variant="contained" color="error" onClick={handleCloseDialog}>
          {t("common.back")}
        </Button>
      </Box>
    </Box>
  );
});

export default ApplyCodeDialog;
