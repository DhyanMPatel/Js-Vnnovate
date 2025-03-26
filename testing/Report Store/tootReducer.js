import layout from "./layout";
import auth from "../pages/auth/common/store";
import category from "../pages/categories/store/categorySlice";
import kmzData from "../pages/kmz/store/kmzSlice";
import postData from "../pages/post/store/postSlice";
import report from "../pages/reports/store/reportSlice";
import reportImages from "../pages/reports/store/imageSlice";

const rootReducer = {
  layout,
  auth,
  category,
  kmzData,
  postData,
  report,
  reportImages,
};
export default rootReducer;
