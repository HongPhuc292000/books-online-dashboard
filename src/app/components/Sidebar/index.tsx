import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import { appbarHeight } from "styles/constants";

import { pages } from "./navConfig";
import MainNav from "./Mainnav";
import Logo from "../Logo";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuth } from "app/pages/Auth/slice/selector";
import { useTranslation } from "react-i18next";
import { CommonDialogEnum, SettingNavEnums } from "types/enums";
import EditProfile from "./EditProfile";
import { withLoading } from "../HOC/withLinearLoading";
import ActionDialog from "../ActionDialog";
import { authActions } from "app/pages/Auth/slice";

export const drawerWidth = 300;
const settings = [SettingNavEnums.PROFILE, SettingNavEnums.LOGOUT];

const Sidebar = React.memo(() => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDialog, setShowdialog] = useState<string | undefined>(undefined);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { me } = useAppSelector(selectAuth);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(
      authActions.logout(() => {
        navigate("/");
      })
    );
  };

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    switch (setting) {
      case SettingNavEnums.PROFILE:
        setShowdialog(CommonDialogEnum.EDIT);
        break;
      case SettingNavEnums.LOGOUT:
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleCloseDialog = () => {
    setShowdialog(undefined);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1, textAlign: "right" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={me?.fullname} src={me?.imageUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: { xs: 5, sm: 6 } }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">
                    {t(`common.${setting}`)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "display": { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar>
            <Logo />
          </Toolbar>
          <Divider />
          <List>
            {pages.map((page) => (
              <MainNav key={page.title} page={page} />
            ))}
          </List>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            "display": { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Toolbar>
            <Logo />
          </Toolbar>
          <Divider />
          <List>
            {pages.map((page) => (
              <MainNav key={page.title} page={page} />
            ))}
          </List>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: appbarHeight.mainPaddingXs, sm: appbarHeight.mainPadding },
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: appbarHeight.xs, md: appbarHeight.md },
        }}
      >
        <Outlet />
      </Box>
      <ActionDialog
        title={t("member.editMember")}
        isOpen={showDialog === CommonDialogEnum.EDIT}
        dialogContent={<EditProfile onCloseDialog={handleCloseDialog} />}
        onCancel={handleCloseDialog}
        maxWidth="md"
      />
    </Box>
  );
});

export default withLoading(Sidebar);
