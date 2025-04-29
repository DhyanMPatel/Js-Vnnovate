import { Link } from "react-router-dom";
import './navbar.css';

function Navbar() {
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
      
      <div className="nav-title" style={{ fontWeight: "bold", color: "#A0C878" }}>Student Management System</div>
      
      <div>
        <Link className="nav-links" to="/" style={{ marginRight: "15px" }}>
          Form
        </Link>
        <Link className="nav-links" to="/student-list" style={{ marginRight: "10px" }}>
          Student list
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
