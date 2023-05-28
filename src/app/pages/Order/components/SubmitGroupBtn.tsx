import DiscountIcon from "@mui/icons-material/Discount";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import ActionDialog from "app/components/ActionDialog";
import { drawerWidth } from "app/components/Sidebar";
import { useAppSelector } from "app/hooks";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatVND } from "utils";
import { selectOrder } from "../slice/selector";
import ApplyCodeDialog from "./ApplyCodeDialog";

const CheckoutContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  right: 0,
  background: theme.palette.common.white,
  padding: theme.spacing(0, 2),
  width: `calc(100% - ${drawerWidth}px)`,
}));

const CouponContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

const BtnGroup = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  justifyContent: "right",
  borderTop: `1px dashed ${theme.palette.grey[300]}`,
}));

const SelectedDiscountContainer = styled(Grid)(({ theme }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "right",
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
  const { selectedDiscount } = useAppSelector(selectOrder);
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleCloseDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <CheckoutContainer>
      <CouponContainer container>
        <SelectedDiscountContainer item container>
          <DiscountIcon color="primary" />
          <Typography ml={1} variant="body2">
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
          >
            {t("order.selectOrInputCoupon")}
          </Button>
        </Grid>
      </CouponContainer>
      <BtnGroup container>
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
