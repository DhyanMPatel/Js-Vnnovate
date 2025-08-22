import axiosInstance from "../../services";
import { dummyFormats } from "../../utils/formatConstants";
import { dummyLangs } from "../../utils/langMasterConstants";
import { dummyPositions } from "../../utils/positionMasterConstants";
import { dummyTimeSlots } from "../../utils/timeSlotMasterConstants";
import { dummySizes } from "../../utils/sizeMasterConstants";

export const authUser = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};
export const verifyOtp = async (verifyOtpData) => {
  const response = await axiosInstance.post("/auth/verify-otp", verifyOtpData);
  return response.data;
};

export const loginAPI = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const addMediaTypeAdminAPI = async (mediaTypeData) => {
  const response = await axiosInstance.post("/media-types", mediaTypeData);
  return response.data;
};

export const getMediaTypeAdminsListAPI = async (params) => {
  const response = await axiosInstance.get("/media-types", { params });
  return response.data;
};
export const getMediaTypeAdminAPI = async (id) => {
  const response = await axiosInstance.get(`/media-types/${id}`);
  return response.data;
};
export const updateMediaTypeAdminAPI = async (id, mediaTypeData) => {
  const response = await axiosInstance.put(`/media-types/${id}`, mediaTypeData);
  return response.data;
};

export const deleteMediaTypeAdminAPI = async (id) => {
  const response = await axiosInstance.delete(`/media-types/${id}`);
  return response.data;
};
//

export const createPublisherMasterAPI = async (mediaTypeData) => {
  const response = await axiosInstance.post("/publisher", mediaTypeData);
  return response.data;
};

export const getPublisherMasterListAPI = async (params) => {
  const response = await axiosInstance.get("/publisher", { params });
  return response.data;
};
export const getPublisherMasterAPI = async (id) => {
  const response = await axiosInstance.get(`/publisher/${id}`);
  return response.data;
};
export const updatePublisherMasterAPI = async (id, mediaTypeData) => {
  const response = await axiosInstance.put(`/publisher/${id}`, mediaTypeData);
  return response.data;
};

export const deletePublisherMasterAPI = async (id) => {
  const response = await axiosInstance.delete(`/publisher/${id}`);
  return response.data;
};

export const createMediaCostMasterAPI = async (mediaCostData) => {
  const response = await axiosInstance.post("/media-cost", mediaCostData);
  return response.data;
};

export const getMediaCostMasterListAPI = async (params) => {
  const response = await axiosInstance.get("/media-cost", { params });
  return response.data;
};
export const getMediaCostMasterAPI = async (id) => {
  const response = await axiosInstance.get(`/media-cost/${id}`);
  return response.data;
};
export const updateMediaCostMasterAPI = async (id, mediaCostData) => {
  const response = await axiosInstance.put(`/media-cost/${id}`, mediaCostData);
  return response.data;
};

export const deleteMediaCostMasterAPI = async (id) => {
  const response = await axiosInstance.delete(`/media-cost/${id}`);
  return response.data;
};

export const createLocationMasterAPI = async (locationData) => {
  const response = await axiosInstance.post("/location", locationData);
  return response.data;
};

export const getLocationMasterListAPI = async (params) => {
  const response = await axiosInstance.get("/location", { params });
  return response.data;
};
export const getLocationMasterAPI = async (id) => {
  const response = await axiosInstance.get(`/location/${id}`);
  return response.data;
};
export const updateLocationMasterAPI = async (id, locationData) => {
  const response = await axiosInstance.put(`/location/${id}`, locationData);
  return response.data;
};

export const deleteLocationMasterAPI = async (id) => {
  const response = await axiosInstance.delete(`/location/${id}`);
  return response.data;
};
//
export const getDurations = async (params = {}) => {
  const response = await axiosInstance.get("/durations", { params });
  return response.data;
};

// Get single duration by ID
export const getDurationById = async (id) => {
  const response = await axiosInstance.get(`/durations/${id}`);
  return response.data;
};

// Create a new duration
export const createDuration = async (durationData) => {
  const response = await axiosInstance.post("/durations", durationData);
  return response.data;
};

// Update an existing duration
export const updateDuration = async (id, durationData) => {
  const response = await axiosInstance.put(`/durations/${id}`, durationData);
  return response.data;
};

// Delete a duration
export const deleteDuration = async (id) => {
  const response = await axiosInstance.delete(`/durations/${id}`);
  return response.data;
};

export const createVendor = async (vendorData) => {
  const response = await axiosInstance.post("/vendors", vendorData);
  return response.data;
};

// Get all vendors
export const getVendors = async (params = {}) => {
  const { page = 1, perPage = 10, sortField, sortOrder, search } = params;
  const response = await axiosInstance.get("/vendors", {
    params: {
      page,
      perPage,
      sortBy: sortField,
      sortOrder,
      search,
    },
  });
  return response.data;
};

// Get single vendor by ID
export const getVendorById = async (id) => {
  const response = await axiosInstance.get(`/vendors/${id}`);
  return response.data;
};

// Update vendor
export const updateVendor = async (id, vendorData) => {
  const response = await axiosInstance.put(`/vendors/${id}`, vendorData);
  return response.data;
};

