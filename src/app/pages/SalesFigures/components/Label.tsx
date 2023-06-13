import { Typography, styled } from "@mui/material";

const SalesFiguresTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const SalesFiguresAmount = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "32px",
}));

export { SalesFiguresTitle, SalesFiguresAmount };
