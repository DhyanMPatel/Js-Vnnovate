import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import GridItem from "../../common/GridItem";
import { setRowPage } from "../../redux/reducer/RowPageSliceRC";
import { setRowsPerPage } from "../../redux/reducer/RowsPerPageSliceRC";

function SearchGrid({
  rows,
  columns,
  rowPage,
  colPage,
  rowsPerPage,
  colsPerPage,
  search,
  startColIndex,
  endColIndex,
  startRowIndex,
}) {
  const dispatch = useDispatch();

  const matchedCells = {};
  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= columns; col++) {
      if (row.toString().includes(search) || col.toString().includes(search)) {
        if (!matchedCells[row]) matchedCells[row] = [];
        matchedCells[row].push(col);
      }
    }
  }

  const handleChangePage = (_, newPage) => {
    dispatch(setRowPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(+event.target.value));
    console.log(rowsPerPage);
    dispatch(setRowPage(0));
  };

  return (
    <>
      <TableContainer sx={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table>
          <TableBody>
            {Object.keys(matchedCells)
              .slice(rowPage * rowsPerPage, rowPage * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row}>
                  {matchedCells[row].map((cell) => (
                    <TableCell key={cell} sx={{ padding: "8px" }}>
                      <GridItem row={row} column={cell} />
                    </TableCell>
                  ))}
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
  );
}
export default SearchGrid;
