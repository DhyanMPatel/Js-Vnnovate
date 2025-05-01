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
import { FaCalendarAlt } from "react-icons/fa";

import "./style/index.css";
import { DatePicker } from "antd";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../redux/StudentSlice";
import { useNavigate } from "react-router-dom";

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
    // console.log("Submitted ", values);
    dispatch(setFormData(values));
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
            <FormGroup className="form-group">
              <Label for="id">Student ID</Label>
              <Input
                id="id"
                name="id"
                type="text"
                value={values.id}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Unique Student ID"
              />
              {touched.id && errors.id && (
                <div className="text-danger">{errors.id}</div>
              )}
            </FormGroup>

            {/* Full Name */}
            <FormGroup className="form-group">
              <Label for="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                // invalid={touched.fullName && !!errors.fullName}
                placeholder="Enter Your Full Name"
              />
              {touched.fullName && errors.fullName && (
                <div className="text-danger">{errors.fullName}</div>
              )}
            </FormGroup>

            {/* Gender */}
            <FormGroup className="form-group" tag="fieldset">
              <Label className="form-label">Gender</Label>
              <div className="gender-options d-flex">
                {["male", "female"].map((g) => (
                  <FormGroup key={g} className="me-3">
                    <Input
                      id={g}
                      name="gender"
                      type="radio"
                      value={g}
                      checked={values.gender === g}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // invalid={touched.gender && !!errors.gender}
                    />
                    <Label for={g} className="ms-1">
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </Label>
                  </FormGroup>
                ))}
              </div>
              {touched.gender && errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}
            </FormGroup>

            {/* Message */}
            <FormGroup className="form-group">
              <Label for="message">Want to Say?</Label>

              <Input
                id="message"
                name="message"
                type="textarea"
                value={values.message}
                onChange={handleChange}
                placeholder="Write anything you want"
              />
            </FormGroup>

            {/* From - To Dates */}
            <Row>
              <Col md={6}>
                <FormGroup className="form-group">
                  <Label for="fromDate">From</Label>
                  <DatePicker
                    id="fromDate"
                    placeholder="Select from date"
                    className="w-100 range-picker"
                    value={values.fromDate ? dayjs(values.fromDate) : null}
                    disabledDate={(current) =>
                      values.toDate
                        ? current && current > dayjs(values.toDate)
                        : false
                    }
                    onBlur={handleBlur}
                    onChange={(date) =>
                      setFieldValue(
                        "fromDate",
                        dayjs(date).format("YYYY-MM-DD")
                      )
                    }
                  />
                  {touched.fromDate && errors.fromDate && (
                    <div className="text-danger">{errors.fromDate}</div>
                  )}
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup className="form-group">
                  <Label for="toDate">To</Label>
                  <DatePicker
                    id="toDate"
                    placeholder="Select to date"
                    className="w-100 range-picker"
                    value={values.toDate ? dayjs(values.toDate) : null}
                    disabledDate={(current) =>
                      values.fromDate
                        ? current && current < dayjs(values.fromDate)
                        : false
                    }
                    onBlur={handleBlur}
                    onChange={(date) =>
                      setFieldValue("toDate", dayjs(date).format("YYYY-MM-DD"))
                    }
                  />
                  {touched.toDate && errors.toDate && (
                    <div className="text-danger">{errors.toDate}</div>
                  )}
                </FormGroup>
              </Col>
            </Row>

            {/* Standard Selector */}
            <FormGroup className="form-group">
              <Label for="standard">Standard</Label>
              <Input
                id="standard"
                name="standard"
                type="select"
                value={values.standard}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>Select Standard</option>
                {[7, 8, 9, 10, 11, 12].map((num) => (
                  <option key={num}>{num}</option>
                ))}
              </Input>
              {touched.standard && errors.standard && (
                <div className="text-danger">{errors.standard}</div>
              )}
            </FormGroup>

            {/* Sports Checkboxes */}
            <FormGroup className="form-group">
              <Label>Sports</Label>
              <div className="d-flex gap-4">
                {["Cricket", "Football", "Basketball"].map((sport) => (
                  <FormGroup key={sport}>
                    <Input
                      type="checkbox"
                      id={sport}
                      name="sports"
                      value={sport}
                      checked={values.sports.includes(sport)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const updated = checked
                          ? [...values.sports, sport]
                          : values.sports.filter((s) => s !== sport);
                        setFieldValue("sports", updated);
                      }}
                    />
                    <Label for={sport}>{sport}</Label>
                  </FormGroup>
                ))}
              </div>
              {touched.sports && errors.sports && (
                <div className="text-danger">{errors.sports}</div>
              )}
            </FormGroup>

            {/* Image Upload */}
            <FormGroup className="form-group">
              <Label for="file">File</Label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={async (event) => {
                  const result = await handleFiles(event);
                  if (result?.fileInfo) {
                    setFieldValue("file", result.fileInfo);
                  }
                }}
                accept="image/png, image/heic, image/jpg, image/jpeg"
              />
              {touched.file && errors.file && (
                <div className="text-danger">{errors.file}</div>
              )}
              {values.file && <div className="mt-1">{values.file.name}</div>}
            </FormGroup>

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
