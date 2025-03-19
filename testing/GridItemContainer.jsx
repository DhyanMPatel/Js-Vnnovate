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
import { setRowPage } from "../../redux/reducer/RowPageSliceRC";
import { updateSearch } from "../../redux/reducer/SearchSliceRC";
// import { setProgress } from "../../redux/reducer/ProgressSliceRC";
import BackArrow from "../../common/back_arrow";
import SearchGrid from "./SearchGrid";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { setColPage } from "../../redux/reducer/ColPageSliceRC";
import { setColsPerPage } from "../../redux/reducer/ColsPerPageSliceRC";
import { updateRowData } from "../../redux/reducer/GridDataSliceRC";

function GridItemContainer() {
  // const progress = useSelector((state) => state.progress.value);
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.rows.value);
  const columns = useSelector((state) => state.columns.value);
  const colsPerPage = useSelector((state) => state.colsPerPage.value);

  const showGrid = useSelector((state) => state.showGrid.value);
  const rowPage = useSelector((state) => state.rowPage.value);
  const colPage = useSelector((state) => state.colPage.value);
  const rowsPerPage = useSelector((state) => state.rowsPerPage.value);
  const search = useSelector((state) => state.search.value);
  const gridData = useSelector((state) => state.gridData.gridData);

  const startColIndex = colPage * colsPerPage;
  const endColIndex = parseInt(startColIndex) + parseInt(colsPerPage);

  const startRowIndex = rowPage * rowsPerPage;
  const endRowIndex = parseInt(startRowIndex) + parseInt(rowsPerPage);

  // useEffect(() => {
  //   dispatch(setProgress(true)); // Start Loading
  //   const timer = setTimeout(() => {
  //     dispatch(setProgress(false)); // Stop Loading After 1s (Simulate API Delay)
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [rows, columns]);

  const handleChangePage = (_, newPage) => dispatch(setRowPage(newPage));
  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setRowPage(0));
  };

  const handleSearch = (event) => dispatch(updateSearch(event.target.value));

  // // Left Button Handler
  // const handleLeftClick = (rowIndex) => {
  //   const currentRow =
  //     gridData[rowIndex] ||
  //     Array.from({ length: columns }).map((_, colIndex) => colIndex + 1).slice(startColIndex, endColIndex); // Get current row data

  //   console.log(`Left Click: ${currentRow}`);
  //   dispatch(setColPage(colPage <= 0 ? colPage : colPage - 1));    // OR dispatch(setColPage(colPage - 1))
  //   const newData = currentRow.map((value, colIndex) =>
  //     colIndex >= startColIndex && colIndex < endColIndex ? value - colsPerPage : value
  //   );
  //   console.log(`Left New Data: ${newData}`);

  //   dispatch(updateRowData({ rowIndex, newData }));
  // };

  // // Right Button Handler
  // const handleRightClick = (rowIndex) => {
  //   const currentRow =
  //     gridData[rowIndex] ||
  //     Array.from({ length: columns }).map((_, colIndex) => colIndex + 1).slice(startColIndex, endColIndex);

  //   console.log(`Right Click: ${currentRow}`);
  //   dispatch(setColPage(colPage >= columns ? colPage : colPage + 1));    // OR  dispatch(setColPage(colPage + 1))
  //   const newData = currentRow.map((value, colIndex) =>
  //     colIndex >= startColIndex && colIndex < endColIndex ? value + colsPerPage : value
  //   );
  //   console.log(`Right New Data: ${newData}`);
  //   dispatch(updateRowData({ rowIndex, newData }));
  // };

  return (
    <div className="relative">
      <Paper sx={{ width: "99vw", overflow: "hidden", position: "absolute" }}>
        <div className="p-2 flex justify-between">
          <Button
            variant="outlined"
            disableElevation
            onClick={() => {
              dispatch(updateSearch(""));
              dispatch(setRowPage(0));
              dispatch(setRowsPerPage(5));
              dispatch(setColPage(0));
              dispatch(setColsPerPage(5));
              dispatch(setShowGrid(!showGrid));
            }}
          >
            <BackArrow />
          </Button>
          <TextField
            label="Search Rows/Columns"
            variant="outlined"
            className="basis-1/3"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {search === "" ? (
          <>
            <TableContainer sx={{ /*overflowX: "auto",*/ maxWidth: "100%" }}>
              <Table>
                <TableBody>
                  {Array.from({ length: rows })
                    .map((_, rowIndex) => rowIndex + 1)
                    .slice(startRowIndex, endRowIndex)
                    .map((row) => (
                      <TableRow key={row} className="relative">
                        {/* Left Arraow */}
                        <TableCell
                          className="sticky"
                          sx={{ padding: "8px", width: "50px" }}
                        >
                          <Button
                            onClick={() => dispatch(setColPage(colPage - 1))}
                            disabled={colPage === 0}
                          >
                            <KeyboardDoubleArrowLeftIcon />
                          </Button>
                        </TableCell>

                        {/* Data */}
                        {Array.from({ length: columns })
                          .map((_, colIndex) => colIndex + 1)
                          .slice(startColIndex, endColIndex)
                          .map((col) => (
                            <TableCell key={col} sx={{ padding: "8px" }}>
                              <GridItem
                                row={row}
                                column={col}
                                value={gridData[row]?.[col] ?? col + 1}
                              />
                            </TableCell>
                          ))}

                        {/* Right Arrow */}
                        <TableCell
                          className="sticky"
                          sx={{ padding: "8px", width: "50px" }}
                        >
                          <Button
                            onClick={() => dispatch(setColPage(colPage + 1))}
                            disabled={endColIndex >= columns}
                          >
                            <KeyboardDoubleArrowRightIcon />
                          </Button>{" "}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[rowsPerPage, 5, 10, 25]}
              component="div"
              count={rows}
              rowsPerPage={rowsPerPage}
              page={rowPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <SearchGrid />
        )}

        {/* <div className="w-full flex justify-center items-center mt-2 mb-2"></div> */}
      </Paper>
    </div>
  );
}

export default GridItemContainer;