// Delete vendor
export const deleteVendor = async (id) => {
  const response = await axiosInstance.delete(`/vendors/${id}`);
  return response.data;
};

// Client Management APIs
export const addClientAPI = async (clientData) => {
  const response = await axiosInstance.post("/clients", clientData);
  return response.data;
};

export const getAllClientsAPI = async (params) => {
  const response = await axiosInstance.get("/clients", {
    params,
  });
  return response.data;
};

export const getClientAPI = async (id) => {
  const response = await axiosInstance.get(`/clients/${id}`);
  return response.data;
};

export const updateClientAPI = async (clientId, clientData) => {
  const response = await axiosInstance.put(`/clients/${clientId}`, clientData);
  return response.data;
};

export const deleteClientAPI = async (id) => {
  const response = await axiosInstance.delete(`/clients/${id}`);
  return response.data;
};

// Format Master APIs
export const addFormatAPI = async (formatData) => {
  // const response = await axiosInstance.post("/format-master", formatData);
  return formatData;
};
export const getAllFormatsAPI = async (params) => {
  // const response = await axiosInstance.get("/format-master", {
  //   params,
  // });
  return dummyFormats;
};
export const getFormatAPI = async (id) => {
  // const response = await axiosInstance.get(`/format-master/${id}`);
  return dummyFormats.find((format) => format.id === id);
};
export const updateFormatAPI = async (id, formatData) => {
  // const response = await axiosInstance.put(`/format-master/${id}`, formatData);
  return { id, ...formatData };
};
export const deleteFormatAPI = async (id) => {
  // const response = await axiosInstance.delete(`/format-master/${id}`);
  return dummyFormats.find((format) => format.id == id);
};

// Language Master APIs
export const addLangAPI = async (langData) => {
  // const response = await axiosInstance.post("/format-master", formatData);
  return langData;
};
export const getAllLangsAPI = async (params) => {
  // const response = await axiosInstance.get("/format-master", {
  //   params,
  // });
  return dummyLangs;
};
export const getLangAPI = async (id) => {
  // const response = await axiosInstance.get(`/format-master/${id}`);
  return dummyLangs.find((lang) => lang.id === id);
};
export const updateLangAPI = async (id, langData) => {
  // const response = await axiosInstance.put(`/format-master/${id}`, formatData);
  return { id, ...langData };
};
export const deleteLangAPI = async (id) => {
  // const response = await axiosInstance.delete(`/format-master/${id}`);
  return dummyLangs.find((lang) => lang.id == id);
};

// Position Master APIs
export const createPositionAPI = async (positionData) => {
  // const response = await axiosInstance.post("/position-master", positionData);
  return {data: positionData};
};
export const getPositionsAPI = async (params) => {
  // const response = await axiosInstance.get("/position-master", {
  //   params,
  // });
  return {data: dummyPositions};
};
export const getPositionByIdAPI = async (id) => {
  // const response = await axiosInstance.get(`/position-master/${id}`);
  return {data: dummyPositions.find((position) => position.id === id)};
};
export const updatePositionAPI = async (id, positionData) => {
  // const response = await axiosInstance.put(`/position-master/${id}`, positionData);
  return {data: {id, ...positionData }};
};
export const deletePositionAPI = async (id) => {
  // const response = await axiosInstance.delete(`/position-master/${id}`);
  return {data: dummyPositions.find((position) => position.id == id)};
};

// Size Master APIs
export const createSizeAPI = async (sizeData) => {
  // const response = await axiosInstance.post("/size-master", sizeData);
  return {data: sizeData};
};
export const getSizesAPI = async (params) => {
  // const response = await axiosInstance.get("/size-master", {
  //   params,
  // });
  return {data: dummySizes};
};
export const getSizeByIdAPI = async (id) => {
  // const response = await axiosInstance.get(`/size-master/${id}`);
  return {data: dummySizes.find((size) => size.id === id)};
};
export const updateSizeAPI = async (id, sizeData) => {
  // const response = await axiosInstance.put(`/size-master/${id}`, sizeData);
  return {data: {id, ...sizeData }};
};
export const deleteSizeAPI = async (id) => {
  // const response = await axiosInstance.delete(`/size-master/${id}`);
  return {data: dummySizes.find((size) => size.id == id)};
};

// Time Slot Master APIs
export const createTimeSlotAPI = async (timeSlotData) => {
  const response = await axiosInstance.post("/timebands", timeSlotData);
  return response;
  // return { data: timeSlotData };
};
export const getTimeSlotsAPI = async (params) => {
  const response = await axiosInstance.get("/timebands", {
    params,
  });
  return response;
  // return {data: dummyTimeSlots};
};
export const getTimeSlotByIdAPI = async (id) => {
  const response = await axiosInstance.get(`/timebands/${id}`);
  return response;
  // return {data: dummyTimeSlots.find((timeSlot) => timeSlot.id === id)};
};
export const updateTimeSlotAPI = async (id, timeSlotData) => {
  const response = await axiosInstance.put(`/timebands/${id}`, timeSlotData);
  return response;
  // return {data: {id, ...timeSlotData }};
};
export const deleteTimeSlotAPI = async (id) => {
  const response = await axiosInstance.delete(`/timebands/${id}`);
  return response;
  // return {data: dummyTimeSlots.find((timeSlot) => timeSlot.id == id)};
};
