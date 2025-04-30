import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StudentList = () => {
  const formData = useSelector((state) => state.formData);


  // console.log(useSelector((state) => state.formData));
  console.log(formData);
  // const [tableData, setTableData] = useState([]);

  // useEffect(() => {
  //   const persistData = localStorage.getItem("persist:StudentList");
  //   if (persistData) {
  //     const parsed = JSON.parse(persistData);
  //     const formData = JSON.parse(parsed.formData); // 🟢 Must parse this too
  //     setTableData(formData);
  //   }
  // }, []);

  const columns = [
    {
      name: "Full Name",
      center: true,
      selector: (row) => row.fullName,
    },
    {
      name: "Gender",
      center: true,
      selector: (row) => row.gender,
    },
    {
      name: "Standard",
      center: true,
      selector: (row) => row.standard,
    },
    {
      name: "Sports",
      center: true,
      selector: (row) => row.sports?.join(", "),
    },
    {
      name: "From Date",
      center: true,
      selector: (row) => row.fromDate,
    },
    {
      name: "To Date",
      center: true,
      selector: (row) => row.toDate,
    },
    {
      name: "File Name",
      center: true,
      selector: (row) => row.file?.name || "No file",
    },
    {
      name: "Message",
      center: true,
      selector: (row) => row.message,
    },
  ];

  return (
    <DataTable
      title="Student List"
      columns={columns}
      data={formData || []}
      pagination
    />
  );
};

export default StudentList;
