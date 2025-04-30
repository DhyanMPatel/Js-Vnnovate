import { useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Button, Input, Label } from "reactstrap";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import "./css/style.css";

const StudentList = () => {
  const formData = useSelector((state) => state.studentList);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [searchData, setSearchData] = useState("");

  const filteredData = formData?.filter(
    (student) =>
      student.fullName?.toLowerCase().includes(searchData.toLowerCase()) ||
      student.gender?.toLowerCase() === searchData?.toLowerCase() ||
      student.standard?.toLowerCase() === searchData?.toLowerCase()
  );

  const formattedData = filteredData?.map((std) => ({
    fullName: std.fullName,
    gender: std.gender,
    standard: std.standard,
    fromDate: std.fromDate,
    toDate: std.toDate,
    file: std.file?.base64Data,
    message: std.message,
    sports: std.sports.map((sport) => sport),
  }));

  const headers = [
    { label: "Name", key: "fullName" },
    { label: "Gender", key: "gender" },
    { label: "Standard", key: "standard" },
    { label: "From", key: "fromDate" },
    { label: "To", key: "toDate" },
    { label: "Image", key: "file" },
    { label: "Message", key: "message" },
    { label: "Sports", key: "sports" },
  ];

  // console.log(filteredData);

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
      selector: (row) => row.sports?.join(", "),
    },
    {
      name: "From Date",
      center: "true",
      selector: (row) => row.fromDate,
      maxWidth: "100px",
    },
    {
      name: "To Date",
      center: "true",
      selector: (row) => row.toDate,
      maxWidth: "100px",
    },
    {
      name: "Image",
      center: "true",
      selector: (row) => row.file?.base64Data || "No file",
      cell: (row) => {
        // console.log(row.file?.base64Data);
        return row.file?.base64Data ? (
          <img
            src={row.file?.base64Data}
            alt="Student image"
            style={{
              width: "auto",
              height: "100px",
              maxWidth: "200px",
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

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
      });
      const parsedData = csv?.data;
      const rows = Object.keys(parsedData[0]);

      const columns = Object.values(parsedData[0]);
      const res = rows.reduce((acc, e, i) => {
        return [...acc, [[e], columns[i]]];
      }, []);
      console.log(res);
    };
    reader.readAsText(file);
  };

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "8px",
              justifyContent: "flex-end",
            }}
          >
            <h4
              style={{
                color: "black",
                fontSize: "15px",
                margin: "14px",
              }}
            >
              Search
            </h4>
            <Input
              type="text"
              value={searchData}
              placeholder="Search here..."
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv"
            />
            <Button onClick={handleClick}>Import CSV</Button>

            <Button style={{ marginLeft: "20px" }}>
              <CSVLink
                className="text-decoration-none text-light"
                data={formattedData}
                filename={"Student List.csv"}
                headers={headers}
              >
                Export CSV
              </CSVLink>
            </Button>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            position: "relative",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            // marginBottom: "20px",
          }}
        >
          <Button style={{ zIndex: 1 }} onClick={() => navigate("/")}>
            Add
          </Button>
          <h2
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "20px",
              margin: 0,
            }}
          >
            Student Table
          </h2>
          <div style={{ width: "70px" }} />
        </div>

        <hr />
        <DataTable
          columns={columns}
          data={filteredData || []}
          customStyles={customStyles}
          pagination
          paginationPerPage={2}
          paginationRowsPerPageOptions={[2, 5, 10, 15, 20]}
          highlightOnHover
          striped
          responsive
          fixedHeader
        />
      </div>
    </>
  );
};

export default StudentList;
