import { Paper, Typography } from "@mui/material";
import { formatVND } from "utils";

interface SmallSalesFiguresProps {
  label: string;
  value?: number;
  backgroundColor: string;
  color?: string;
  isCurrency?: boolean;
  mb?: number;
}

const SmallSalesFigures = ({
  label,
  value = 0,
  backgroundColor,
  color = "black",
  isCurrency = false,
  mb = 0,
}: SmallSalesFiguresProps) => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, backgroundColor: backgroundColor, mb: mb }}
    >
      <Typography color={color}>{label}</Typography>
      <Typography>{isCurrency ? formatVND(value) : value}</Typography>
    </Paper>
  );
};

export default SmallSalesFigures;
