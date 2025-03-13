import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import GridItem from "./GridItem";
import Box from "@mui/material/Box";
import { setShowGrid } from "../../redux/reducer/ShowGridSlice";

function GridItemContainer() {
  const rows = useSelector((state) => state.rows.value);
  const columns = useSelector((state) => state.columns.value);
  const showGrid = useSelector((state) => state.showGrid.value);
  const dispatch = useDispatch();

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
        <TableContainer>
          <Table>
            <TableBody>
              {rows.map((row) => {
                return <TableRow key={row}>
                  {columns.map((column) =)}
                </TableRow>;
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
