import { styled, Typography } from "@mui/material";

const PageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  paddingBottom: theme.spacing(2),
}));

const TableHeaderLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  fontSize: "inherit",
  fontWeight: 600,
}));

const TableContentLabel = styled(Typography)(() => ({
  fontSize: 14,
}));

export { PageTitle, TableHeaderLabel, TableContentLabel };
