import React from "react";
import DefaultLayout from "app/components/Layouts/DefaultLayout";
import LogoLayout from "app/components/Layouts/LogoLayout";
import Welcome from "app/pages/Welcome";
import { Navigate, useRoutes } from "react-router-dom";
import { isAuthenticated } from "utils/auth";
import Auth from "app/pages/Auth";
import NotFound from "app/pages/NotFound";
import ListBooks from "app/pages/Book";
import ListAuthors from "app/pages/Author";
import ListCategories from "app/pages/Category";
import ListDiscounts from "app/pages/Discount";
import ListMembers from "app/pages/Member";
import ListCustomers from "app/pages/Customer";
import ListOrders from "app/pages/Order";
import AddBook from "app/pages/Book/AddBook";
import EditBook from "app/pages/Book/EditBook";
import AddOrder from "app/pages/Order/AddOrder";
import EditOrder from "app/pages/Order/EditOrder";

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
          path: path.member,
          element: <ListMembers />,
        },
        {
          path: path.customer,
          element: <ListCustomers />,
        },
        {
          path: path.book,
          children: [
            {
              path: path.inherit,
              element: <ListBooks />,
            },
            {
              path: path.add,
              element: <AddBook />,
            },
            {
              path: path.edit,
              element: <EditBook />,
            },
          ],
        },
        {
          path: path.author,
          element: <ListAuthors />,
        },
        {
          path: path.category,
          element: <ListCategories />,
        },
        {
          path: path.discount,
          element: <ListDiscounts />,
        },
        {
          path: path.order,
          children: [
            {
              path: path.inherit,
              element: <ListOrders />,
            },
            {
              path: path.add,
              element: <AddOrder />,
            },
            {
              path: path.edit,
              element: <EditOrder />,
            },
          ],
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
