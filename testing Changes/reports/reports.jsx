import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import CompanyTable from "@/components/partials/Table/company-table";
import Loading from "../../components/Loading";
import CSV from "../../components/ui/CSV";
import {
  getReports,
  handleDeleteReport,
  setFilteredReport,
  setMonth,
  setReportWithImage,
} from "./store/reportSlice";
import { getImages, setOpen, setSelectedDialog } from "./store/imageSlice";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Reports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reportData, isLoading, month, filteredReport, reportWithImage } =
    useSelector((state) => state.report);
  const { reportImages, selectedDialog } = useSelector(
    (state) => state.reportImages
  );

  useEffect(() => {
    dispatch(setMonth(null));
    dispatch(getReports());
    dispatch(getImages());
  }, [dispatch]);

  useEffect(() => {
    const reportWithImage = reportData.map((report) => ({
      ...report,
      images: reportImages
        .filter((img) => img.reportCategoryId === report.id)
        .sort((a, b) => a.order - b.order),
    }));
    dispatch(setReportWithImage(reportWithImage));
  }, [reportData, reportImages, dispatch]);

  useEffect(() => {
    if (month) {
      const filtered = reportWithImage.filter((report) => {
        const reportDate = new Date(report.createdAt);
        return !isNaN(reportDate) && reportDate.getMonth() + 1 === Number(month);
      });
      dispatch(setFilteredReport(filtered));
    } else {
      dispatch(getReports());
    }
  }, [month, reportWithImage, dispatch]);

  const deleteReport = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0783F6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await dispatch(handleDeleteReport(id)).unwrap();
        if (response.success) {
          dispatch(getReports());
        } else {
          toast.error(response.message);
        }
      }
    });
  };

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Images",
      accessor: "images",
      Cell: ({ row }) => (
        <img
          src={
            row.original.images.length > 0
              ? `http://localhost:3000/uploads/${row.original.images[0].url}`
              : "http://localhost:3000/uploads/dummyImage.jpg"
          }
          alt="Report"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => dispatch(setSelectedDialog(row.original.id))}
        />
      ),
    },
    {
      Header: "Actions",
      accessor: "id",
      Cell: ({ row }) => (
        <div className="flex gap-4">
          <Icon
            icon="heroicons-outline:trash"
            className="text-red-500 cursor-pointer"
            onClick={() => deleteReport(row.original.id)}
          />
          <Icon
            icon="heroicons:pencil-square"
            className="cursor-pointer"
            onClick={() => navigate(`/edit-report/${row.original.id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Loading isLoading={isLoading} />
      <Card title="Reports" buttonTitle="Add Report" buttonLink="/add-report">
        <CompanyTable
          columns={COLUMNS}
          data={month ? filteredReport : reportWithImage}
        />
        <CSV exportCSV="Export CSV" />
      </Card>
    </>
  );
};

export default Reports;
