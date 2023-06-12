import { Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PageTitleContent } from ".";
import { useNavigate } from "react-router-dom";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Grid container alignItems="center" mt="-12px">
      <IconButton onClick={handleClick} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <PageTitleContent variant="h4">{title}</PageTitleContent>
    </Grid>
  );
};

export default PageTitle;
