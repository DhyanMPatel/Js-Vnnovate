import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import vendorReducer from "./vendor/vendorSlice";
import mediaTypeReducer from "./media-type-admin/index";
import durationReducer from "./duration/durationSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import clientReducer from "./clientManagement/index";
import publisherReducer from "./publisher-master/index";
import mediaCostReducer from "./media-cost-master/index";
import locationReducer from "./location-master/index";
import formatMasterReducer from "./format_master/index";
import langMasterReducer from './lang_master/index'
import positionMasterReducer from './position-master/index';
import timeSlotMasterReducer from './time-slot-master/index';
import sizeMasterReducer from './size-master/index';
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isAuthenticated", "user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  vendor: vendorReducer,
  mediaType: mediaTypeReducer,
  duration: durationReducer,
  clientManagement: clientReducer,
  publisher: publisherReducer,
  mediaCost: mediaCostReducer,
  location: locationReducer,
  formatMaster: formatMasterReducer,
  langMaster: langMasterReducer,
  positionMaster: positionMasterReducer,
  sizeMaster: sizeMasterReducer,
  timeSlotMaster: timeSlotMasterReducer,
});

export default rootReducer;
