import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import AddPublisherMasterView from "./addPublisherMasterView";
import {
  addPublisherMaster,
  fetchPublisherMasters,
  resetPublisherMasterState,
} from "../../../redux/actions/publisher-master";

const AddPublisherMasterContainer = ({ isModalOpen, toggleModal }) => {
  const dispatch = useDispatch();
  // const { loading, success, error } = useSelector(
  //   (state) => state.publisherMaster
  // );

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      name: values.name,
      description: values.description,
      mediaType: values.mediaType,
      status: values.status.toLowerCase(),
      logo: values.logo,
    };

    setSubmitting(true);
    try {
      await dispatch(addPublisherMaster(payload)).unwrap();
      dispatch(fetchPublisherMasters());
      dispatch(resetPublisherMasterState());
      toggleModal();
    } catch (err) {
      console.error("Add error:", err);
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
      .oneOf(["Active", "Inactive"], "Invalid status"),
    logo: Yup.mixed().nullable(),
  });

  const initialValues = {
    name: "",
    description: "",
    mediaType: "",
    status: "Active",
    logo: null,
  };

  return (
    <AddPublisherMasterView
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={loading}
      success={success}
      error={error}
    />
  );
};

export default AddPublisherMasterContainer;
