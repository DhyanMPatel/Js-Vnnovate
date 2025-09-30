import LayoutHOCContainer from "../layout/layoutHOC/layoutHOCContainer";

const home = "/";
const dashboard = "/dashboard";
const userManagement = "/user-management";
const campaignManagement = "/campaign-management";
const financeSage = "/finance-sage";
const reportsAnalytics = "/reports-analytics";
const settings = "/settings";
const logout = "/logout";

export {
  campaignManagement,
  dashboard,
  financeSage,
  home,
  logout,
  reportsAnalytics,
  settings,
  userManagement,
};

const allRoutes = [
  {
    id: 1,
    route: home,
    element: <LayoutHOCContainer />,
    children: [
      {
        id: "dashboard",
        path: dashboard,
        index: true,
        element: <>DashBoard</>,
      },
      {
        id: "user-management",
        path: userManagement,
        element: <>User Management</>,
      },
      {
        id: "campaign-management",
        path: campaignManagement,
        element: <>Campaign Management</>,
      },
      {
        id: "finance-sage",
        path: financeSage,
        element: <>Finance Sage</>,
      },
      {
        id: "reports-analytics",
        path: reportsAnalytics,
        element: <>Reports Analytics</>,
      },
      {
        id: "settings",
        path: settings,
        element: <>Settings</>,
      },
      {
        id: "logout",
        path: logout,
        element: <>Logout</>,
      },
      // Redirect any unmatched paths to dashboard
      {
        id: "default",
        path: "*",
        element: <>Default</>,
      },
    ],
  },
];

export { allRoutes };
