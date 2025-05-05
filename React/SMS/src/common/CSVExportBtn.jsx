import { CSVLink } from "react-csv";
import { Button } from "reactstrap";
import LZString from "lz-string";
import pako from "pako";

export const CSVExportBtn = ({ filteredData }) => {
  // Formate for Export
  const formattedData = filteredData?.map((std) => ({
    id: std.id,
    fullName: std.fullName,
    gender: std.gender,
    standard: std.standard,
    fromDate: new Date(std.fromDate).getTime(),
    toDate: new Date(std.toDate).getTime(),
    sports: std.sports.map((sport) => sport),
    message: std.message,
    fileName: std.file?.name,
    fileSize: std.file?.size,
    // fileBase64: LZString.compressToBase64(std.file?.base64Data),
    fileBase64: pako.deflate(std?.file?.base64Data, { to: "string" }),
  }));

  return (
    <>
      <Button style={{ marginLeft: "20px" }}>
        <CSVLink
          className="text-decoration-none text-light"
          data={formattedData}
          filename={"Student List.csv"}
        >
          Export CSV
        </CSVLink>
      </Button>
    </>
  );
};

// import * as XLSX from "xlsx";
// import { Button } from "reactstrap";

// export const CSVExportBtn = ({ filteredData }) => {
//   const handleExport = () => {
//     const worksheetData = filteredData.map((std) => ({
//       ID: std.id,
//       Name: std.fullName,
//       Gender: std.gender,
//       Standard: std.standard,
//       FromDate: new Date(std.fromDate).toISOString(),
//       ToDate: new Date(std.toDate).toISOString(),
//       FileName: std.file?.name || "",
//       FileSize: std.file?.size || "",
//       FileType: std.file?.type || "",
//       FileBase64: std.file?.base64Data || "", // optional: still large
//       Message: std.message,
//       Sports: std.sports.join(", "),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(worksheetData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

//     XLSX.writeFile(workbook, "Student_List.csv");
//   };

//   return <Button onClick={handleExport}>Export XLSX</Button>;
// };
