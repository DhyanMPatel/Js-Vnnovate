// import "../css/form.css";

// function Display() {
//   return (
//     <>
//       <div className="containerDisplay">
//         <table id="displayTable">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Gender</th>
//               <th>Hobbies</th>
//               <th>Country</th>
//               <th>State</th>
//               <th>City</th>
//               <th>Birth Date</th>
//               <th>Birth Time</th>
//               <th>Operations</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="defaultDeta">
//               <th colSpan="11">There is no any Data</th>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default Display;

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "id", label: "Id" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "gender", label: "Gender" },
  { id: "hobbies", label: "Hobbies" },
  { id: "country", label: "Country" },
  { id: "state", label: "State" },
  { id: "city", label: "City" },
  { id: "birthDate", label: "Birth Date" },
  { id: "birthTime", label: "Birth Time" },
  { id: "operations", label: "Operations" },
];

function createData(
  id,
  firstName,
  lastName,
  gender,
  hobbies,
  country,
  state,
  city,
  birthDate,
  birthTime,
  operations
) {
  return {
    id,
    firstName,
    lastName,
    gender,
    hobbies,
    country,
    state,
    city,
    birthDate,
    birthTime,
    operations,
  };
}

const rows = [
  createData(
    1,
    "Dhyan",
    "Patel",
    "Male",
    "Cricket, Travelling",
    "India",
    "Gujarat",
    "Ahmedabad",
    "2000-10-10",
    "23:50"
  ),
  createData(
    2,
    "Dhyan",
    "Patel",
    "Male",
    "Cricket, Travelling",
    "India",
    "Gujarat",
    "Ahmedabad",
    "2000-10-10",
    "23:50"
  ),
  createData(
    3,
    "Dhyan",
    "Patel",
    "Male",
    "Cricket, Travelling",
    "India",
    "Gujarat",
    "Ahmedabad",
    "2000-10-10",
    "23:50"
  ),
  createData(
    4,
    "Dhyan",
    "Patel",
    "Male",
    "Cricket, Travelling",
    "India",
    "Gujarat",
    "Ahmedabad",
    "2000-10-10",
    "23:50"
  ),
  createData(
    5,
    "Dhyan",
    "Patel",
    "Male",
    "Cricket, Travelling",
    "India",
    "Gujarat",
    "Ahmedabad",
    "2000-10-10",
    "23:50"
  ),
];

// const rows = JSON.parse(localStorage.getItem("UserData")) || [];

export default function Display() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  // style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
