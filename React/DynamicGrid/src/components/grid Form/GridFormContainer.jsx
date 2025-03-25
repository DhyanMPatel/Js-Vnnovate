import GridForm from "./GridForm";
import { InitialValues, Validation } from "../../constants";
import { useEffect } from "react";
import axios from "axios";

function GridFormContainer() {
  useEffect(() => {
    const response = axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // console.log("Response: ", response);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  return <GridForm initialValues={InitialValues} VALIDATION={Validation} />;
}
export default GridFormContainer;
