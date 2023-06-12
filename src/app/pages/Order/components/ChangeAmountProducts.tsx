import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Grid, IconButton, TextField } from "@mui/material";
import { memo } from "react";
import { UpdateAmountEnum } from "types/enums";

interface ChangeAmountProductsProps {
  amount: number;
  productId: string;
  handleUpdateProductAmount: (
    id: string,
    type: UpdateAmountEnum,
    amount?: number
  ) => void;
  isEdit?: boolean;
}

const ChangeAmountProducts = ({
  amount,
  productId,
  handleUpdateProductAmount,
  isEdit = false,
}: ChangeAmountProductsProps) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <IconButton
          disabled={isEdit}
          onClick={() => {
            handleUpdateProductAmount(productId, UpdateAmountEnum.REDUCE);
          }}
        >
          <RemoveCircleIcon />
        </IconButton>
      </Grid>
      <Grid item flex={1} alignSelf="stretch">
        <TextField
          type="text"
          size="small"
          variant="outlined"
          value={amount || ""}
          disabled={isEdit}
          inputProps={{ style: { textAlign: "center" } }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onMouseLeave={(e: any) => {
            if (!e.target.value) {
              handleUpdateProductAmount(productId, UpdateAmountEnum.REDUCE);
            }
          }}
          onChange={(e) => {
            const newValue = e.target.value ? parseInt(e.target.value) : 0;
            handleUpdateProductAmount(
              productId,
              UpdateAmountEnum.INSERT,
              newValue
            );
          }}
        />
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => {
            handleUpdateProductAmount(productId, UpdateAmountEnum.INCREASE);
          }}
          disabled={isEdit}
        >
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default memo(ChangeAmountProducts);
