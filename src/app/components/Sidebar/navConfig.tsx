import path from "app/routes/path";
import { HeaderNavChangePageI } from "types";
import HomeIcon from "@mui/icons-material/Home";

export const pages: HeaderNavChangePageI[] = [
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
];
