import React, { useState } from "react";
import Icon from "@/components/ui/Icon";

const Textinput = ({
  type,
  label,
  placeholder = "Add placeholder",
  classLabel = "form-label",
  className = "",
  classGroup = "",
  register,
  name,
  phoneNumber,
  address,
  images,
  readonly,
  value,
  error,
  icon,
  disabled,
  id,
  horizontal,
  validate,
  isMask,
  msgTooltip,
  description,
  hasicon,
  onChange,
  options,
  onFocus,
  defaultValue,
  customInput, // New prop for custom input
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div
      className={`fromGroup  ${error ? "has-error" : ""}  ${
        horizontal ? "flex" : ""
      }  ${validate ? "is-valid" : ""} `}
    >
      {label && (
        <label
          htmlFor={id}
          className={`block capitalize ${classLabel}  ${
            horizontal ? "flex-0 mr-6 md:w-[100px] w-[60px] break-words" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div className={`relative ${horizontal ? "flex-1" : ""}`}>
        {customInput ? (
          customInput
        ) : (name || phoneNumber || address || images) && !isMask ? (
          <input
            type={type === "password" && open === true ? "text" : type}
            {...register(name || phoneNumber || address || images)}
            {...rest}
            className={`${
              error ? " has-error" : " "
            } form-control py-2 pr-9 ${className}  `}
            placeholder={placeholder}
            readOnly={readonly}
            defaultValue={defaultValue}
            disabled={disabled}
            id={id}
            onChange={(e) => {
                if (images) {
                    const files = e.target.files;
                    console.log(`Selected files:`, files);
                  }
              register(name || phoneNumber || address || images).onChange(e);
              if (onChange) onChange(e);
            }}
          />
        ) : !(name || phoneNumber || address || images) && !isMask ? (
          <input
            type={type === "password" && open === true ? "text" : type}
            className={`form-control py-2  ${className}`}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={onChange}
            id={id}
          />
        ) : (name || phoneNumber || address || images) && isMask ? (
          <Cleave
            {...register(name || phoneNumber || address || images)}
            {...rest}
            placeholder={placeholder}
            options={options}
            className={`${
              error ? " has-error" : " "
            } form-control py-2 ${className}  `}
            onFocus={onFocus}
            id={id}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange}
          />
        ) : (
          <Cleave
            placeholder={placeholder}
            options={options}
            className={`${
              error ? " has-error" : " "
            } form-control py-2  ${className}  `}
            onFocus={onFocus}
            id={id}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};
