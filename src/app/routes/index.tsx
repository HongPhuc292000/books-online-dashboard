import React from "react";
import DefaultLayout from "app/components/Layouts/DefaultLayout";
import LogoLayout from "app/components/Layouts/LogoLayout";
import Welcome from "app/pages/Welcome";
import { Navigate, useRoutes } from "react-router-dom";
import { isAuthenticated } from "utils/auth";
import Auth from "app/pages/Auth";
import NotFound from "app/pages/NotFound";
import ListBooks from "app/pages/Book";
import ListAuthors from "app/pages/Author/index";
import ListCategories from "app/pages/Category/index";

import path from "./path";

export default function Router() {
  return useRoutes([
    {
      path: path.root,
      element: isAuthenticated() ? (
        <DefaultLayout />
      ) : (
        <Navigate to={path.login} />
      ),
      children: [
        {
          index: true,
          element: <Navigate to={path.welcome} replace />,
        },
        {
          path: path.welcome,
          element: <Welcome />,
        },
        {
          path: path.book,
          element: <ListBooks />,
        },
        {
          path: path.author,
          element: <ListAuthors />,
        },
        {
          path: path.category,
          element: <ListCategories />,
        },
      ],
    },
    {
      path: path.root,
      element: <LogoLayout />,
      children: [
        {
          path: path.login,
          element: <Auth />,
        },
      ],
    },
    { path: path.all, element: <NotFound /> },
  ]);
}
