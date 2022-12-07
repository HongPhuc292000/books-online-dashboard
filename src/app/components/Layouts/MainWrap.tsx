import { styled, Box } from "@mui/material";
import { appbarHeight } from "styles/constants";

const MainWrap = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: `calc(100vh - ${appbarHeight.mainXs})`,
  },
  [theme.breakpoints.up("md")]: {
    height: `calc(100vh - ${appbarHeight.mainMd})`,
  },
}));

export default MainWrap;
