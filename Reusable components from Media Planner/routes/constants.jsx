import {
  AddClientContainer,
  ClientManagementContainer,
  EditClientContainer,
  FormatContainer,
  LangContainer,
  PositionContainer,
  SizeContainer,
  TimeContainer,
  UserManagementContainer,
} from "../components";
import SigninContainer from "../components/auth/signin/signInContainer";
import SignUpContainer from "../components/auth/signup/signUpContainer";
import VerifyOtp from "../components/auth/verifyOtp/verifyOtpContainer";
import AddDurationContainer from "../components/durationsManagement/addDuration/AddDurationContainer";
import DurationsListContainer from "../components/durationsManagement/durationsList/durationsListContainer";
import EditDurationContainer from "../components/durationsManagement/editDuration/EditDurationContainer";
import ListLocationMasterContainer from "../components/LocationMaster/listLocationMaster/listLocationMasterContainer";
import ListMediaCostMasterContainer from "../components/mediaCostMaster/listMediaCostMaster/listMediaCostMasterContainer";
import MediaTypeMasterContainer from "../components/mediaTypeMaster/listMediaTypeMaster/mediaTypeMasterContainer";
import ListPublisherMasterContainer from "../components/publisherMaster/listPublisherMaster/listPublisherMasterContainer";
import AddVendorContainer from "../components/vendorManagement/addVendor/addVendorContainer";
import EditVendorContainer from "../components/vendorManagement/editVendor/editVendorContainer";
import VendorManagementContainer from "../components/vendorManagement/vendorList/vendorListManagementContainer";
import LayoutHOCContainer from "../layout/layoutHOC/layoutHOCContainer";

const home = "/";
const add = "/add";
const signUp = "/signup";
const signIn = "/signin";
const verifyOtp = "/verifyotp";
const dashboard = "/dashboard";
const userManagement = "/user-management";
const campaignManagement = "/campaign-management";
const financeSage = "/finance-sage";
const reportsAnalytics = "/reports-analytics";
const settings = "/settings";
const logout = "/logout";
const vendorManagement = "/vendor-management";
const AddVendorer = "/vendors-management/add-vendor";
const updateVendorer = "/vendors-management/:id/edit";
const clientManagement = "/client-management";
const addClient = "/client-management/add";
const updateClient = "/client-management/:id";
const dataTableExample = "/data-table-example";
const mediaTypeMaster = "/media-type-master";
const publisherMaster = "/publisher-master";
const mediaCostMaster = "/media-cost-master";
const locationMaster = "/location-master";
const durationsManagement = "/durations-management";
const addDuration = "/durations-management/add";
const editDuration = "/durations-management/:id/edit";

const FormatMaster = "/format-master";
const LangMaster = '/lang-master';
const positionMaster = '/position-master';
const sizeMaster = '/size-master';
const timeSlot = '/time-slot-master';

export {
  add,
  addClient,
  addDuration,
  campaignManagement,
  clientManagement,
  dashboard,
  dataTableExample,
  durationsManagement,
  editDuration,
  financeSage,
  home,
  logout,
  mediaTypeMaster,
  reportsAnalytics,
  settings,
  signIn,
  signUp,
  updateClient,
  userManagement,
  vendorManagement,
  verifyOtp,
  FormatMaster,
  LangMaster,
  positionMaster,
  sizeMaster,
  timeSlot,
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
        element: <UserManagementContainer />,
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
        id: "media-type-master",
        path: mediaTypeMaster,
        element: <MediaTypeMasterContainer />,
      },
      {
        id: "publisher-master",
        path: publisherMaster,
        element: <ListPublisherMasterContainer />,
      },
      {
        id: "media-cost-master",
        path: mediaCostMaster,
        element: <ListMediaCostMasterContainer />,
      },
      {
        id: "location-master",
        path: locationMaster,
        element: <ListLocationMasterContainer />,
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
      {
        id: "vendor-management",
        path: vendorManagement,
        element: <VendorManagementContainer />,
        name: "Vendor Management",
        icon: "fa-solid fa-truck",
      },
      {
        id: "vendor-management",
        path: AddVendorer,
        element: <AddVendorContainer />,
        name: "Vendor Management",
        icon: "fa-solid fa-truck",
      },
      {
        id: "vendor-management",
        path: updateVendorer,
        element: <EditVendorContainer />,
        name: "Vendor Management",
        icon: "fa-solid fa-truck",
      },

      // Client Management Routes
      {
        id: "client-management",
        path: clientManagement,
        element: <ClientManagementContainer />,
      },
      {
        id: "add-client",
        path: addClient,
        element: <AddClientContainer />,
      },
      {
        id: "edit-client",
        path: updateClient,
        element: <EditClientContainer />,
      },
      {
        id: "durations-management",
        path: durationsManagement,
        element: <DurationsListContainer />,
        name: "Durations Management",
        icon: "fa-regular fa-clock",
      },
      {
        id: "add-duration",
        path: addDuration,
        element: <AddDurationContainer />,
      },
      {
        id: "edit-duration",
        path: editDuration,
        element: <EditDurationContainer />,
      },
      {
        id: "format-master",
        path: FormatMaster,
        element: <FormatContainer />,
      },
      {
        id: "lang-master",
        path: LangMaster,
        element: <LangContainer />,
      },
      {
        id: "position-master",
        path: positionMaster,
        element: <PositionContainer />,
      },
      {
        id: "time-slot-master",
        path: timeSlot,
        element: <TimeContainer />,
      },
      {
        id: "size-master",
        path: sizeMaster,
        element: <SizeContainer />,
      },

      // Redirect any unmatched paths to dashboard
      {
        id: "default",
        path: "*",
        element: <>Default</>,
      },
    ],
  },
  {
    id: 2,
    route: signUp,
    element: <SignUpContainer />,
  },
  {
    id: 3,
    route: signIn,
    element: <SigninContainer />,
  },
  {
    id: 4,
    route: verifyOtp,
    element: <VerifyOtp />,
  },
];

export { allRoutes };
