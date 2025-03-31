import * as React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setEditUser } from "../redux/features/editUserSlice";
import { setShowBtn } from "../redux/features/showBtnSlice";
import { setUsers } from "../redux/features/userSlice";

const columns = [
  { id: "id", label: "Index" },
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

const timeFormate = (time) => {
  const [hours, minutes] = time.split(":");
  const suffix = hours >= 12 ? "PM" : "AM";

  return `${hours % 12}:${minutes} ${suffix}`;
};

const dateFormate = (date) => {
  const [year, month, day] = date.split("-");

  return `${day}-${month}-${year}`;
};

export default function Display() {
  const users = useSelector((state) => state.users.value);
  const showBtn = useSelector((state) => state.showBtn.value);
  const dispatch = useDispatch();

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

    dispatch(setEditUser(editUser));

    // window.scrollTo({top: 0, behavior: 'smooth'});

    dispatch(setShowBtn(false));
  };

  const handleDelete = async (id) => {
    await Swal.fire({
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
          text: `User Id: ${id} has been deleted.`,
          icon: "success",
        });
        const updatedUsers = users.filter((user) => user.id !== id);

        dispatch(setUsers(updatedUsers));

        localStorage.setItem("UserData", JSON.stringify(updatedUsers));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: `User Id: ${id} is not Deleted.`,
          icon: "error",
        });
      }
    });
  };

  function handleShowBtn() {
    dispatch(setShowBtn(!showBtn));
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div className="m-4">
        <Button variant="contained" onClick={() => handleShowBtn()}>
          {showBtn ? "Add User" : "Show List"}
        </Button>
      </div>
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
                                    onClick={() => handleEdit(user.id)}
                                  >
                                    <EditIcon />
                                  </Button>
                                </div>
                                <div className="m-1">
                                  <Button
                                    variant="outlined"
                                    onClick={() => handleDelete(user.id)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </div>
                              </>
                            ) : column.id === "hobbies" ? (
                              value.join(", ")
                            ) : column.id === "birthDate" ? (
                              dateFormate(value)
                            ) : column.id === "birthTime" ? (
                              timeFormate(value)
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
        rowsPerPageOptions={[5, 10, 25, 100]}
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
