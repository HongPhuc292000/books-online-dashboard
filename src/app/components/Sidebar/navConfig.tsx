import path from "app/routes/path";
import { HeaderNavChangePageI } from "types";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import CategoryIcon from "@mui/icons-material/Category";
import BookIcon from "@mui/icons-material/Book";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DiscountIcon from "@mui/icons-material/Discount";

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
    title: "manageMembers",
    link: path.member,
    icon: <ManageAccountsIcon />,
  },
  {
    title: "manageCustomers",
    link: path.customer,
    icon: <PeopleAltIcon />,
  },
  {
    title: "manageAuthors",
    link: path.author,
    icon: <PsychologyAltIcon />,
  },
  {
    title: "manageCategories",
    link: path.category,
    icon: <CategoryIcon />,
  },
  {
    title: "manageBooks",
    link: path.book,
    icon: <BookIcon />,
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
  },
];
