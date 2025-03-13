import GridForm from "./GridForm";
import { InitialValues, Validation } from "../../constants";

function GridFormContainer() {
  return <GridForm initialValues={InitialValues} VALIDATION={Validation} />;
}
export default GridFormContainer;
