import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@mui/material";
import { setRows } from "../../redux/reducer/RowSliceRC";
import { setColumns } from "../../redux/reducer/ColsSliceRC";
import { setShowGrid } from "../../redux/reducer/ShowGridSliceRC";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "../../redux/reducer/ProgressSliceRC";
import { NavLink } from "react-router";
// import CircularWithValueLabel from "../Loader/CircularWithValueLabel";

function GridForm({ initialValues, VALIDATION }) {
  // const progress = useSelector((state) => state.progress.value);
  const showGrid = useSelector((state) => state.showGrid.value);
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={VALIDATION}
          onSubmit={(values) => {
            // dispatch(setProgress(true));
            // setTimeout(() => {
            dispatch(setRows(values.rows));
            dispatch(setColumns(values.columns));
            dispatch(setShowGrid(!showGrid));
            // dispatch(setProgress(false));
            // }, 1000);
          }}
        >
          {() => (
            <>
              <Form className=" w-2xl h-full flex flex-col justify-center items-center">
                <div className="flex w-full justify-around">
                  <Button variant="outlined">
                    <NavLink to="/settings">Settings</NavLink>
                  </Button>
                  <Button variant="outlined">
                    <NavLink to="/sample">Sample Grid</NavLink>
                  </Button>
                </div>
                <table className=" rounded-2xl p-3 m-4 table border-2 border-separate">
                  <tbody>
                    <tr className="table-row">
                      <th className="pt-3 pb-3">
                        <label htmlFor="rows">Rows</label>
                      </th>
                      <td>
                        <Field
                          id="rows"
                          name="rows"
                          placeholder="Enter Rows"
                          className="border-2 rounded-sm p-1"
                        />
                        <ErrorMessage
                          name="rows"
                          render={(msg) => (
                            <div className="text-red-600 text-xs">{msg}</div>
                          )}
                        />
                      </td>
                    </tr>
                    <tr className="table-row">
                      <th className="pt-3 pb-3">
                        <label htmlFor="columns">Columns</label>
                      </th>
                      <td>
                        <Field
                          id="columns"
                          name="columns"
                          placeholder="Enter Columns"
                          className="border-2 rounded-sm p-1"
                        />
                        <ErrorMessage
                          name="columns"
                          render={(msg) => (
                            <div className="text-red-600 text-xs">{msg}</div>
                          )}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  {/* {progress ? (
                  <CircularWithValueLabel />
                ) : ( */}
                  <Button type="submit" variant="contained" disableElevation>
                    Submit
                  </Button>
                  {/* )} */}
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
}
export default GridForm;
