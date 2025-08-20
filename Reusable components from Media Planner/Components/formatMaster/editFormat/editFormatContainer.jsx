import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { addFormat, fetchFormatById, updateFormat } from "../../../redux/actions/format_master";
import EditFormatView from "./editFormatView";
import * as Yup from "yup";
import { useEffect } from "react";

const EditFormatContainer = ({ selectedFormat, isModalOpen, toggleModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  // const { formatDetails, loading } = useSelector((state) => state.formatMaster);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(id, values);
      await dispatch(updateFormat({id, ...values}));
      resetForm();
      toggleModal();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    media_type_id: Yup.string().required("Media Type is required"),
    name: Yup.string()
      .required("Name is required")
      .max(100, "Name must be at most 100 characters"),
    description: Yup.string()
      .required("Description is required")
      .max(500, "Description must be at most 500 characters"),
    allowed_sizes: Yup.string().required("Allowed size is required"),
    allowed_durations: Yup.string().required("Allowed duration is required"),
  });

  const initialValues = {
    media_type_id: "Digital Display",
    name: "",
    description: "",
    allowed_sizes: "Leaderboard (728x90)",
    allowed_durations: "15 seconds",
  };

  useEffect(() => {
    dispatch(fetchFormatById(id));
  }, [])
  return (
    <>
      <EditFormatView
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        handleSubmit={handleSubmit}
        initialValues={selectedFormat || initialValues}
        validationSchema={validationSchema}
      />
    </>
  );
};

export default EditFormatContainer;
