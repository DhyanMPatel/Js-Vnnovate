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
import Swal from "sweetalert2";

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

    setEditUser(editUser);
    // console.log(`editUser: ${editUser.id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `User ${id} has been deleted.`,
          icon: "success",
        });
        const updatedUsers = users.filter((user) => user.id !== id);
        // rows = rows.filter((row) => row.id !== id);
        setUsers(updatedUsers);
        localStorage.setItem("UserData", JSON.stringify(updatedUsers));
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
          text: `User ${id} is not Deleted.`,
          icon: "error",
        });
      }
    });
    console.log(confirmDelete);
    if (confirmDelete) {
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="center">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell colSpan={columns.length} align="center">
                  <strong>No users available</strong>
                </TableCell>
              </TableRow>
            ) : (
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                      {columns.map((column) => {
                        const value = user[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "operations" ? (
                              <>
                                <div className="m-1">
                                  <Button
                                    variant="outlined"
                                    // startIcon={<EditIcon />}
                                    onClick={() => handleEdit(user.id)}
                                  >
                                    <EditIcon />
                                  </Button>
                                </div>
                                <div className="m-1">
                                  <Button
                                    variant="outlined"
                                    // startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(user.id)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </div>
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
                  );
                })
            )}
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
