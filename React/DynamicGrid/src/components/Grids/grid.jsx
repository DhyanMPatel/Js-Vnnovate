import { useDispatch, useSelector } from "react-redux";
import { Button, Grid2 } from "@mui/material";
import GridItem from "./GridItem";
import Box from "@mui/material/Box";
import { setShowGrid } from "../../redux/reducer/ShowGridSlice";

function Grid() {
  const rows = useSelector((state) => state.rows.value);
  const columns = useSelector((state) => state.columns.value);
  const showGrid = useSelector((state) => state.showGrid.value);
  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Grid2 container spacing={2} columns={columns}>
          {Array.from({ length: rows }, (_, rowIndex) =>
            Array.from({ length: columns }, (_, colIndex) => (
              <Grid2 key={`${rowIndex}x${colIndex}`} size={1}>
                <GridItem row={rowIndex + 1} column={colIndex + 1} />
              </Grid2>
            ))
          )}
        </Grid2>
        <div className="w-full flex justify-center items-center mt-2 mb-2">
          <Button
            variant="contained"
            disableElevation
            onClick={() => dispatch(setShowGrid(!showGrid))}
          >
            Go Back
          </Button>
        </div>
      </Box>
    </>
  );
}
export default Grid;

{
  /* {Array.from({ length: rows * columns }).map((_, index) => (
    <Grid2 key={index} size={1}>
      
    {index + 1}
  </Grid2>
))} */
}
