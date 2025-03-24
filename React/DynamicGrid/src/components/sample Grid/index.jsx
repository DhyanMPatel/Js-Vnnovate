import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setRowPage } from "../../redux/reducer/RowPageSliceRC";
import { setRowsPerPage } from "../../redux/reducer/RowsPerPageSliceRC";
import GridItem from "../../common/GridItem";
import { useEffect } from "react";
import { fetchSamplesRequest } from "./store/sampleGridSlice";

const SampleGrid = () => {
  const dispatch = useDispatch();

  const { samples, loading, error } = useSelector((state) => state.sampleGrid);

  const rows = useSelector((state) => state.rows.value);
  const rowsPerPage = useSelector((state) => state.rowsPerPage.value);
  const rowPage = useSelector((state) => state.rowPage.value);

  const columns = useSelector((state) => state.columns.value);
  const colPage = useSelector((state) => state.colPage.value);
  const colsPerPage = useSelector((state) => state.colsPerPage.value);

  const startRowIndex = rowPage * rowsPerPage;
  const endRowIndex = parseInt(startRowIndex) + parseInt(rowsPerPage);

  const startColIndex = colPage * colsPerPage;
  const endColIndex = parseInt(startColIndex) + parseInt(colsPerPage);

  useEffect(() => {
    dispatch(fetchSamplesRequest());
  }, [dispatch]);

  const handleChangePage = (_, newPage) => dispatch(setRowPage(newPage));
  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setRowPage(0));
  };

  // samples.map((sample) => console.log(`Sample ${sample.id}: ${sample.name}`));
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {Array.from({ length: rows })
              .map((_, rowIndex) => rowIndex + 1)
              .slice(startRowIndex, endRowIndex)
              .map((rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: columns })
                    .map((_, colIndex) => colIndex + 1)
                    .slice(startColIndex, endColIndex)
                    .map((colIndex) => (
                      <TableCell key={colIndex} sx={{ padding: "8px" }}>
                        <GridItem
                          // row={rowIndex}
                          // column={colIndex}
                          // sample={samples[rowIndex % samples.length]}
                          sample={sample}
                          startColIndex={startColIndex}
                          endColIndex={endColIndex}
                        />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        // rowsPerPageOptions={[rowsPerPage !== 5 ? 5 : rowsPerPage, 10, 25]}
        rowsPerPageOptions={[rowsPerPage, 5, 10, 20]}
        component="div"
        count={rows}
        rowsPerPage={rowsPerPage}
        page={rowPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SampleGrid;
