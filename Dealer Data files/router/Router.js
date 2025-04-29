// ** Router imports
import { lazy } from "react";

// ** Router imports
import { useRoutes, Navigate } from "react-router-dom";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "../utility/Utils";

// ** GetRoutes
import { getRoutes } from "./routes";
import AccessDenied from "./routes/AccessDenied";
import Error from "../views/pages/misc/Error";

// ** Components
const Login = lazy(() => import("../views/pages/authentication/Login"));

const Router = () => {
  // ** Hooks
  const { layout } = useLayout();

  const allRoutes = getRoutes(layout);
  const getHomeRoute = () => {
    const user = getUserData();
    if (user) {
      return getHomeRouteForLoggedInUser(user.role);
    } else {
      return "/login";
    }
  };

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    {
      path: "/login",
      element: <BlankLayout />,
      children: [{ path: "/login", element: <Login /> }],
    },
    {
      path: "/access-denied",
      children: [{ path: "/access-denied", element: <AccessDenied /> }],
    },
    {
      path: "*",
      children: [{ path: "*", element: <Error /> }],
    },
    ...allRoutes,
  ]);
  return routes;
};
export default Router;
