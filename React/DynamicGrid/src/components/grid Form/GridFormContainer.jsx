import GridForm from "./GridForm";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

function GridFormContainer() {
  const initialValues = {
    rows: "",
    columns: "",
  };
  const dispatch = useDispatch();
  const regex = /^[0-9]+$/;
  const VALIDATION = Yup.object().shape({
    rows: Yup.string()
      .matches(regex, "Should be Number or Non Zero")
      .required("Rows are Required"),
    columns: Yup.string()
      .matches(regex, "Should be Number or Non Zero")
      .required("Columns are Required"),
  });
  return (
    <GridForm
      initialValues={initialValues}
      dispatch={dispatch}
      VALIDATION={VALIDATION}
    />
  );
}
export default GridFormContainer;
