import "./assets/style/App.css";
import { Routes, Route } from "react-router-dom";
import StudentForm from "./pages/studentForm";
import StudentList from "./pages/studentList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index={true} element={<StudentForm />} />
        <Route path="/student-list" element={<StudentList />} />
      </Routes>
    </>
  );
}

export default App;
