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
import { useEffect } from "react";
import { setProgress } from "../../redux/reducer/ProgressSliceRC";
import BackArrow from "../../common/back_arrow";
import SearchGrid from "./SearchGrid";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { setColPage } from "../../redux/reducer/ColPageSliceRC";

function GridItemContainer() {
  // const progress = useSelector((state) => state.progress.value);
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.rows.value);
  const columns = useSelector((state) => state.columns.value);
  // const rowConfig = useSelector((state) => state.rowConfig.value);
  const colsPerPage = useSelector((state) => state.colsPerPage.value);

  // console.log(`colsPerPage: ${colsPerPage}`);

  const showGrid = useSelector((state) => state.showGrid.value);
  const rowPage = useSelector((state) => state.rowPage.value);
  const colPage = useSelector((state) => state.colPage.value);
  const rowsPerPage = useSelector((state) => state.rowsPerPage.value);
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

  // console.log(`ColPage: ${colPage}`);
  // console.log(`colsPerPage: ${colsPerPage}`);
  // console.log(`StartColIndex: ${startColIndex}`);
  // console.log(`EndColIndex: ${endColIndex}`);

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
                    .slice(
                      rowPage * rowsPerPage,
                      rowPage * rowsPerPage + rowsPerPage
                    )
                    .map((row) => (
                      <TableRow key={row} className="relative">
                        <TableCell
                          // key={row}
                          className="sticky left-0 bg-amber-500"
                          sx={{ padding: "8px" }}
                        >
                          <Button
                            onClick={() => dispatch(setColPage(colPage - 1))}
                            disabled={colPage === 0}
                          >
                            <KeyboardDoubleArrowLeftIcon />
                          </Button>
                        </TableCell>
                        {Array.from({ length: columns })
                          .map((_, colIndex) => colIndex + 1)
                          .slice(startColIndex, endColIndex)
                          .map((col) => (
                            <TableCell key={col} sx={{ padding: "8px" }}>
                              <GridItem row={row} column={col} />
                            </TableCell>
                          ))}
                        <TableCell
                          // key={row}
                          className="sticky right-0 bg-amber-500"
                          sx={{ padding: "8px" }}
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
              rowsPerPageOptions={[5, 10, 15]}
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
