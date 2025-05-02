import { Form, Formik } from "formik";
import { FormView } from "../../common/FormView";
import dayjs from "dayjs";
import * as Yup from "yup";
import { FormGroup, Button, Col, Label, Row } from "reactstrap";
import { updateStd } from "../../redux/StudentSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export const UpdateStd = ({ std, setStd, setIsOpen }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    id: Yup.string().required("ID is required"),
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
    Swal.fire({
      title: "Student Success fully Updated",
      icon: "success",
    });
    dispatch(updateStd(values));
    setIsOpen(false);
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
    <>
      <Formik
        initialValues={std}
        validationSchema={validationSchema}
        enableReinitialize={true}
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
              readOnly={true}
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
              {/* {console.log(values.sports)} */}
              <div className="d-flex gap-4">
                {["Cricket", "Football", "Basketball"].map((sport) => (
                  <FormView
                    ky={sport}
                    label={sport}
                    id={sport}
                    name={"sports"}
                    type={"checkbox"}
                    value={sport}
                    checked={values.sports?.includes(sport) || false}
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
              label={"Change File"}
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

            {/* Display Available image */}
            {
              <img
                src={values.file?.base64Data}
                alt={values.file?.name}
                style={{
                  width: "auto",
                  height: "100px",
                  maxWidth: "150px",
                  objectFit: "fill",
                  margin: "5px",
                  borderRadius: "14px",
                  backgroundColor: "#f0f0f0",
                }}
              />
            }

            <hr />
            {/* Submit Button */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Button
                color="success"
                type="submit"
                style={{
                  width: "calc-size(fit-content, size * 2)",
                }}
              >
                Update
              </Button>
              <Button
                color="danger"
                style={{
                  width: "calc-size(fit-content, size * 2)",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Cancel will not make any Changes",
                    icon: "warning",

                    showClass: {
                      popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `,
                    },
                    hideClass: {
                      popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `,
                    },
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    showCancelButton: true,
                    confirmButtonText: "Okey",
                    cancelButtonText: "No Worry",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setStd({});
                      setIsOpen(false);
                    }
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
