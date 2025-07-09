import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import "./FormStyle.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const FormView = ({
  initialValues,
  options,
  validationSchema,
  onSubmit,
  resetTimeout,
}) => {

  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <Card className="form-card">
            <CardHeader title="User Registration Form" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} className="form-grid">
                  <Field
                    as={TextField}
                    fullWidth
                    id="name"
                    name="name"
                    label="Full Name"
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    aria-describedby="name-helper-text"
                    onChange={(e) => {
                      handleChange(e);
                      resetTimeout();
                    }}
                  />
                </Grid>

                <Grid item xs={12} className="form-grid">
                  <Field
                    as={TextField}
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    aria-describedby="password-helper-text"
                    onChange={(e) => {
                      handleChange(e);
                      resetTimeout();
                    }}
                  />
                </Grid>

                <Grid item xs={12} className="form-grid">
                  <FormControl>
                    <FormLabel id="gender-label">Gender</FormLabel>
                    <Field name="gender">
                      {({ field }) => (
                        <RadioGroup
                          row
                          aria-labelledby="gender-label"
                          name="gender"
                          value={field.value}
                          onChange={(e) => {
                            handleChange(e);
                            resetTimeout();
                          }}
                        >
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      )}
                    </Field>
                    {touched.gender && errors.gender && (
                      <div className="error-text">{errors.gender}</div>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} className="form-grid">
                  <FormControl component="fieldset">
                    <FormLabel component="legend" id="hobbies-label">
                      Hobbies
                    </FormLabel>
                    <div role="group" aria-labelledby="hobbies-label">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="hobbies"
                            value="Reading"
                            checked={values.hobbies.includes("Reading")}
                            onChange={(e) => {
                              const { checked, value } = e.target;
                              const newHobbies = checked
                                ? [...values.hobbies, value]
                                : values.hobbies.filter(
                                    (hobby) => hobby !== value
                                  );
                              handleChange({
                                target: {
                                  name: "hobbies",
                                  value: newHobbies,
                                },
                              });
                              resetTimeout();
                            }}
                          />
                        }
                        label="Reading"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="hobbies"
                            value="Gaming"
                            checked={values.hobbies.includes("Gaming")}
                            onChange={(e) => {
                              const { checked, value } = e.target;
                              const newHobbies = checked
                                ? [...values.hobbies, value]
                                : values.hobbies.filter(
                                    (hobby) => hobby !== value
                                  );
                              handleChange({
                                target: {
                                  name: "hobbies",
                                  value: newHobbies,
                                },
                              });
                              resetTimeout();
                            }}
                          />
                        }
                        label="Gaming"
                      />
                    </div>
                    {touched.hobbies && errors.hobbies && (
                      <div className="error-text">{errors.hobbies}</div>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} className="form-grid">
                  <FormControl fullWidth>
                    <InputLabel id="country-label">Country</InputLabel>
                    <Field
                      as={Select}
                      labelId="country-label"
                      id="country"
                      name="country"
                      label="Country"
                      error={touched.country && !!errors.country}
                      onChange={(e) => {
                        handleChange(e);
                        resetTimeout();
                      }}
                    >
                      {options?.countries?.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      )) || [
                        <MenuItem key="India" value="India">
                          India
                        </MenuItem>,
                        <MenuItem key="USA" value="USA">
                          USA
                        </MenuItem>,
                        <MenuItem key="UK" value="UK">
                          UK
                        </MenuItem>,
                      ]}
                    </Field>
                    {touched.country && errors.country && (
                      <div className="error-text">{errors.country}</div>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className="form-actions">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit-button"
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default FormView;
