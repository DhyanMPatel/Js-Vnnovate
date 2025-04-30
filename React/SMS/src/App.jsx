import "./assets/style/App.css";
import { Routes, Route } from "react-router-dom";
import StudentForm from "./pages/StudentForm/studentForm";
import StudentList from "./pages/StudentList/studentList";
import Layout from "./pages/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudentForm />} />
          <Route path="student-list" element={<StudentList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
