import { useEffect, useState } from "react";
import TableView from "./TableView";

const TableContainer = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("FormData") || "[]");
    setFormData(data);
  }, []);

  return <TableView data={formData} />;
};

export default TableContainer;
