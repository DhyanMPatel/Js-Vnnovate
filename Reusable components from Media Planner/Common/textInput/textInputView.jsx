import { Box, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
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
    setFieldValue: () => {},
  },
  InputProps = {},
  isTime,
  ...props
}) => {
  const { values, handleChange, handleBlur, touched, errors, setFieldValue } =
    formikProps;

  return (
    <Box className="form-field">
      <label className="form-field__label">
        {label}
        {required && <span className="required-asterisk"> *</span>}
      </label>
      {isTime ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            value={
              values[name]
                ? dayjs(`2000-01-01 ${values[name]}`, "YYYY-MM-DD hh:mm A")
                : dayjs("2000-01-01 12:00 AM", "YYYY-MM-DD hh:mm A")
            }
            onChange={(newValue) => {
              if (newValue && newValue.isValid()) {
                const timeString = newValue.format("hh:mm A");
                setFieldValue(name, timeString);
              }
            }}
            format="hh:mm A"
            onBlur={handleBlur}
            fullWidth
            variant="outlined"
            error={touched[name] && Boolean(errors?.[name])}
            helperText={(touched[name] && errors?.[name]) || " "}
            InputProps={InputProps}
            slotProps={{
              textField: {
                size: "small",
              },
            }}
            {...props}
          />
        </LocalizationProvider>
      ) : (
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
      )}
    </Box>
  );
};

export default TextInputView;
