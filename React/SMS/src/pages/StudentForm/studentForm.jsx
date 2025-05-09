import React, { useEffect, useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  FormFeedback,
  InputGroupText,
} from "reactstrap";

import "./style/style.css";
import { DatePicker } from "antd";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../redux/StudentSlice";
import { useNavigate } from "react-router-dom";
import { FormView } from "../../common/FormView";
import Swal from "sweetalert2";

function StudentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stdlist = useSelector((state) => state.studentList);

  const initialValues = {
    id: "",
    fullName: "",
    gender: "",
    message: "",
    fromDate: "",
    toDate: "",
    standard: "",
    sports: [],
    file: null,
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string()
      .required("ID is required")
      .test("unique", "ID must be unique", function (value) {
        return !stdlist.some((student) => student.id === value);
      }),
    fullName: Yup.string().required("Full Name is required"),
    gender: Yup.string().required("Gender is required"),
    message: Yup.string(),
    fromDate: Yup.string().required("From date is required"),
    toDate: Yup.string().required("To date is required"),
    standard: Yup.string()
      .required("Standard is required")
      .notOneOf(["Select Standard"], "Select correct Standard"),
    sports: Yup.array().min(1, "At least any one sport required"),
    file: Yup.mixed().required("File is required"),
  });

  const handleSubmit = (values) => {
    dispatch(setFormData(values));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Student successfuly Added",
      showConfirmButton: false,
      timer: 1500,
      width: 400,
    });
    navigate("/student-list");
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFiles = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);

      const fileInfo = {
        base64Data: base64,
        name: file.name,
        size: file.size,
      };
      return {
        fileInfo,
      };
    }
  };

  return (
    <div className="student-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <Form className="p-4 border rounded">
            {/* Id */}
            <FormView
              label={"Student ID"}
              id={"id"}
              type={"text"}
              value={values.id}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={"Enter Student Id here"}
              touched={touched.id}
              error={errors.id}
            />

            {/* Full Name */}
            <FormView
              label={"Full Name"}
              id={"fullName"}
              type={"text"}
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={"Enter Your Full Name"}
              touched={touched.fullName}
              error={errors.fullName}
            />

            {/* Gender */}
            <FormGroup className="form-group" tag="fieldset">
              <Label className="form-label">Gender</Label>
              <div className="gender-options d-flex">
                {["Male", "Female"].map((g) => (
                  <FormView
                    ky={g}
                    label={g}
                    id={g}
                    name={"gender"}
                    type={"radio"}
                    value={g}
                    checked={values.gender === g}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                ))}
              </div>
              {touched.gender && errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}
            </FormGroup>

            {/* Message */}
            <FormView
              label={"Want to Say?"}
              id={"message"}
              type={"textarea"}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={"Write anything you want"}
            />

            {/* From - To Dates */}
            <Row>
              <Col md={6}>
                <FormView
                  label={"From"}
                  id={"fromDate"}
                  type={"date"}
                  value={values.fromDate ? dayjs(values.fromDate) : null}
                  placeholder={"Select from date"}
                  disabledDate={(current) =>
                    values.toDate
                      ? current && current > dayjs(values.toDate)
                      : false
                  }
                  setFieldValue={setFieldValue}
                  touched={touched.fromDate}
                  error={errors.fromDate}
                />
              </Col>

              <Col md={6}>
                <FormView
                  label={"To"}
                  id={"toDate"}
                  type={"date"}
                  value={values.toDate ? dayjs(values.toDate) : null}
                  placeholder={"Select To date"}
                  disabledDate={(current) =>
                    values.fromDate
                      ? current && current < dayjs(values.fromDate)
                      : false
                  }
                  setFieldValue={setFieldValue}
                  touched={touched.toDate}
                  error={errors.toDate}
                />
              </Col>
            </Row>

            {/* Standard Selector */}
            <FormView
              label={"Standard"}
              id={"standard"}
              type={"select"}
              value={values.standard}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.standard}
              error={errors.standard}
            />

            {/* Sports Checkboxes */}
            <FormGroup className="form-group">
              <Label>Sports</Label>
              <div className="d-flex gap-4">
                {["Cricket", "Football", "Basketball"].map((sport) => (
                  <FormView
                    ky={sport}
                    label={sport}
                    id={sport}
                    name={"sports"}
                    type={"checkbox"}
                    value={sport}
                    checked={values.sports.includes(sport)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const updated = checked
                        ? [...values.sports, sport]
                        : values.sports.filter((s) => s !== sport);
                      setFieldValue("sports", updated);
                    }}
                    onBlur={handleBlur}
                  />
                ))}
              </div>
              {touched.sports && errors.sports && (
                <div className="text-danger">{errors.sports}</div>
              )}
            </FormGroup>

            {/* Image Upload */}
            <FormView
              label={"File"}
              id={"file"}
              type={"file"}
              onChange={async (event) => {
                const result = await handleFiles(event);
                if (result?.fileInfo) {
                  setFieldValue("file", result.fileInfo);
                }
              }}
              touched={touched.file}
              error={errors.file}
            />

            {/* Submit Button */}
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StudentForm;
