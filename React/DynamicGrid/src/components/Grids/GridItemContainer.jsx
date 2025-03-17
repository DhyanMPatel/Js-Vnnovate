import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TableBody,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
} from "@mui/material";
import GridItem from "./GridItem";
import Box from "@mui/material/Box";
import { setShowGrid } from "../../redux/reducer/ShowGridSlice";
import { useState } from "react";

function GridItemContainer() {
  const rows = useSelector((state) => state.rows.value);
  const columns = useSelector((state) => state.columns.value);
  const showGrid = useSelector((state) => state.showGrid.value);
  const dispatch = useDispatch();

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle Page Change
  const handleChangePage = (_, newPage) => setPage(newPage);

  // Handle Rows Per Page Change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {/* <Box>
          <Grid container spacing={0.5} columns={columns}>
            {Array.from({ length: rows }, (_, rowIndex) =>
              Array.from({ length: columns }, (_, colIndex) => (
                <Grid key={`${rowIndex}x${colIndex}`} size={1}>
                  <GridItem row={rowIndex + 1} column={colIndex + 1} />
                </Grid>
              ))
            )}
          </Grid>
        </Box> */}
        <TableContainer sx={{ overflowX: "auto", maxWidth: "100%" }}>
          <Table>
            <TableBody>
              {Array.from({ length: rows })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((_, row) => {
                  return (
                    <TableRow key={row}>
                      {Array.from({ length: columns }).map((_, column) => {
                        return (
                          <TableCell key={column}>
                            <GridItem row={row + 1 + page * rowsPerPage} column={column + 1} />
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="w-full flex justify-center items-center mt-2 mb-2">
          <Button
            variant="contained"
            disableElevation
            onClick={() => dispatch(setShowGrid(!showGrid))}
          >
            Go Back
          </Button>
        </div>
      </Paper>
    </>
  );
}
export default GridItemContainer;
