import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTimeSlotById,
  updateTimeSlot,
} from "../../../redux/actions/time-slot-master";
import {
  initialTimeSlotValues,
  timeSlotValidationSchema,
} from "../../../utils/timeSlotMasterConstants";
import EditTimeSlotView from "./editTimeSlotView";

const EditTimeSlotContainer = ({
  selectedTimeSlot,
  isModalOpen,
  toggleModal,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.timeSlotMaster);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(updateTimeSlot({ id: selectedTimeSlot.id, ...values }));
      resetForm();
      toggleModal();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(getTimeSlotById(selectedTimeSlot.id));
  }, []);
  return (
    <>
      <EditTimeSlotView
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        handleSubmit={handleSubmit}
        initialValues={selectedTimeSlot || initialTimeSlotValues}
        validationSchema={timeSlotValidationSchema}
        loading={loading}
      />
    </>
  );
};

export default EditTimeSlotContainer;
