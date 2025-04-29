// ** Reducers Imports
import navbar from "./navbar";
import layout from "./layout";
import chart from "./chart";
import auth from "./authentication";
import datatables from "../views/users/store/index";
import exceptionReport from "../views/bigquery/reports/store/index";
import exceptionEmail from "../views/bigquery/email/store/index";
import updateReport from "../views/bigquery/reports/updateStore/index";
import accessories from "../views/Accessories/store/index";
import vehicleReports from "../views/vehicleReports/store/index";
import salesv2 from "../views/sales-v2/store/index";
import datatables1 from "../views/customers/store/index";
import datatables2 from "../views/sales/store/index";
import datatables3 from "../views/vehicles/store/index";
import Reports from "../views/reportList/store/index";
// import salesFunnel from "../views/sales-Funnel/store/index";
import reports from "../views/reports/store/index";
const rootReducer = {
  auth,
  datatables1,
  datatables,
  navbar,
  layout,
  chart,
  datatables2,
  datatables3,
  exceptionReport,
  exceptionEmail,
  updateReport,
  vehicleReports,
  salesv2,
  accessories,
  Reports,
  // salesFunnel,
};

export default rootReducer;
