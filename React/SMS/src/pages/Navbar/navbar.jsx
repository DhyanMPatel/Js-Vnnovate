import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const style = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "",
    };
  };
  return (
    <nav
      style={{
        padding: "1rem",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        className="nav-title"
        style={{ fontWeight: "bold", color: "#A0C878" }}
      >
        Student Management System
      </div>

      <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 2fr" }}>
        <NavLink className="nav-links" to="/" style={style}>
          Form
        </NavLink>
        <NavLink className="nav-links" to="/student-list" style={style}>
          Student list
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
