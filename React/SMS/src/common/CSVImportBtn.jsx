import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useRef, useState } from "react";
import { read, utils } from "xlsx";
import { TableView } from "./TableView";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../redux/StudentSlice";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const CSVImportBtn = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const stdlist = useSelector((state) => state.studentList);

  const columns = [
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
      maxWidth: "100px",
      sortable: "true",
      cell: (row) => {
        return row?.gender.slice(0, 1).toUpperCase() + row?.gender.slice(1);
      },
    },
    {
      name: "Standard",
      center: "true",
      selector: (row) => row.standard,
      maxWidth: "100px",
      sortable: "true",
    },
    {
      name: "Sports",
      center: "true",
      selector: (row) => row.sports,
    },
    {
      name: "From Date",
      center: "true",
      selector: (row) => dayjs(row.fromDate).format("YYYY-MM-DD"),
      maxWidth: "100px",
    },
    {
      name: "To Date",
      center: "true",
      selector: (row) => dayjs(row.toDate).format("YYYY-MM-DD"),
      maxWidth: "100px",
    },
    {
      name: "File Base URL",
      center: "true",
      selector: (row) => row.fileBase64 || "No file",
      cell: (row) => {
        return row.fileBase64 ? (
          <img
            src={row?.fileBase64}
            alt="Student image"
            style={{
              width: "auto",
              height: "100px",
              maxWidth: "120px",
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
      selector: (row) => row.message,
    },
  ];

  // open input file type
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle file input
  const handleFileImport = (event) => {
    setIsOpen(true);
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      const wb = read(event.target.result);
      const sheets = wb.SheetNames;

      if (sheets.length) {
        const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);

        rows.map((row) => {
          if (row.sports && typeof row.sports === "string") {
            row.sports = row.sports.split(",").map((sport) => sport.trim());
          }
          if (row.fromDate) {
            row.From = dayjs(row.From).format("YYYY-MM-DD");
          }
          if (row.toDate) {
            row.To = dayjs(row.To).format("YYYY-MM-DD");
          }
          return row;
        });
        console.log("Rows-> ", rows);
        setData(rows);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // console.log(data);

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

  const handleConfirm = () => {
    let stdArr = [];
    stdArr = stdlist.map((std) => parseInt(std.id));

    data.forEach((row) => {
      if (!stdArr.includes(row.id)) {
        dispatch(setFormData(row));
        Swal.fire("Data Added");
        setData([]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Not Added",
          text: "There are some ID is same in Available data",
        });
        setData([]);
      }
    });
    setIsOpen(false);
  };

  return (
    <>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileImport}
        accept=".csv"
      />
      <Button onClick={handleClick} style={{ fontWeight: "500" }}>
        Import CSV
      </Button>
      <Modal
        isOpen={isOpen}
        toggle={() => {
          setData([]);
          setIsOpen(!isOpen);
        }}
        size="xl"
      >
        <ModalHeader
          toggle={() => {
            setData([]);
            setIsOpen(!isOpen);
          }}
        >
          Student List
        </ModalHeader>
        <ModalBody>
          <TableView
            columns={columns}
            data={data}
            customStyles={customStyles}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setData([]);
              return setIsOpen(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
