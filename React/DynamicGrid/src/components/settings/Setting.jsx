import { Field, Form, Formik, ErrorMessage } from "formik";
import { configureValues } from "../../constants";
import { Validation } from "../../constants";
import { Button } from "@mui/material";
import BackArrow from "../../common/back_arrow";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setColsPerPage } from "../../redux/reducer/ColsPerPageSliceRC";
import { setRowsPerPage } from "../../redux/reducer/RowsPerPageSliceRC";

function Settings() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-2">
        <Button
          variant="outlined"
          disableElevation
          onClick={() => {
            navigation("/");
          }}
        >
          <BackArrow />
        </Button>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Formik
          initialValues={configureValues}
          validationSchema={Validation}
          onSubmit={(value) => {
            dispatch(setRowsPerPage(value.rows));
            dispatch(setColsPerPage(value.columns));
            navigation("/");
          }}
        >
          {() => (
            <Form className=" w-2xl h-full flex flex-col justify-center items-center">
              <table className=" rounded-2xl p-3 m-4 table border-2 border-separate">
                <tbody>
                  <tr>
                    <td colSpan={2} className="p-2 font-bold text-2xl">
                      Configuration of Rows & Columns
                    </td>
                  </tr>
                  <tr className="table-row">
                    <th className="pt-3 pb-3">
                      <label htmlFor="rows">Rows</label>
                    </th>
                    <td>
                      <Field
                        id="rows"
                        name="rows"
                        placeholder="Set Rows"
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
                        placeholder="Set Columns"
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
                  Set
                </Button>
                {/* )} */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
export default Settings;
