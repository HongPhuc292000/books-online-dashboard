import { memo } from "react";
import {
  CardMedia,
  Grid,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ChangeAmountProducts from "./ChangeAmountProducts";
import { DetailBookByCode } from "types";
import { formatVND } from "utils";
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
  detailBook: DetailBookByCode;
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
  const {
    productId,
    bookCode,
    imageUrl,
    name,
    amount,
    defaultPrice,
    reducedPrice,
  } = detailBook;
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
      <Grid item xs={3}>
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
      <Grid item xs={2} textAlign="center">
        <ContentLabel
          style={{
            textDecoration: "line-through",
            marginRight: reducedPrice ? 8 : 0,
          }}
        >
          {formatVND(defaultPrice)}
        </ContentLabel>
        <ContentLabel style={{ color: theme.palette.common.black }}>
          {formatVND(reducedPrice)}
        </ContentLabel>
      </Grid>
      <Grid item xs={3}>
        <ChangeAmountProducts
          productId={productId}
          amount={amount}
          handleUpdateProductAmount={handleUpdateProductAmount}
          isEdit={isEdit}
        />
      </Grid>
      <Grid item xs={2} textAlign="center">
        <ContentLabel style={{ color: theme.palette.error.main }}>
          {reducedPrice
            ? formatVND(reducedPrice * amount)
            : formatVND(defaultPrice * amount)}
        </ContentLabel>
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
