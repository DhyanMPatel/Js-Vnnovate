import { useSelector } from "react-redux";
import { GridItemContainer, GridFormContainer, Settings } from "../components";
import { Route, Routes } from "react-router";

function AppRouter() {
  const showGrid = useSelector((state) => state.showGrid.value);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={showGrid ? <GridItemContainer /> : <GridFormContainer />}
        />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}
export default AppRouter;
