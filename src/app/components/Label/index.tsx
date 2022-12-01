import { styled, Typography } from "@mui/material";

const PageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
}));

const TableLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  fontSize: "inherit",
  fontWeight: 600,
}));

export { PageTitle, TableLabel };
