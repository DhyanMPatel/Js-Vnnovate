import { useNavigate } from "react-router-dom";
import FormView from "./FormView";
import * as Yup from "yup";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

const FormContainer = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  let data = [];

  const initialValues = {
    name: "",
    password: "",
    gender: "",
    hobbies: [],
    country: "",
  };

  const options = {
    countries: ["India", "USA", "UK", "Canada"],
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Full Name must be at least 2 characters")
      .required("Full Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Please select a valid gender")
      .required("Gender is required"),
    hobbies: Yup.array()
      .min(1, "Select at least one hobby")
      .required("Hobbies are required"),
    country: Yup.string().required("Country is required"),
  });

  const onSubmit = (values) => {
    data.push(values);
    localStorage.setItem("FormData", JSON.stringify(data));
    navigate("/table");
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      Swal.fire({
        title: "Time Out",
        text: "Hello, are you there?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        console.log(result)
        if (result?.dismiss == "cancel") {
          navigate("/table");
        }
      });
    }, 5000);
  };

  useEffect(() => {
    data = JSON.parse(localStorage.getItem("FormData") || "[]");
  }, []);

  useEffect(() => {
    resetTimeout();
    return () => clearTimeout(timeoutRef.current);
  }, [navigate]);

  return (
    <>
      <FormView
        initialValues={initialValues}
        options={options}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        resetTimeout={resetTimeout}
      />
    </>
  );
};

export default FormContainer;
