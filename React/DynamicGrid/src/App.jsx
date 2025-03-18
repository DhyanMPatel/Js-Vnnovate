import "./style/App.css";
import { useSelector } from "react-redux";
import { GridItemContainer, GridFormContainer } from "./components";

function App() {
  const showGrid = useSelector((state) => state.showGrid.value);
  return showGrid ? <GridItemContainer /> : <GridFormContainer />;
}

export default App;
