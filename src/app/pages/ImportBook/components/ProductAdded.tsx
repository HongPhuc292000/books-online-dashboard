import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import {
  CardMedia,
  Grid,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import ChangeAmountProducts from "app/pages/Order/components/ChangeAmountProducts";
import { memo } from "react";
import { ProductImport } from "types";
import { UpdateAmountEnum } from "types/enums";

const ContentLabel = styled("span")(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.grey[500],
}));

const ProductContainer = styled(Grid)(({ theme }) => ({
  alignItems: "center",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderBottom: `2px solid ${theme.palette.grey[300]}`,
}));

interface ProductAddedProps {
  detailBook: ProductImport;
  handleUpdateProductAmount: (
    id: string,
    type: UpdateAmountEnum,
    amount?: number
  ) => void;
  handleRemoveProduct: (id: string) => void;
  isEdit?: boolean;
}

const ProductAdded = ({
  detailBook,
  handleUpdateProductAmount,
  handleRemoveProduct,
  isEdit = false,
}: ProductAddedProps) => {
  const { productId, bookCode, imageUrl, name, amount } = detailBook;
  const theme = useTheme();

  return (
    <ProductContainer container>
      <Grid item xs={1}>
        <CardMedia
          component="img"
          sx={{ width: "100%" }}
          image={imageUrl}
          alt={`Product ${productId}`}
        />
      </Grid>
      <Grid item xs={7}>
        <Typography
          variant="caption"
          style={{ marginLeft: 8, color: theme.palette.grey[500] }}
        >
          {bookCode}
        </Typography>
        <Typography variant="body2" style={{ marginLeft: 8 }}>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <ChangeAmountProducts
          productId={productId}
          amount={amount}
          handleUpdateProductAmount={handleUpdateProductAmount}
          isEdit={isEdit}
        />
      </Grid>
      <Grid item xs={1} textAlign="right">
        <IconButton
          color="error"
          onClick={() => {
            handleRemoveProduct(productId);
          }}
          disabled={isEdit}
        >
          <DisabledByDefaultIcon />
        </IconButton>
      </Grid>
    </ProductContainer>
  );
};

export default memo(ProductAdded);
