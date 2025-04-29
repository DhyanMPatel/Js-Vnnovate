// ** React Imports
import { lazy } from "react";
import { VerifyOTP } from "../../views/auth/VerifyOTP";
const ReportCharts = lazy(() => import("../../views/report/ReportCharts"));
const VehicleReports = lazy(() =>
  import("../../views/vehicleReports/VehicleReports")
);
const ReportPreview = lazy(() =>
  import("../../views/report/TabComponent/reportPreview")
);
const Salesv2 = lazy(() => import("../../views/sales-v2/salesv2.js"));
const UserManagement = lazy(() => import("../../views/users/index"));
const CustomerManagement = lazy(() => import("../../views/customers/index"));
const SalesManagement = lazy(() => import("../../views/sales/index"));
const VehiclesManagement = lazy(() => import("../../views/vehicles/index"));
const ListManageMent = lazy(() => import("../../views/lists/index"));
const DatabaseManagement = lazy(() => import("../../views/reports/database"));
// const ChartsData = lazy(() => import("../../views/rseports/database"));
const ChartList = lazy(() => import("../../views/report/index"));
const Login = lazy(() => import("../../views/pages/authentication/Login"));
const ForgotPassword = lazy(() =>
  import("../../views/pages/authentication/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("../../views/pages/authentication/ResetPassword")
);

const Dashboard = lazy(() => import("../../views/dashboard/ecommerce/index"));
const Profile = lazy(() => import("../../views/profile/Profile"));

// bigquery components--------
const CustomerData = lazy(() =>
  import("../../views/bigquery/reports/CustomerData.js")
);
const ExceptionEmail = lazy(() =>
  import("../../views/bigquery/email/ExceptionEmail")
);

const Accessories = lazy(() => import("../../views/Accessories/Accessories"));

const Reports = lazy(() => import("../../views/reportList/index"));
const TwoFA = lazy(() => import("../../views/auth/TwoFA.js"));

const AdminRoutes = [
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
    path: "/forgot-password/:id",
    element: <ForgotPassword />,
    layout: "BlankLayout",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  // {
  //   path: "/verify-otp",
  //   element: <VerifyOTP />,
  //   meta: {
  //     layout: "blank",
  //     publicRoute: true,
  //     restricted: true,
  //   },
  // },
  {
    path: "/2fa-auth",
    element: <TwoFA />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/user/management",
    element: <UserManagement />,
    protected: true,
    allowedRoles: ["admin"],
  },

  {
    path: "/customers/management",
    element: <CustomerManagement />,
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/sales/management",
    element: <SalesManagement />,
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/vehicle/management",
    element: <VehiclesManagement />,
    protected: true,
    allowedRoles: ["admin", "dealer"],
  },
  {
    path: "/vehicle/ownership",
    element: <Salesv2 />,
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/list/management",
    element: <ListManageMent />,
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/pages/profile",
    element: <Profile />,
    protected: true,
    allowedRoles: ["admin", "dealer"],
  },
  {
    path: "/database/report",
    element: <DatabaseManagement />,
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/reports/charts",
    element: <ChartList />,
    protected: true,
    allowedRoles: ["admin", "dealer"],
  },
  {
    path: "/charts/details",
    element: <ReportCharts />,
    protected: true,
    allowedRoles: ["admin", "dealer"],
  },
  {
    path: "/charts/preview",
    element: <ReportPreview />,
    protected: true,
    allowedRoles: ["admin"],
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
  // big query components
  {
    path: "/customer-data",
    element: <CustomerData />,
    protected: true,
    allowedRoles: ["admin", "dealer"],
  },
  {
    path: "/exception-email",
    element: <ExceptionEmail />,
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/vehicle/reports",
    element: <VehicleReports />,
    protected: true,
    allowedRoles: ["admin", "dealer"],
  },
  {
    path: "/accessories",
    element: <Accessories />,
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/reports",
    element: <Reports />,
    protected: true,
    allowedRoles: ["admin"],
  },
];

export default AdminRoutes;
