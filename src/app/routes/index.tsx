import React from "react";
import { DefaultLayout } from "app/components/Layouts";
import Welcome from "app/pages/Welcome";
import { Navigate, useRoutes } from "react-router-dom";
import { isAuthenticated } from "utils/auth";

import path from "./path";
import Auth from "app/pages/Auth";
import LogoLayout from "app/components/Layouts/LogoLayout";
import NotFound from "app/pages/NotFound";
import ListBooks from "app/pages/Book";

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
        { path: path.all, element: <NotFound /> },
      ],
    },
  ]);
}
