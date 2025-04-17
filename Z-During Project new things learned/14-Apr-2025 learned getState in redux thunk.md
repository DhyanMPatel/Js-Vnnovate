## Redux Thunk

### getState()

- in createAsyncThunk() there are async function and we passed getState() with dispatch.

- getState() use to get current state value from store.

  ```js
  export const addUser = createAsyncThunk(
    "exceptionEmail/addUser",
    async (data, { dispatch, getState }) => {
      const user = JSON.parse(localStorage.getItem("userData"));

      const response = await Axios.post("/email/create", data);
      if (response.data.status === 200) {
        toast.success(response.data.msg);
        dispatch(
          getData({
            page: getState().exceptionEmail.params.page,
            perPage: getState().exceptionEmail.params.perPage,
            q: getState().exceptionEmail.params.q,
          })
        );
      } else if (response.data.status != 200) {
        toast.error(response.data.message);
        return response.data;
      }
    }
  );
  ```

## Axios

- params use to add something at the end of API.

something like,

    ```
    https://yourapp.com/accessory/list?page=1&perPage=25&q=
    ```

when,

    ```js
    export const getData = createAsyncThunk(
    "accessories/getData",
    async (params) => {
        const user = JSON.parse(localStorage.getItem("userData"));

        const response = await Axios.get("/accesory/list", {
        params,
        });

        const allData = response.data;

        return {
        allData: allData.data,
        totalPages: parseInt(Math.ceil(allData.Count[0].Count / params.perPage)),
        Count: allData.Count[0].Count,
        // data: response.data.data.rows.splice(
        //     parseInt(params.perPage) * (params.page - 1),
        //     parseInt(params.perPage)
        // ),

        // total_count: response.data.total_count,
        params,
        };
    }
    );
    ```
