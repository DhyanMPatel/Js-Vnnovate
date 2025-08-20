import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddFormatView from "./addFormatView";
import * as Yup from "yup";
import { addFormat } from "../../../redux/actions/format_master";
import { dummyFormats } from "../../../utils/formatConstants";

const AddFormatContainer = ({ isModalOpen, toggleModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const id = dummyFormats.length + 1;

      console.log(id, values);
      await dispatch(addFormat({ id, ...values }));
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

  return (
    <AddFormatView
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      //   loading={loading}
      //   success={success}
      //   error={error}
    />
  );
};

export default AddFormatContainer;
