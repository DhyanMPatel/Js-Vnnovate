import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CompanyTable from "@/components/partials/Table/company-table";
import {
  getReports,
  handleDeleteReport,
  setFilteredReport,
  setMonth,
} from "./store/reportSlice";
import Swal from "sweetalert2/dist/sweetalert2";
import Loading from "../../components/Loading";
import CSV from "../../components/ui/CSV";

const Reports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reportData, isLoading, month, filteredReport } = useSelector(
    (state) => state.report
  );

  useEffect(() => {
    dispatch(setMonth(null));
    dispatch(getReports());
  });

  useEffect(() => {
    if (month) {
      const timeoutId = setTimeout(() => {
        let filtered = [];
        filtered = reportData.filter((report) => {
          const reportDate = new Date(report.createdAt);
          return (
            !isNaN(reportDate) && reportDate.getMonth() + 1 === Number(month)
          );
        });

        dispatch(setFilteredReport(filtered));
      });
      return () => clearTimeout(timeoutId);
    } else {
      dispatch(getReports());
    }
  }, [month]);

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "name",
      Cell: (row) => {
        return (
          <span className="flex items-center">
            <div className="flex-1 text-start">
              <h4 className="text-sm font-medium text-slate-600 whitespace-nowrap">
                {row?.cell?.value}
              </h4>
            </div>
          </span>
        );
      },
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Address",
      accessor: "address",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Images",
      accessor: "images",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "action",
      accessor: "id",
      Cell: (row) => {
        return (
          <div>
            <div className="flex gap-4 divide-y divide-slate-100 dark:divide-slate-800">
              <div
                className={
                  "text-danger-600 bg-opacity-30 cursor-pointer hover:bg-opacity-100"
                }
                onClick={() => deletereport(row?.cell?.value)}
              >
                <span className="text-base">
                  <Icon icon={`heroicons-outline:trash`} />
                </span>
              </div>
              <div
                className={
                  " cursor-pointer dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                }
                onClick={() => navigate(`/edit-report/${row?.cell?.value}`)}
              >
                <span className="text-base">
                  <Icon icon={`heroicons:pencil-square`} />
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const deletereport = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      // background: darkMode ? "#1e293b" : "#fff",
      background: "#fff",
      confirmButtonColor: "#0783F6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await dispatch(handleDeleteReport(id)).unwrap();
        if (response.data.success) {
          dispatch(getReports());
        } else {
          toast.error(response.data.message);
        }
      }
    });
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="lg:col-span-8 col-span-12">
        <Card
          title="Reports"
          datePicker
          dateFilter={true}
          buttonTitle={"Add Report"}
          buttonLink={"/add-report"}
          noborder
        >
          <CompanyTable
            columns={COLUMNS}
            data={month ? filteredReport : reportData}
          />
          <CSV exportCSV={"Export CSV"} />
        </Card>
      </div>
    </>
  );
};

export default Reports;
