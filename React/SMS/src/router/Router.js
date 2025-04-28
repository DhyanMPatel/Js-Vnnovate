import { useRoutes } from "react-router-dom";
import StudentForm from "../pages/studentForm";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <StudentForm />,
    },

    {
      path: "/student-list",
      element: null,
    },
  ]);
  return routes;
};

export default Router;
