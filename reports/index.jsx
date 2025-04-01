import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { useSelector, useDispatch } from "react-redux";
import CompanyTable from "@/components/partials/Table/company-table";
import { toast } from "react-toastify";
import { useMemo } from "react";

import {
  getReports,
  handleDeleteReport,
  setFilteredReport,
  setMonth,
  setReportWithImage,
} from "./store/reportSlice";
import { getImages } from "./store/imageSlice";

import Swal from "sweetalert2/dist/sweetalert2";
import Loading from "../../components/Loading";

import CSV from "../../components/ui/CSV";

import DialogDiv from "../../components/ui/Dialog";

const Reports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reportData, isLoading, month, filteredReport, reportWithImage } =
    useSelector((state) => state.report);
  const { reportImages } = useSelector((state) => state.reportImages);
  const [selectedDialog, setSelectedDialog] = useState(null);

  const reportWI = useMemo(() => {
    return reportData.map((report) => ({
      ...report,
      imageUrls: reportImages
        .filter((img) => img.reportCategoryId === report.id)
        .sort((a, b) => a.order - b.order)
        .map((img) => img.url),
      images: reportImages
        .filter((img) => img.reportCategoryId === report.id)
        .sort((a, b) => a.order - b.order),
    }));
  }, [reportData, reportImages]);

  // get Reports and Images
  useEffect(() => {
    dispatch(setMonth(null));
    dispatch(getReports());
    dispatch(getImages());
  }, []);

  // Merge Reports and Images
  useEffect(() => {
    dispatch(setReportWithImage(reportWI));
  }, [dispatch, reportWithImage, reportData, reportImages]);

  // Filter based on month
  useEffect(() => {
    if (month) {
      const timeoutId = setTimeout(() => {
        let filtered = [];
        filtered = reportWithImage.filter((report) => {
          const reportDate = new Date(report.createdAt);
          return (
            !isNaN(reportDate) && reportDate.getMonth() + 1 === Number(month)
          );
        });

        dispatch(setFilteredReport(filtered));
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [month, reportData, filteredReport]);

  const COLUMNS = [
    {
      Header: "name",
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
      accessor: "imageUrls",
      Cell: (row) => {
        const imageUrl =
          Array.isArray(row?.cell?.value) && row.cell.value.length > 0
            ? `http://localhost:3000/uploads/${row.cell.value[0]}`
            : `http://localhost:3000/uploads/dummyImage.jpg`;
        return (
          <DialogDiv
            row={row}
            imageUrl={imageUrl}
            selectedDialog={selectedDialog}
            setSelectedDialog={setSelectedDialog}
          />
        );
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

  // Delete report
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
          dispatch(setFilteredReport(filtered));
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
            data={month ? filteredReport : reportWithImage}
          />

          <CSV exportCSV={"Export CSV"} />
        </Card>
      </div>
    </>
  );
};
export default Reports;
