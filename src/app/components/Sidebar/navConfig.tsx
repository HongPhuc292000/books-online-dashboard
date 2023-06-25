import path from "app/routes/path";
import { HeaderNavChangePageI } from "types";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import CategoryIcon from "@mui/icons-material/Category";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DiscountIcon from "@mui/icons-material/Discount";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { RolesPermission } from "types/enums";

/*
demo create newsidebar with children
{
  title: "home",
  link: path.welcome,
  icon: <HomeIcon />,
  children: [
    {
      title: "test",
      link: path.welcome,
      icon: <HomeIcon />,
    },
  ],
},
*/

export const pages: HeaderNavChangePageI[] = [
  {
    title: "home",
    link: path.welcome,
    icon: <HomeIcon />,
  },
  {
    title: "saleFigures",
    link: path.salesFigures,
    icon: <BarChartIcon />,
    permission: RolesPermission.SHOW_LIST_MEMBER,
    children: [
      {
        title: "saleFiguresPerMonth",
        link: path.salesFigures + path.perMonth,
        permission: RolesPermission.SHOW_LIST_MEMBER,
      },
      {
        title: "saleFiguresPerYear",
        link: path.salesFigures + path.perYear,
        permission: RolesPermission.SHOW_LIST_MEMBER,
      },
    ],
  },
  {
    title: "manageMembers",
    link: path.member,
    icon: <ManageAccountsIcon />,
    permission: RolesPermission.SHOW_LIST_MEMBER,
  },
  {
    title: "manageCustomers",
    link: path.customer,
    icon: <PeopleAltIcon />,
    permission: RolesPermission.SHOW_LIST_CUSTOMER,
  },
  {
    title: "manageAuthors",
    link: path.author,
    icon: <PsychologyAltIcon />,
    permission: RolesPermission.SHOW_LIST_AUTHOR,
  },
  {
    title: "manageCategories",
    link: path.category,
    icon: <CategoryIcon />,
  },
  {
    title: "manageBooks",
    link: path.book,
    icon: <AutoStoriesIcon />,
  },
  {
    title: "manageDiscounts",
    link: path.discount,
    icon: <DiscountIcon />,
  },
  {
    title: "manageOrders",
    link: path.order,
    icon: <ShoppingBagIcon />,
    permission: RolesPermission.SHOW_LIST_ORDER,
  },
  {
    title: "manageImportBooks",
    link: path.importBook,
    icon: <AddBusinessIcon />,
    permission: RolesPermission.SHOW_LIST_IMPORT_BOOK,
  },
];
