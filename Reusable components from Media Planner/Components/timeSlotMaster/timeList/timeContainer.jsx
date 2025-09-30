import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteTimeSlot,
  getTimeSlots,
} from "../../../redux/actions/time-slot-master";
import AddTimeSlotContainer from "../addTimeSlot/addTimeSlotContainer";
import EditTimeSlotContainer from "../editTimeSlot/editTimeSlotContainer";
import TimeView from "./timeView";

const TimeContainer = () => {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedRow: null,
  });
  const { loading, timeSlots, totalItems, totalPages, pageSize, currentPage } =
    useSelector((state) => state.timeSlotMaster);

  const fetchTimeSlots = ({
    pageIndex,
    pageSize,
    search,
    sortField,
    sortDirection,
  }) => {
    dispatch(
      getTimeSlots({
        page: pageIndex + 1,
        perPage: pageSize,
        search,
        sortField,
        sortOrder: sortDirection,
      })
    );
  };

  useEffect(() => {
    getTimeSlots({ page: currentPage, perPage: pageSize, search: search });
  }, [dispatch]);

  const handleAdd = () => {
    setModalState({ isOpen: true, selectedRow: null });
  };

  const handleEdit = (row) => {
    setModalState({ isOpen: true, selectedRow: row });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, selectedRow: null });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the Time permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await dispatch(deleteTimeSlot(id)).unwrap();
          if (response) {
            // Refresh the list after successful deletion
            getTimeSlots({ page: currentPage, perPage: pageSize, search });
          }
        } catch (error) {
          console.error("Error deleting Time Slot:", error);
        }
      }
    });
  };
  return (
    <>
      <TimeView
        timeSlots={timeSlots || []}
        loading={loading}
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        totalPages={totalPages}
        fetchTimeSlots={fetchTimeSlots}
        onAddTimeSlot={handleAdd}
        onEditTimeSlot={handleEdit}
        onDeleteTimeSlot={handleDelete}
      />

      {modalState.isOpen &&
        (modalState.selectedRow ? (
          <EditTimeSlotContainer
            isModalOpen={modalState.isOpen}
            selectedTimeSlot={modalState?.selectedRow}
            toggleModal={handleCloseModal}
          />
        ) : (
          <AddTimeSlotContainer
            isModalOpen={modalState.isOpen}
            toggleModal={handleCloseModal}
          />
        ))}
    </>
  );
};

export default TimeContainer;
