import React, { useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import "./style/index.css";
import { DatePicker } from "antd";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../redux/StudentSlice";

function StudentForm() {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const store = useSelector((state) => state.formData);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    gender: Yup.string().required("Gender is required"),
    message: Yup.string(),
    // dateRange: Yup.array().length(2, "Select From and To dates"),
    standard: Yup.string().required("Standard is required"),
    sports: Yup.array().min(1, "At least any one sport required"),
    // file: Yup.mixed().required("File is required"),
  });

  const handleSubmit = (values) => {
    console.log("Submitted");
    dispatch(setFormData(values));
    console.log(store);
  };

  return (
    <div className="student-form-container">
      <Formik
        initialValues={store}
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
              <Col md={12}>
                <FormGroup className="form-group">
                  <Label>From - To</Label>
                  <RangePicker
                    className="w-100 range-picker"
                    value={values.dateRange}
                    onChange={(dates) =>
                      setFieldValue(
                        "dateRange",
                        dates.map((d) => d && dayjs(d).format("YYYY-MM-DD"))
                      )
                    }
                    // onInvalidCapture={errors.dateRange}
                  />
                  {touched.dateRange && errors.dateRange && (
                    <div className="text-danger">{errors.dateRange}</div>
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
                // invalid={touched.standard && !!errors.standard}
              >
                <option value="">Select Standard</option>
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
              <Input
                id="file"
                name="file"
                type="file"
                onChange={(event) =>
                  setFieldValue("file", event.currentTarget.files[0])
                }
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
