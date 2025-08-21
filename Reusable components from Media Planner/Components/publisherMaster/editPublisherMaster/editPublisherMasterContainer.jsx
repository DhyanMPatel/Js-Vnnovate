import { useDispatch } from "react-redux";
import * as Yup from "yup";
import EditPublisherMasterView from "./editPublisherMasterView";
import {
  fetchPublisherMasters,
  updatePublisherMaster,
} from "../../../redux/actions/publisher-master";

const EditPublisherMasterContainer = ({ publisher, onClose }) => {
  const dispatch = useDispatch();

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        updatePublisherMaster({
          id: publisher._id,
          publisherMasterData: {
            name: values.name,
            description: values.description,
            mediaType: values.mediaType,
            status: values.status.toLowerCase(),
            logo: values.logo,
          },
        })
      ).unwrap();

      dispatch(fetchPublisherMasters());
      onClose();
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Publisher Name is required"),
    description: Yup.string()
      .required("Description is required")
      .max(250, "Description must be 250 characters or less"),
    mediaType: Yup.string().required("Media Type is required"),
    status: Yup.string()
      .required("Status is required")
      .oneOf(["Active", "Inactive"]),
    logo: Yup.mixed().nullable(),
  });

  const initialValues = {
    name: publisher?.name || "",
    description: publisher?.description || "",
    mediaType: publisher?.mediaType || "",
    status:
      publisher?.status?.toLowerCase() === "active" ? "Active" : "Inactive",
    logo: publisher?.logo || null,
  };

  return (
    <EditPublisherMasterView
      isOpen={true}
      onClose={onClose}
      handleUpdate={handleUpdate}
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};

export default EditPublisherMasterContainer;
