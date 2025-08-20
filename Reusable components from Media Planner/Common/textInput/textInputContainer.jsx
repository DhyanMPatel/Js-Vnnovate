import React from "react";
import TextInputView from "./textInputView";

const TextInputContainer = ({
  name,
  label,
  required,
  type = "text",
  placeholder,
  formikProps,
  InputProps,
  rows,
  maxRows,
  multiline,
  ...props
}) => {
  return (
    <TextInputView
      name={name}
      label={label}
      required={required}
      type={type}
      placeholder={placeholder}
      formikProps={formikProps}
      InputProps={InputProps}
      rows={rows}
      maxRows={maxRows}
      multiline={multiline}
      {...props}
    />
  );
};

export default TextInputContainer;
