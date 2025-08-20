import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {
//   deleteClient,
//   getAllClients,
//   getClient,
// } from "../../../redux/actions/ClientManagement";
import AddFormatContainer from "../addFormat/addFormatContainer";
import FormatView from "./formatView";
import {
  deleteFormat,
  fetchAllFormats,
} from "../../../redux/actions/format_master";
import { dummyFormats } from "../../../utils/formatConstants";
import EditFormatContainer from "../editFormat/editFormatContainer";
import Swal from "sweetalert2";

const FormatContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedRow: null,
  });
  const { loading, formats, totalItems, totalPages, pageSize, currentPage } =
    useSelector((state) => state.formatMaster);

  const fetchFormats = ({
    pageIndex,
    pageSize,
    search,
    sortField,
    sortDirection,
  }) => {
    dispatch(
      fetchAllFormats({
        page: pageIndex + 1,
        perPage: pageSize,
        search,
        sortField,
        sortOrder: sortDirection,
      })
    );
  };

  useEffect(() => {
    fetchAllFormats({ pageIndex: currentPage, pageSize: pageSize });
  }, []);

  const handleAdd = () => {
    setModalState({ isOpen: true, selectedRow: null });
  };

  const handleEdit = (row) => {
    setModalState({ isOpen: true, selectedRow: row });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, selectedRow: null });
    // fetchMediaTypeData({ pageIndex: currentPage - 1, pageSize });
  };

  const handleDelete = (id) => {
    console.log(id, "id");
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the category permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("id Action", id);
        dispatch(deleteFormat(id)).then(() => {
          fetchFormats({ pageIndex: currentPage - 1, pageSize });
        });
      }
    });
  };
  return (
    <>
      <FormatView
        formats={formats || []}
        //   loading={loading}
        //   totalItems={totalItems}
        //   pageSize={pageSize}
        //   currentPage={currentPage}
        //   totalPages={totalPages}
        fetchFormats={fetchFormats}
        onAddFormat={handleAdd}
        onEditFormat={handleEdit}
        onDeleteFormat={handleDelete}
      />

      {modalState.isOpen &&
        (modalState.selectedRow ? (
          <EditFormatContainer
            isModalOpen={modalState.isOpen}
            selectedFormat={modalState?.selectedRow}
            toggleModal={handleCloseModal}
          />
        ) : (
          <AddFormatContainer
            isModalOpen={modalState.isOpen}
            toggleModal={handleCloseModal}
          />
        ))}
    </>
  );
};

export default FormatContainer;
