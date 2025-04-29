import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This is where child pages will render */}
    </>
  );
}

export default Layout;