import { Fragment, Suspense, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import { TailSpin } from "react-loader-spinner";
import Loader from "react-js-loader";
import { Card, CardHeader, CardTitle, Input } from "reactstrap";
import Flatpickr from "react-flatpickr";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment-timezone";
import { Tooltip } from "react-tippy";
import Axios from "../../Service/Api";
import { getData, getDropdownValue } from "./store";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import dateFormat from "dateformat";

const ReportList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.Reports);
  const [loading, setLoading] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState("");
  const [invoicedate, setInvoiceDate] = useState("");
  const [downloading, setDownloading] = useState(false);

  const columns = [
    {
      name: "Retailer",
      // sortable: true,
      minWidth: "150px",
      center: true,
      selector: (row) => row.retailer,
      cell: (row) => (
        <Tooltip title={row.retailer}>
          <div
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "120px",
            }}
          >
            {row.retailer || "..."}
          </div>
        </Tooltip>
      ),
    },
    {
      name: "kpi id Number",
      sortable: true,
      minWidth: "100px",
      center: true,
      selector: (row) => row.KPI_id_number,
      cell: (row) => (
        <div>
          <span>{`${row.KPI_id_number.total}(${row.KPI_id_number.percentage}%)`}</span>
        </div>
      ),
    },
    {
      name: "kpi First Name",
      sortable: true,
      minWidth: "100px",
      center: true,
      selector: (row) =>
        row.KPI_first_name === null || row.KPI_first_name === "Null"
          ? ""
          : row.KPI_first_name,
      cell: (row) => (
        <div>
          <span>{`${row.KPI_first_name.total}(${row.KPI_first_name.percentage}%)`}</span>
        </div>
      ),
      //   conditionalCellStyles: [
      //     {
      //       when: (row) =>
      //         row.KPI_first_name === null ||
      //         row.KPI_first_name === "Null" ||
      //         row.KPI_first_name.length <= 1,
      //       style: {
      //         backgroundColor: "#ffff9f",
      //       },
      //     },
      //   ],
      // style: { color: "#000" },
    },
    {
      name: "kpi Last Name",
      sortable: true,
      minWidth: "100px",
      center: true,
      selector: (row) =>
        row.KPI_last_name === null || row.KPI_last_name === "Null"
          ? ""
          : row.KPI_last_name,
      cell: (row) => (
        <div>
          <span>{`${row.KPI_last_name.total}(${row.KPI_last_name.percentage}%)`}</span>
        </div>
      ),
      //   conditionalCellStyles: [
      //     {
      //       when: (row) =>
      //         row.KPI_last_name === null ||
      //         row.KPI_last_name === "Null" ||
      //         row.KPI_last_name.length <= 1,
      //       style: {
      //         backgroundColor: "#ffff9f",
      //       },
      //     },
      //   ],
      // style: { color: "#000" },
    },
    {
      name: "kpi Email",
      sortable: true,
      minWidth: "100px",
      center: true,
      selector: (row) => (row.KPI_email === null ? "--" : row.KPI_email),
      cell: (row) => (
        <div>
          <span>{`${row.KPI_email.total}(${row.KPI_email.percentage}%)`}</span>
        </div>
      ),

      //   conditionalCellStyles: [
      //     {
      //       when: (row) => row.status === 1,
      //       style: {
      //         backgroundColor: "#ffff9f",
      //       },
      //     },
      //   ],
    },
    {
      name: "kpi Phone Number",
      sortable: true,
      minWidth: "100px",
      center: true,
      selector: (row) =>
        row.KPI_phone_number === "NULL" ? "--" : row.KPI_phone_number,
      cell: (row) => (
        <div>
          <span>{`${row.KPI_phone_number.total}(${row.KPI_phone_number.percentage}%)`}</span>
        </div>
      ),

      //   conditionalCellStyles: [
      //     {
      //       when: (row) =>
      //         row.KPI_phone_number === null ||
      //         row.KPI_phone_number === "" ||
      //         row.KPI_phone_number.toString().length < 10 ||
      //         isNaN(row.KPI_phone_number),
      //       style: {
      //         backgroundColor: "#ffff9f",
      //       },
      //     },
      //   ],
    },

    {
      name: "kpi Passport Number",
      sortable: true,
      minWidth: "140px",
      center: true,
      selector: (row) =>
        row.KPI_passport_number == null ||
        row.KPI_passport_number === "" ||
        row.KPI_passport_number === "NULL"
          ? "--"
          : row.KPI_passport_number,
      cell: (row) => (
        <div>
          <span>{`${row.KPI_passport_number.total}(${row.KPI_passport_number.percentage}%)`}</span>
        </div>
      ),

      // style: { color: "#000" },
      //   conditionalCellStyles: [
      //     {
      //       when: (row) =>
      //         row.passport_number === null ||
      //         row.passport_number === "" ||
      //         // row.passport_number.toString().length !== 10 ||
      //         row.passport_number.toString().startsWith("000000") ||
      //         isNaN(row.passport_number),
      //       style: {
      //         backgroundColor: "#ffff9f",
      //       },
      //     },
      //   ],
    },

    {
      name: "OverAll",
      sortable: true,
      minWidth: "140px",
      center: true,
      // selector: (row) => row.Overall,
      cell: (row) => (
        <div>
          <span>{`${row.Overall}%`}</span>
        </div>
      ),
    },

    {
      name: "Last Updated",
      sortable: true,
      minWidth: "140px",
      center: true,
      selector: (row) =>
        row?.last_updated
          ? moment(row?.last_updated)
              .tz("Africa/Johannesburg") // Convert to South Africa Time
              .format("YYYY-MM-DD, HH:mm")
          : "--", // Format as requested, fallback to "--"
    },
  ];

  /// This is first call and get Data
  useEffect(() => {
    setLoading(true);
    invoicedate
      ? dispatch(
          getDropdownValue({
            page: currentPage,
            perPage: rowsPerPage,
            startDate: invoicedate.length ? invoicedate[0] : "",
            endDate: invoicedate.length ? invoicedate[1] : "",
          })
        )
          .then(() => setLoading(false))
          .catch(() => setLoading(false))
      : dispatch(
          getData({
            page: currentPage,
            perPage: rowsPerPage,
            q: searchValue,
          })
        )
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
  }, [currentPage, rowsPerPage, searchValue, invoicedate]);

  const dataToRender = () => {
    if (store?.data?.length > 0) {
      return store?.data;
    }
  };

  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
    </div>
  );

  // Called by CustomPagination
  const handlePagination = async (page) => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        q: searchValue,
      })
    );
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    dispatch(
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        q: searchValue,
      })
    );
    setRowsPerPage(parseInt(e.target.value));
  };

  const CustomPagination = () => {
    const count = store.total || 1;

    // console.log(store.total);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={1} // Ditermine from last how many page navigators display
        pageRangeDisplayed={3} // Ditermine from first how many page navigators display
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };

  const handleDateChange = (date) => {
    // console.log(date);

    const formatDate = (dt) => {
      const utcDate = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
      // console.log(utcDate);

      return utcDate.toISOString().slice(0, 10);
    };
    const dateRange = [new Date(date[0]), new Date(date[1])];
    const formatRange = (range) => range.map(formatDate);

    const formattedDateRange = formatRange(dateRange);

    // console.log(formattedDateRange);

    if (formattedDateRange.length == 2) {
      setInvoiceDate(formattedDateRange);
    }
  };

  const handleClear = () => {
    setLoading(true);
    setSearchValue("");
    setInvoiceDate("");
    setLoading(false);
  };

  const handleExport = async () => {
    try {
      setDownloading(true);
      const response = await Axios.get("admin/kpi/reports?download=true");

      if (response.status == 200) {
        console.log(response.data.retailers);

        const filteredData = response.data.retailers.map(
          ({
            retailer,
            KPI_id_number,
            KPI_first_name,
            KPI_last_name,
            KPI_email,
            KPI_phone_number,
            KPI_passport_number,
            Overall,
            last_updated,
          }) => ({
            retailer: retailer,
            ["Id Number"]: KPI_id_number
              ? `${KPI_id_number.total}(${KPI_id_number.percentage}%)`
              : "",
            ["First Name"]: KPI_first_name
              ? `${KPI_first_name.total}(${KPI_first_name.percentage}%)`
              : "",
            ["Last Name"]: KPI_last_name
              ? `${KPI_last_name.total}(${KPI_last_name.percentage}%)`
              : "",
            Email: KPI_email
              ? `${KPI_email.total}(${KPI_email.percentage}%)`
              : "",
            ["Phone Number"]: KPI_phone_number
              ? `${KPI_phone_number.total}(${KPI_phone_number.percentage}%)`
              : "",
            ["Passport Number"]: KPI_passport_number
              ? `${KPI_passport_number.total}(${KPI_passport_number.percentage}%)`
              : "",
            Overall: Overall ? `${Overall}%` : "",
            ["Last Updated"]: last_updated
              ? dateFormat(last_updated, "yyyy-mm-dd hh:MM")
              : "",
          })
        );

        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        worksheet["!cols"] = [
          { wch: 30 }, // Retailer
          { wch: 15 }, // Id
          { wch: 15 }, // First Name
          { wch: 15 }, // Last Name
          { wch: 15 }, // Email
          { wch: 15 }, // Phone Number
          { wch: 15 }, // Passport Number
          { wch: 15 }, // Overall
          { wch: 25 }, // Last Updated
        ];
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });
        saveAs(blob, "Reports.xlsx");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Fragment>
      <Suspense
        fallback={
          <Loader type="spinner-default" bgColor={"#42b983"} size={30} />
        }
      >
        <Card>
          <CardHeader className="border-bottom" style={{ padding: "15px" }}>
            <CardTitle tag="h2" style={{ fontSize: "22px" }}>
              Reports{` (${store.totalCount})`}
            </CardTitle>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
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
            </div>
          </CardHeader>
          <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <h4
                style={{
                  color: "black",
                  fontSize: "15px",
                  marginLeft: "17px",
                  marginRight: "5px",
                  marginTop: "1.1rem",
                }}
              >
                Show
              </h4>
              <Input
                className="dataTable-select"
                type="select"
                value={rowsPerPage}
                onChange={(e) => handlePerPage(e)}
                id="sort-select"
                style={{
                  padding: "4px",
                  marginTop: "10px",
                  width: "55px",
                  position: "relative",
                }}
              >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <h4
                style={{
                  color: "black",
                  fontSize: "15px",
                  marginLeft: "6px",
                  marginTop: "1.1rem",
                }}
              >
                Entries
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "15px",
              }}
            >
              <h4
                style={{
                  color: "black",
                  fontSize: "15px",
                  margin: "8px 10px 0px 0px",
                }}
              >
                Search
              </h4>
              <Input
                className="dataTable-filter"
                type="text"
                bsSize="sm"
                id="search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{
                  marginRight: "10px",
                  caretColor: "black",
                  borderColor: isHovered1 ? "#42B983 " : "#42B983",
                  border: isHovered1 ? "2px solid #42B983 " : "1px solid #ccc",
                }}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              />

              <Flatpickr
                className="input form form-control"
                placeholder="Select Date..."
                options={{ mode: "range", dateFormat: "Y-m-d" }}
                value={invoicedate}
                onChange={(date) => handleDateChange(date)}
                style={{
                  fontSize: "15px",
                  borderColor: "#4b494a",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  padding: "3px",
                  marginTop: "5px",
                  marginLeft: "6px",
                }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClear}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          {loading ? (
            <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
          ) : (
            <div className="react-dataTable" style={{ marginTop: "10px" }}>
              <DataTable
                noHeader
                pagination
                paginationServer
                className="react-dataTable"
                columns={columns}
                sortIcon={<ChevronDown size={10} />}
                paginationComponent={CustomPagination}
                data={dataToRender()}
                // progressPending={pending}
                progressComponent={<CustomLoader />}
                // onRowClicked={(row) => {
                //   setShow(true);
                //   setUser(row);
                // }}
                // customStyles={customStyles}
                fixedHeader
                highlightOnHover
              />
            </div>
          )}
        </Card>
      </Suspense>
    </Fragment>
  );
};
export default ReportList;
