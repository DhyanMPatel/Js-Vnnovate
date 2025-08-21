import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { allRoutes } from "./constants";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} /> // Force fully redirect user to /dashboard route for Temporary.
        {allRoutes.map((route) => (
          <Route key={route.id} path={route.route} element={route.element}>
            {route.children?.map((child) => (
              <Route
                key={child.id}
                path={child.path}
                element={child.element}
                index={child.index}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
