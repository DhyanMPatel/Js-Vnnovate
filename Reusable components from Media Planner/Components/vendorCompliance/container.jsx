import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { fetchPurchaseOrderDropdownListAX } from "../../../redux/actions/purchaseOrder";
import { createUploadComplianceAX } from "../../../redux/actions/uploadCompliance/uploadComplianceAction";
import { resetPODropdownRX } from "../../../redux/reducers/purchaseOrder";
import AddUploadComplianceView from "./addUploadComplianceView";

const uploadComplianceValidationSchema = Yup.object().shape({
  poNumber: Yup.string().required("PO Number is required"),
  remarks: Yup.string().required("Remarks are required"),
  poValue: Yup.number()
    .typeError("PO Value must be a number")
    .positive("PO Value must be greater than 0")
    .required("PO Value is required"),
  clientId: Yup.string().required("Client is required"),
  campaignId: Yup.string().required("Campaign is required"),
  pdfFile: Yup.mixed()
    .required("PDF is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value) return false;
      return value.type === "application/pdf";
    }),
});

const initialValues = {
  poNumber: "",
  remarks: "",
  poValue: "",
  clientId: "",
  campaignId: "",
  pdfFile: null,
};

const AddUploadComplianceContainer = ({ isModalOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const { params } = useSelector((state) => state.uploadCompliance);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      //   formData.append("poNumber", values.poNumber)
      //   formData.append("remarks", values.remarks)
      //   formData.append("poAmount", values.poValue)
      //   formData.append("client", values.clientId)
      //   formData.append("campaign", values.campaignId)
      //   formData.append("poPdf", values.pdfFile)

      const response = await dispatch(
        createUploadComplianceAX({ uploadComplianceData: formData, params })
      );

      if (response?.meta?.requestStatus === "fulfilled") {
        resetForm();
        toggleModal();
      } else {
        console.error("PO creation failed:", response.payload);
      }
    } catch (error) {
      console.error("Error creating PO:", error);
    }
  };

  const handleCloseModal = () => {
    toggleModal();
  };

  useEffect(() => {
    dispatch(fetchPurchaseOrderDropdownListAX());
    return () => {
      dispatch(resetPODropdownRX());
    };
  }, []);

  return (
    <AddUploadComplianceView
      isOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      validationSchema={uploadComplianceValidationSchema}
      initialValues={initialValues}
    />
  );
};

export default AddUploadComplianceContainer;
