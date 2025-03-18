import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  TextField,
} from "@mui/material";
import GridItem from "./GridItem";
import { setShowGrid } from "../../redux/reducer/ShowGridSliceRC";
import { setRowsPerPage } from "../../redux/reducer/RowsPerPageSliceRC";
import { setPage } from "../../redux/reducer/PageSliceRC";
import { updateSearch } from "../../redux/reducer/SearchSliceRC";
import { useEffect } from "react";
import { setProgress } from "../../redux/reducer/ProgressSliceRC";

function GridItemContainer() {
  const progress = useSelector((state) => state.progress.value);
  const rows = useSelector((state) => state.rows.value);
  const columns = useSelector((state) => state.columns.value);
  const showGrid = useSelector((state) => state.showGrid.value);
  const page = useSelector((state) => state.page.value);
  const rowsPerPage = useSelector((state) => state.rowsPerPage.value);
  const search = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProgress(true)); // Start Loading
    const timer = setTimeout(() => {
      dispatch(setProgress(false)); // Stop Loading After 1s (Simulate API Delay)
    }, 1000);
    return () => clearTimeout(timer);
  }, [rows, columns]);

  const handleChangePage = (_, newPage) => dispatch(setPage(newPage));
  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };
  const handleSearch = (event) => dispatch(updateSearch(event.target.value));

  return (
    <div className="relative">
      <Paper sx={{ width: "99vw", overflow: "hidden", position: "absolute" }}>
        <div className="p-2 flex justify-end">
          <TextField
            label="Search Rows/Columns"
            variant="outlined"
            className="basis-2/5"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {progress ? (
          <CircularWithValueLabel />
        ) : (
          <TableContainer sx={{ overflowX: "auto", maxWidth: "100%" }}>
            <Table>
              <TableBody>
                {Array.from({ length: rows })
                  .map((_, rowIndex) => rowIndex + 1)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row}>
                      {Array.from({ length: columns })
                        .map((_, colIndex) => colIndex + 1)
                        .map((col) => (
                          <TableCell key={col} sx={{ padding: "8px" }}>
                            <GridItem row={row} column={col} />
                          </TableCell>
                        ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
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
            onClick={() => {
              dispatch(updateSearch(""));
              dispatch(setShowGrid(!showGrid));
            }}
          >
            Go Back
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default GridItemContainer;
