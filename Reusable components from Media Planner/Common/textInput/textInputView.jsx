import { Box, TextField } from "@mui/material";
import React from "react";
import "./textInputStyle.scss";

const TextInputView = ({
  name = "",
  label = "",
  required = false,
  type = "text",
  placeholder = "",
  rows,
  maxRows,
  multiline = false,
  formikProps = {
    values: {},
    handleChange: () => {},
    handleBlur: () => {},
    touched: {},
    errors: {},
  },
  InputProps = {},
  ...props
}) => {
  const { values, handleChange, handleBlur, touched, errors } = formikProps;

  return (
    <Box className="form-field">
      <label className="form-field__label">
        {label}
        {required && <span className="required-asterisk"> *</span>}
      </label>
      <TextField
        multiline={multiline}
        name={name}
        value={values[name] || ""}
        rows={rows}
        maxRows={maxRows}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
        variant="outlined"
        fullWidth
        error={touched[name] && Boolean(errors?.[name])}
        helperText={touched[name] && errors?.[name]}
        size="small"
        placeholder={placeholder}
        InputProps={InputProps}
        {...props}
      />
    </Box>
  );
};

export default TextInputView;
