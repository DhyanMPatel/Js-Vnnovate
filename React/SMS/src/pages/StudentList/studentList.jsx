import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Edit, Trash } from "react-feather";
import Swal from "sweetalert2";

import "./css/style.css";
import { CSVExportBtn } from "../../common/CSVExportBtn";
import { CSVImportBtn } from "../../common/CSVImportBtn";
import { TableView } from "../../common/TableView";
import { Search } from "../../common/SearchComp";
import { deleteStd } from "../../redux/StudentSlice";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { UpdateStd } from "./updateStd";

const StudentList = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.studentList);

  const [searchData, setSearchData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [std, setStd] = useState({
    id: "",
    fullName: "",
    gender: "",
    message: "",
    fromDate: "",
    toDate: "",
    standard: "",
    sports: [],
    file: null,
  });

  // console.log(formData);

  // handle Search
  const filteredData = formData?.filter(
    (student) =>
      student.fullName?.toLowerCase().includes(searchData.toLowerCase()) ||
      student.gender?.toLowerCase() === searchData?.toLowerCase() ||
      student.standard?.toLowerCase().includes(searchData.toLowerCase())
  );

  // Columns to render
  const columns = [
    {
      name: "Actions",
      center: "true",
      width: "100px",
      cell: (row, index) => (
        <div className="column-action ">
          <Edit
            size={17}
            className="cursor-pointer me-1"
            id={`edit-tooltip-${row.id}`}
            style={{ color: "#728088" }}
            onClick={() => {
              setStd(row);
              setIsOpen(true);
            }}
          />

          <Trash
            size={17}
            className="cursor-pointer"
            id={`trash-tooltip-${row.id}`}
            style={{ color: "#728088" }}
            onClick={async (e) => {
              e.preventDefault();
              Swal.fire({
                title: "Are you sure?",
                text: "You want to delete this?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    dispatch(deleteStd(row.id));
                    Swal.fire("Deleted!", "Email has been deleted.", "success");
                  } catch (error) {
                    Swal.fire(
                      "Error",
                      "An error occurred while deleting the report.",
                      "error"
                    );
                  }
                }
              });
            }}
          />
        </div>
      ),
    },
    {
      name: "Full Name",
      center: "true",
      selector: (row) => row.fullName,
      sortable: "true",
    },
    {
      name: "Gender",
      center: "true",
      selector: (row) => row.gender,
      width: "100px",
      sortable: "true",
      cell: (row) => {
        return row?.gender.slice(0, 1).toUpperCase() + row?.gender.slice(1);
      },
    },
    {
      name: "Standard",
      center: "true",
      selector: (row) => row.standard,
      width: "100px",
      sortable: "true",
    },
    {
      name: "Sports",
      center: "true",
      selector: (row) => row.sports?.join(", "),
    },
    {
      name: "From Date",
      center: "true",
      selector: (row) => row.fromDate,
      width: "100px",
    },
    {
      name: "To Date",
      center: "true",
      selector: (row) => row.toDate,
      width: "100px",
    },
    {
      name: "Image",
      center: "true",
      selector: (row) => row.file?.base64Data || row?.fileBase64 || "No file",
      cell: (row) => {
        // console.log(row.file?.base64Data);
        return row.file?.base64Data || row?.fileBase64 ? (
          <img
            src={row.file?.base64Data || row?.fileBase64}
            alt={row.file?.name || row?.fileName}
            style={{
              width: "auto",
              height: "100px",
              maxWidth: "150px",
              objectFit: "fill",
              margin: "5px",
              borderRadius: "14px",
              backgroundColor: "#f0f0f0",
            }}
          />
        ) : (
          "No file"
        );
      },
    },
    {
      name: "Message",
      center: "true",
      wrap: "true",
      selector: (row) => row.message,
    },
  ];

  // Custom Style for table
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f8f8f8",
        fontWeight: "bold",
        fontSize: "15px",
        color: "#333",
      },
    },
    rows: {
      style: {
        minHeight: "60px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        padding: "10px",
      },
    },
    pagination: {
      style: {
        borderTop: "1px solid #eee",
        padding: "10px",
      },
    },
  };

  /// On Update

  return (
    <>
      <div
        style={{
          margin: "20px 10px",
          padding: "10px",
          maxWidth: "100%",
          backgroundColor: "#f8f8f8",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Search Section */}
          <Search searchData={searchData} setSearchData={setSearchData} />

          {/* Buttons */}
          <div
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <CSVImportBtn />
            <CSVExportBtn filteredData={filteredData} />
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div
        style={{
          margin: "20px 10px",
          maxWidth: "100%",
          backgroundColor: "#f8f8f8",
          borderRadius: "12px",
          paddingTop: "15px",
        }}
      >
        <TableView
          add
          title={"Student Table"}
          columns={columns}
          data={filteredData || []}
          customStyles={customStyles}
        />
      </div>

      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} size="lg">
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          Update Student
        </ModalHeader>
        <ModalBody>
          <UpdateStd std={std} setStd={setStd} setIsOpen={setIsOpen} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default StudentList;
