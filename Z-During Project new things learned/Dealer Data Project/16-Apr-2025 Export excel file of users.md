## Export User Functionality

- Here i implement export user button in Dealer Data project

  - Where i export excel file

    ```js
    const handleExport = async () => {
      try {
        setDownloading(true);
        const response = await Axios.get("users?download=true");

        if (response.status == 200) {
          console.log(response.status);
          const filteredData = response.data.data.rows.map(
            ({
              id,
              role,
              first_name,
              last_name,
              email,
              jag_code,
              lr_code,
              jaguar_retailer,
              land_rover_retailer,
            }) => ({
              Id: id,
              Role: role,
              ["First Name"]: first_name,
              ["Last Name"]: last_name,
              Email: email,
              ["Jaguar Code"]: jag_code,
              ["Land rover Code"]: lr_code,
              ["Jaguar Retailer"]: jaguar_retailer,
              ["Land Rover Retailer"]: land_rover_retailer,
            })
          );

          const worksheet = XLSX.utils.json_to_sheet(filteredData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
          const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
          });
          const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
          });
          saveAs(blob, "users.xlsx");
          setDownloading(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    ```

- JSX code
  ```jsx
  <button
    type="button"
    class="btn btn-primary"
    onClick={() => {
      handleExport();
    }}
    style={{ padding: "10px", margin: "0px 5px" }}
  >
    <span>
      {downloading ? (
        <TailSpin
          visible={true}
          height="15"
          width="100"
          color="white"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        "Export CSV"
      )}
    </span>
  </button>
  ```
