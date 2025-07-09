import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormContainer from "./pages/Form/FormContainer";
import TableContainer from "./pages/Table/TableContainer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<FormContainer />} />
          <Route path="/table" element={<TableContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
