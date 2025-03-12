import "./assets/style/App.css";
import { useSelector } from "react-redux";
import { Grid, GridFormContainer } from "./components";


function App() {
  const showGrid = useSelector((state) => state.showGrid.value);
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
