// ** React Imports
import { lazy } from "react";

const AccessControl = lazy(() =>
  import("../../views/extensions/access-control")
);
const ForgotPassword = lazy(() =>
  import("../../views/pages/authentication/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("../../views/pages/authentication/ResetPassword")
);
const ReportCharts = lazy(() => import("../../views/report/ReportCharts"));
const ReportPreview = lazy(() =>
  import("../../views/report/TabComponent/reportPreview")
);
const CustomerManagement = lazy(() => import("../../views/customers/index"));
const SalesManagement = lazy(() => import("../../views/sales/index"));
const VehiclesManagement = lazy(() => import("../../views/vehicles/index"));
const VehicleReport = lazy(() =>
  import("../../views/vehicleReports/VehicleReports")
);
const Profile = lazy(() => import("../../views/profile/Profile"));
const Login = lazy(() => import("../../views/pages/authentication/Login"));
const users = JSON.parse(localStorage.getItem("userRole")) || "[]";
const SalesFunnel = lazy(() => import("../../views/sales-Funnel/salesFunnel"));
const Salesv2 = lazy(() => import("../../views/sales-v2/salesv2"));

const UserRoutes = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: "/charts/details",
    element: <ReportCharts />,
  },
  {
    path: "/charts/preview",
    element: <ReportPreview />,
  },
  {
    path: "/dashboard",
    element: <AccessControl />,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    layout: "BlankLayout",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: "/vehicle/management",
    element: <VehiclesManagement />,
  },
  {
    path: "/customers/management",
    element: <CustomerManagement />,
  },
  {
    path: "/sales/management",
    element: <SalesManagement />,
  },
  {
    path: "/vehicle/reports",
    element: <VehicleReport />,
  },
  // {
  //   path: "/vehicle/ownership",
  //   element: <Salesv2 />,
  // },
  {
    path: "/vehical-ownership",
    element: <Salesv2 />,
  },
  {
    path: "/report/vehicle/:id",
    element: <VehicleReport />,
  },
  {
    path: "/sales/funnel",
    element: <SalesFunnel />,
  },

  {
    path: "/reset/:userid/:token",
    element: <ResetPassword />,
    layout: "BlankLayout",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
];

export default UserRoutes;
