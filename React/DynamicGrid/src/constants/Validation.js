import * as Yup from "yup";

const regex = /^[0-9]+$/;
const Validation = Yup.object().shape({
  rows: Yup.string()
    .matches(regex, "Should be Number or Non Zero")
    .required("Rows are Required"),
  columns: Yup.string()
    .matches(regex, "Should be Number or Non Zero")
    .required("Columns are Required"),
});

export default Validation;
