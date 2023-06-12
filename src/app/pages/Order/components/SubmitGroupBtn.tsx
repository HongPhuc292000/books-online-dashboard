import DiscountIcon from "@mui/icons-material/Discount";
import { Box, Button, Grid, Typography, styled, useTheme } from "@mui/material";
import ActionDialog from "app/components/ActionDialog";
import { drawerWidth } from "app/components/Sidebar";
import { useAppSelector } from "app/hooks";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatVND } from "utils";
import { selectOrder } from "../slice/selector";
import ApplyCodeDialog from "./ApplyCodeDialog";
import VerifiedIcon from "@mui/icons-material/Verified";

const CheckoutContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  right: 0,
  background: theme.palette.common.white,
  padding: theme.spacing(0, 2),
  width: `calc(100% - ${drawerWidth}px)`,
}));

const CouponContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const BtnGroup = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  borderTop: `1px dashed ${theme.palette.grey[300]}`,
}));

const SelectedDiscountContainer = styled(Grid)(({ theme }) => ({
  flex: 1,
  alignItems: "center",
  fontSize: "14px",
}));

interface SubmitGroupBtnProps {
  orderDiscountPrices?: number;
  orderPrices: number;
  totalPrices: number;
  isEdit?: boolean;
}

const SubmitGroupBtn = ({
  orderDiscountPrices = 0,
  orderPrices,
  totalPrices = 0,
  isEdit = false,
}: SubmitGroupBtnProps) => {
  const { t } = useTranslation();
  const { selectedDiscount, detailOrder } = useAppSelector(selectOrder);
  const navigate = useNavigate();
  const theme = useTheme();

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleCloseDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <CheckoutContainer>
      <CouponContainer container>
        <SelectedDiscountContainer
          justifyContent={detailOrder?.orderCode ? "space-between" : "right"}
          item
          container
        >
          {detailOrder?.orderCode ? (
            <Typography variant="body2">
              {t("order.orderCode", { orderCode: detailOrder?.orderCode })}
            </Typography>
          ) : null}
          <Typography ml={1} variant="body2" display="flex" alignItems="center">
            <DiscountIcon color="primary" />
            {t(
              `order.${
                selectedDiscount ? "selectedCoupon" : "notSelectedCoupon"
              }`
            )}
          </Typography>
        </SelectedDiscountContainer>
        <Grid item xs={3} textAlign="right">
          <Button
            onClick={() => {
              setShowDialog(true);
            }}
            disabled={isEdit}
          >
            {t("order.selectOrInputCoupon")}
          </Button>
        </Grid>
      </CouponContainer>
      <BtnGroup
        container
        justifyContent={detailOrder?.checkout ? "space-between" : "right"}
      >
        {detailOrder?.checkout ? (
          <Typography
            alignSelf="center"
            display="flex"
            alignItems="center"
            color={theme.palette.success.main}
          >
            <VerifiedIcon sx={{ marginRight: 1 }} />
            {t("order.checkedOut")}
          </Typography>
        ) : null}
        <Box display="flex">
          <Box mr={2}>
            <Grid container justifyContent="right">
              <Typography>{`${t("order.totalPay")}:`}</Typography>
              <Typography variant="h4" ml={1} color="primary">
                {formatVND(totalPrices)}
              </Typography>
            </Grid>
            {orderDiscountPrices ? (
              <Grid container justifyContent="right">
                <Typography variant="body2">{t("order.saving")}</Typography>
                <Typography variant="body2" ml={1} color="primary">
                  {formatVND(
                    orderPrices > orderDiscountPrices
                      ? orderDiscountPrices
                      : orderPrices
                  )}
                </Typography>
              </Grid>
            ) : null}
          </Box>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mr: 1 }}
            >
              {isEdit ? t("common.edit") : t("common.addNew")}
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
          </Box>
        </Box>
      </BtnGroup>
      <ActionDialog
        title={t("order.selectCoupon")}
        isOpen={showDialog}
        dialogContent={
          <ApplyCodeDialog handleCloseDialog={handleCloseDialog} />
        }
        onCancel={handleCloseDialog}
      />
    </CheckoutContainer>
  );
};

export default memo(SubmitGroupBtn);
