import React, { memo } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  useTheme,
  Typography,
} from "@mui/material";
import { HeaderNavChangePageI } from "types";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useNavigate } from "react-router-dom";
import { useMatchPath } from "app/hooks/useMatchPath";
import { useTranslation } from "react-i18next";

interface NavProps {
  page: HeaderNavChangePageI;
}

interface SubNavProps {
  navItems?: HeaderNavChangePageI[];
  isOpenSubNav: boolean;
}

const SubNav = memo(({ page }: NavProps) => {
  const { t } = useTranslation();
  const { title, link } = page;
  const navigate = useNavigate();
  const { match } = useMatchPath(link);

  const theme = useTheme();
  const handleSelectSubNav = (target: string) => {
    navigate(target);
  };
  return (
    <ListItem onClick={() => handleSelectSubNav(link)} disablePadding>
      <ListItemButton
        sx={{ color: match ? theme.palette.primary.main : "inherit", pl: 8 }}
      >
        <ListItemIcon
          sx={{
            minWidth: 28,
            fontSize: 12,
            color: match ? theme.palette.primary.main : "inherit",
          }}
        >
          <FiberManualRecordIcon fontSize="inherit" />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body2">{t(`sidebar.${title}`)}</Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
});

const SubNavWrap = memo(({ navItems, isOpenSubNav }: SubNavProps) => {
  return (
    <Collapse in={isOpenSubNav} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {navItems ? (
          <>
            {navItems.map((nav) => {
              return <SubNav page={nav} key={nav.title} />;
            })}
          </>
        ) : null}
      </List>
    </Collapse>
  );
});

const MainNav = memo(({ page }: NavProps) => {
  const { title, link, children, icon = <></> } = page;
  const theme = useTheme();
  const [openSubNav, setOpenSubNav] = React.useState<boolean>(false);
  const { match } = useMatchPath(link);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectNav = () => {
    if (children) {
      setOpenSubNav(!openSubNav);
    } else {
      navigate(link);
    }
  };

  return (
    <>
      <ListItem disablePadding onClick={handleSelectNav}>
        <ListItemButton
          sx={{
            color: match ? theme.palette.primary.main : theme.palette.grey[700],
            paddingLeft: theme.spacing(5),
          }}
          selected={match}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: match
                ? theme.palette.primary.main
                : theme.palette.grey[700],
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2">{t(`sidebar.${title}`)}</Typography>
            }
          />
          {children ? (
            <>{openSubNav ? <ExpandLess /> : <ExpandMore />}</>
          ) : null}
        </ListItemButton>
      </ListItem>
      {children ? (
        <SubNavWrap isOpenSubNav={openSubNav} navItems={children} />
      ) : null}
    </>
  );
});

export default MainNav;
