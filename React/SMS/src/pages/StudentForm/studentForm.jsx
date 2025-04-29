import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  FormText,
} from "reactstrap";
import "./style/index.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";

function StudentForm() {
  const { RangePicker } = DatePicker;
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    message: "",
    fromDate: "",
    toDate: "",
    standard: "",
    sports: [],
    file: null,
  });

  const handleDateChange = (dates) => {
    console.log(dates[0], dates[1], dates.length);
    if (dates && dates.length === 2 && dates[0] && dates[1]) {
      setFormData({
        ...formData,
        fromDate: dates[0].format("YYYY-MM-DD"),
        toDate: dates[1].format("YYYY-MM-DD"),
      });
    }else {
      setFormData({
        ...formData,
        fromDate: "",
        toDate: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      let updatedSports = [...formData.sports];
      if (checked) {
        updatedSports.push(value);
      } else {
        updatedSports = updatedSports.filter((sport) => sport !== value);
      }
      setFormData({ ...formData, sports: updatedSports });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files }); // single file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="student-form-container">
      <h2>Student Form</h2>
      <Form onSubmit={handleSubmit} className="p-4 border rounded">
        {/* Full Name */}
        <FormGroup className={"form-group"}>
          <Label for="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </FormGroup>

        {/* Gender */}
        <FormGroup className="form-group" tag="fieldset">
          <Label className="form-label">Gender</Label>
          <div className="gender-options">
            <FormGroup check className="me-3">
              <Input
                id="male"
                name="gender"
                type="radio"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <Label check for="male" className="ms-1">
                Male
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                id="female"
                name="gender"
                type="radio"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <Label check for="female" className="ms-1">
                Female
              </Label>
            </FormGroup>
          </div>
        </FormGroup>

        {/* Message */}
        <FormGroup className={"form-group"}>
          <Label for="message">Want to Say?</Label>
          <Input
            id="message"
            name="message"
            type="textarea"
            placeholder="Write something..."
            value={formData.message}
            onChange={handleChange}
          />
        </FormGroup>

        {/* From - To Dates */}
        <Row>
          <Col md={12}>
            <FormGroup className={"form-group"}>
            <Label for="fromDate">From - To</Label>
              <RangePicker
                className="range-picker"
                onCalendarChange={handleDateChange}
                value={
                  formData.fromDate && formData.toDate
                    ? [formData.fromDate, formData.toDate]
                    : []
                }
              />
            </FormGroup>
          </Col>
        </Row>

        {/* Standard Selector */}
        <FormGroup className={"form-group"}>
          <Label for="standard">Standard</Label>
          <Input
            id="standard"
            name="standard"
            type="select"
            value={formData.standard}
            onChange={handleChange}
          >
            <option value="">Select Standard</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </Input>
        </FormGroup>

        {/* Sports Checkboxes */}
        <FormGroup className={"form-group"}>
          <Label>Sports</Label>
          <div className="sports-options">
            <FormGroup check>
              <Input
                name="sports"
                type="checkbox"
                value="Cricket"
                checked={formData.sports.includes("Cricket")}
                onChange={handleChange}
              />
              <Label check>Cricket</Label>
            </FormGroup>
            <FormGroup className={"form-group"} check>
              <Input
                name="sports"
                type="checkbox"
                value="Football"
                checked={formData.sports.includes("Football")}
                onChange={handleChange}
              />
              <Label check>Football</Label>
            </FormGroup>
            <FormGroup className={"form-group"} check>
              <Input
                name="sports"
                type="checkbox"
                value="Basketball"
                checked={formData.sports.includes("Basketball")}
                onChange={handleChange}
              />
              <Label check>Basketball</Label>
            </FormGroup>
          </div>
        </FormGroup>

        {/* Image Upload */}
        <FormGroup className={"form-group"}>
          <Label for="file">File</Label>
          <Input id="file" name="file" type="file" onChange={handleChange} />
        </FormGroup>

        {/* Submit Button */}
        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
}

export default StudentForm;
