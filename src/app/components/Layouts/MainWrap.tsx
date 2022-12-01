import { styled, Box } from "@mui/material";
import { appbarHeight } from "styles/constants";

const MainWrap = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: `calc(100vh - ${appbarHeight.mainXs})`,
  },
  [theme.breakpoints.up("sm")]: {
    height: `calc(100vh - ${appbarHeight.mainSm})`,
  },
}));

export default MainWrap;
