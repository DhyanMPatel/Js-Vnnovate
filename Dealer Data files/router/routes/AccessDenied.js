import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-5 text-center">
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>

      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Go Back
      </Link>
    </div>
  );
};

export default AccessDenied;
