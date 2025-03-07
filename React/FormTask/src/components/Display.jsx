import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function Display({ users, setUsers, setEditUser }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    const editUser = users.find((user) => user.id === id);
    // localStorage.setItem("EditUser", JSON.stringify(editUser));
    setEditUser(editUser);
    console.log(`editUser: ${editUser.id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.id !== id);
      // rows = rows.filter((row) => row.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("UserData", JSON.stringify(updatedUsers));
    }
  };

  let rows =
    users.map(
      ({
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
      }) =>
        createData(
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
          "operations"
        )
    ) || [];

  // console.log(rows);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return users ? (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    {columns.map((column) => {
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "operations" ? (
                            <>
                              <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => handleEdit(user.id)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDelete(user.id)}
                              >
                                Delete
                              </Button>
                            </>
                          ) : column.id === "hobbies" ? (
                            value.join(", ")
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ) : (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell colSpan={11}>
                      <div>There is No Users</div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
