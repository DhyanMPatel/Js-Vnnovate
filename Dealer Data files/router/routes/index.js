// ** React Imports
import { Fragment } from "react";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";
import PrivateRoute from "@components/routes/PrivateRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import AdminRoutes from "./Admin";
import UserRoutes from "./User";
import ProtectedRoute from "../../@core/components/routes/ProtectedRoute";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

const TemplateTitle = "%s - jlr React Admin Template";

const AdminDefaultRoute = "/admin/dashboard";
// const UserDefaultRoute = "/user/dashboard";
const UserDefaultRoute = "/dashboard";

// ** Merge Routes
const Routes = [...AdminRoutes, ...UserRoutes];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute;
        }

        /* Check for protected route */
        if (route.element) {
          const Wrapper =
            isObjEmpty(route.element.props) && isBlank === false
              ? LayoutWrapper
              : Fragment;

          const protectedElement = route.protected ? (
            <ProtectedRoute allowedRoles={route.allowedRoles}>
              {route.element}
            </ProtectedRoute>
          ) : (
            route.element
          );

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{protectedElement}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export {
  AdminDefaultRoute,
  UserDefaultRoute,
  TemplateTitle,
  Routes,
  getRoutes,
};
