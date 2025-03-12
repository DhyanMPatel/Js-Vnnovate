import "./assets/style/App.css";
import GridFormContainer from "./components/grid Form/GridFormContainer";
import { useSelector } from "react-redux";
import Grid from "./components/Grids/grid";

function App() {
  const showGrid = useSelector((state) => state.showGrid.value);

  // console.log(`Columns: ${columns}, Rows: ${rows}`);
  return (
    <>
      {showGrid ? (
        <>
          <Grid />
        </>
      ) : (
        <>
          <GridFormContainer />
        </>
      )}
    </>
  );
}

export default App;
