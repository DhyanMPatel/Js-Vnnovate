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
import GridItem from "../../common/GridItem";
import { setShowGrid } from "../../redux/reducer/ShowGridSliceRC";
import { setRowsPerPage } from "../../redux/reducer/RowsPerPageSliceRC";
import { setRowPage } from "../../redux/reducer/RowPageSliceRC";
import { updateSearch } from "../../redux/reducer/SearchSliceRC";
import { useEffect } from "react";
import { setProgress } from "../../redux/reducer/ProgressSliceRC";
import BackArrow from "../../common/back_arrow";
import SearchGrid from "./SearchGrid";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { setColPage } from "../../redux/reducer/ColPageSliceRC";
import { setColsPerPage } from "../../redux/reducer/ColsPerPageSliceRC";

function GridItemContainer() {
  // const progress = useSelector((state) => state.progress.value);
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.rows.value);
  const columns = useSelector((state) => state.columns.value);
  const rowPage = useSelector((state) => state.rowPage.value);
  const colPage = useSelector((state) => state.colPage.value);
  const colsPerPage = useSelector((state) => state.colsPerPage.value);
  const rowsPerPage = useSelector((state) => state.rowsPerPage.value);

  // console.log(`colsPerPage: ${colsPerPage}`);

  const showGrid = useSelector((state) => state.showGrid.value);
  const search = useSelector((state) => state.search.value);

  useEffect(() => {
    dispatch(setProgress(true)); // Start Loading
    const timer = setTimeout(() => {
      dispatch(setProgress(false)); // Stop Loading After 1s (Simulate API Delay)
    }, 1000);
    return () => clearTimeout(timer);
  }, [rows, columns]);

  const handleChangePage = (_, newPage) => dispatch(setRowPage(newPage));
  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setRowPage(0));
  };

  const handleSearch = (event) => dispatch(updateSearch(event.target.value));

  // console.log(`Search: ${search}`);

  const startColIndex = colPage * colsPerPage;
  const endColIndex = parseInt(startColIndex) + parseInt(colsPerPage);

  const startRowIndex = rowPage * rowsPerPage;
  const endRowIndex = parseInt(startRowIndex) + parseInt(rowsPerPage);

  // console.log(`ColPage: ${colPage}`);
  // console.log(`colsPerPage: ${colsPerPage}`);
  // console.log(`StartColIndex: ${startColIndex}`);
  // console.log(`EndColIndex: ${endColIndex}`);

  // console.log(`RowPage: ${rowPage}`);
  // console.log(`RowsPerPage: ${rowsPerPage}`);

  const handleLeftClick = (rowIndex) => {
    const currentRow = gridData[rowIndex] || []; // Get current row data
    const newData = currentRow.map((value) => value - 1); // Modify values (Example: Decrease)
    dispatch(updateRowData({ rowIndex, newData }));
  };

  const handleRightClick = (rowIndex) => {
    const currentRow = gridData[rowIndex] || [];
    const newData = currentRow.map((value) => value + 1); // Modify values (Example: Increase)
    dispatch(updateRowData({ rowIndex, newData }));
  };

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
                          className="sticky flex justify-center"
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
                                startColIndex={startColIndex}
                                endColIndex={endColIndex}
                              />
                            </TableCell>
                          ))}

                        {/* Right Arrow */}
                        <TableCell
                          // key={row}
                          className="sticky right-0"
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
              rowsPerPageOptions={[rowsPerPage, 10, 25]}
              component="div"
              count={rows}
              rowsPerPage={rowsPerPage}
              page={rowPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <SearchGrid
            rows={rows}
            columns={columns}
            rowPage={rowPage}
            colPage={colPage}
            rowsPerPage={rowsPerPage}
            colsPerPage={colsPerPage}
            search={search}
          />
        )}

        {/* <div className="w-full flex justify-center items-center mt-2 mb-2"></div> */}
      </Paper>
    </div>
  );
}

export default GridItemContainer;
