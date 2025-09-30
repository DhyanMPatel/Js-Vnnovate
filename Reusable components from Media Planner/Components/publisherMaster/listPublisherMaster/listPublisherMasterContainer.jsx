import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListPublisherMasterView from "./listPublisherMasterView";
import AddPublisherMasterContainer from "../addPublisherMaster/addPublisherMasterContainer";
import EditPublisherMasterContainer from "../editPublisherMaster/editPublisherMasterContainer";
import {
  addPublisherMaster,
  deletePublisherMaster,
  fetchPublisherMasters,
  updatePublisherMaster,
} from "../../../redux/actions/publisher-master";

const ListPublisherMasterContainer = () => {
  const dispatch = useDispatch();

  const {
    publishers = [],
    loading = false,
    totalItems = 0,
    pageSize = 10,
    currentPage = 1,
    totalPages = 0,
  } = useSelector((state) => state.publisherMaster || {});

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    selectedPublisher: null,
  });

  useEffect(() => {
    dispatch(fetchPublisherMasters({ page: 1, limit: 10 }));
  }, [dispatch]);

  const openAddModal = () =>
    setModalState({ isOpen: true, type: "add", selectedPublisher: null });
  const openEditModal = (publisher) =>
    setModalState({ isOpen: true, type: "edit", selectedPublisher: publisher });
  const closeModal = () =>
    setModalState({ isOpen: false, type: null, selectedPublisher: null });

  const handleAddPublisher = (data) => {
    dispatch(addPublisherMaster(data)).then(() => {
      dispatch(fetchPublisherMasters({ page: 1, limit: 10 }));
    });
    closeModal();
  };

  const handleUpdatePublisher = (data) => {
    dispatch(
      updatePublisherMaster({ id: data._id, publisherMasterData: data })
    ).then(() => {
      dispatch(fetchPublisherMasters({ page: 1, limit: 10 }));
    });
    closeModal();
  };

  const handleDeletePublisher = (id) => {
    dispatch(deletePublisherMaster(id)).then(() => {
      dispatch(fetchPublisherMasters({ page: 1, limit: 10 }));
    });
  };

  return (
    <>
      <ListPublisherMasterView
        publishers={publishers || []}
        loading={loading}
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        totalPages={totalPages}
        onAddPublisher={openAddModal}
        onEditPublisher={openEditModal}
        onDeletePublisher={handleDeletePublisher}
        onPageChange={(page) => dispatch(fetchPublisherMasters({ page }))}
        onPerPageChange={(limit) =>
          dispatch(fetchPublisherMasters({ page: 1, limit }))
        }
        onSearch={(query) =>
          dispatch(fetchPublisherMasters({ page: 1, search: query }))
        }
        onSort={(field, order) =>
          dispatch(
            fetchPublisherMasters({ sortField: field, sortOrder: order })
          )
        }
      />

      {modalState.isOpen &&
        (modalState.type === "add" ? (
          <AddPublisherMasterContainer
            isModalOpen={true}
            toggleModal={closeModal}
            onSubmit={handleAddPublisher}
          />
        ) : (
          <EditPublisherMasterContainer
            publisher={modalState.selectedPublisher}
            onClose={closeModal}
            onUpdate={handleUpdatePublisher}
          />
        ))}
    </>
  );
};

export default ListPublisherMasterContainer;
