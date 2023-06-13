import { Box, Paper } from "@mui/material";
import { SalesFiguresAmount, SalesFiguresTitle } from "./Label";
import { formatVND } from "utils";

interface BigSalesFiguresProps {
  label: string;
  value?: number;
  backgroundColor: string;
  isCurrency?: boolean;
}

const BigSalesFigures = ({
  label,
  value = 0,
  backgroundColor,
  isCurrency = false,
}: BigSalesFiguresProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: "100%",
        backgroundColor: backgroundColor,
        display: "flex",
      }}
    >
      <Box margin="auto 0">
        <SalesFiguresTitle>{label}</SalesFiguresTitle>
        <SalesFiguresAmount>
          {isCurrency ? formatVND(value) : value}
        </SalesFiguresAmount>
      </Box>
    </Paper>
  );
};

export default BigSalesFigures;
