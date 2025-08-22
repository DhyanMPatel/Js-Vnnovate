import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dummyTimeSlots,
  initialTimeSlotValues,
  timeSlotValidationSchema,
} from "../../../utils/timeSlotMasterConstants";
import AddTimeSlotView from "./addTimeSlotView";
import { createTimeSlot } from "../../../redux/actions/time-slot-master";

const AddTimeSlotContainer = ({ isModalOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.timeSlotMaster);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // const id = dummyTimeSlots.length + 1;

      await dispatch(createTimeSlot(values)).unwrap();
      resetForm();
      toggleModal();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AddTimeSlotView
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
      handleSubmit={handleSubmit}
      initialValues={initialTimeSlotValues}
      validationSchema={timeSlotValidationSchema}
      loading={loading}
    />
  );
};

export default AddTimeSlotContainer;
