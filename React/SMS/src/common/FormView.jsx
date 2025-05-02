import { DatePicker } from "antd";
import dayjs from "dayjs";
import { FormGroup, Input, Label } from "reactstrap";

export const FormView = ({
  label,
  id,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  touched,
  error,
  ky,
  checked,
  name,
  disabledDate,
  setFieldValue,
  readOnly,
}) => {
  return (
    <>
      {["text", "textarea", "select", "radio", "checkbox", "date"].includes(
        type
      ) && (
        <FormGroup key={ky || ""} className={checked ?? "form-group"}>
          {!["radio", "checkbox"].includes(type) && (
            <Label for={id}>{label}</Label>
          )}

          {type !== "date" ? (
            <Input
              id={id}
              name={name || id}
              type={type}
              value={value}
              checked={checked}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              readOnly={readOnly}
            >
              {type === "select" ? (
                <>
                  <option>Select Standard</option>
                  {[7, 8, 9, 10, 11, 12].map((num) => (
                    <option key={num}>{num}</option>
                  ))}
                </>
              ) : null}
            </Input>
          ) : (
            <DatePicker
              id={id}
              value={value}
              placeholder={placeholder}
              className="w-100 date-picker"
              disabledDate={disabledDate}
              onChange={(date) =>
                setFieldValue(id, dayjs(date).format("YYYY-MM-DD"))
              }
            />
          )}

          {["radio", "checkbox"].includes(type) && (
            <Label for={id}>{label}</Label>
          )}

          {touched && error && <div className="text-danger">{error}</div>}
        </FormGroup>
      )}

      {type === "file" && (
        <FormGroup className="form-group">
          <Label for={id}>{label}</Label>
          <input
            id={id}
            name={id}
            type={type}
            onChange={onChange}
            accept="image/png, image/heic, image/jpg, image/jpeg"
          />
          {touched && error && <div className="text-danger">{error}</div>}
        </FormGroup>
      )}
    </>
  );
};
