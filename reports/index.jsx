import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CompanyTable from "@/components/partials/Table/company-table";
import profileImage from "../../assets/images/avatar/dummyImage.jpg";
import {
  getReports,
  handleDeleteReport,
  setFilteredReport,
  setMonth,
  setReportWithImage,
} from "./store/reportSlice";
import { getImages, setOpen, setSelectedDialog } from "./store/imageSlice";

import Swal from "sweetalert2/dist/sweetalert2";
import Loading from "../../components/Loading";
import { Label } from "recharts";
import CSV from "../../components/ui/CSV";
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
  const { reportImages, open, selectedDialog } = useSelector(
    (state) => state.reportImages
  );

  useEffect(() => {
    dispatch(setMonth(null));
    dispatch(getReports());
    dispatch(getImages());
  }, []);

  useEffect(() => {
    const reportWithImage = reportData.map((report) => ({
      ...report,
      imageUrls: reportImages
        .filter((img) => img.reportCategoryId === report.id)
        .sort((a, b) => a.order - b.order)
        .map((img) => img.url),
      images: reportImages
        .filter((img) => img.reportCategoryId === report.id)
        .sort((a, b) => a.order - b.order),
    }));

    dispatch(setReportWithImage(reportWithImage));
  }, [reportData, reportImages]);

  // console.log(`reportData: `, reportData);
  // console.log(`reportImage: `, reportImages);
  // console.log(`Report With Image: `, reportWithImage);

  // console.log(`reportImages: `, reportImages);

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
      });
      return () => clearTimeout(timeoutId);
    } else {
      dispatch(getReports());
    }
  }, [month]);

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
        const imageUrl = row?.cell?.value[0]
          ? `http://localhost:3000/uploads/${row.cell.value[0]}`
          : `http://localhost:3000/uploads/dummyImage.jpg`;
        return (
          <span className="flex items-center">
            <span className="w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
              {!imageUrl.includes("dummyImage.jpg") ? (
                <button
                  onClick={() => {
                    // console.log(`Row clicked: `, row.row.original.id); // Example: 43, 48, ...
                    // return dispatch(setOpen(true));
                    return dispatch(setSelectedDialog(row.row.original.id));
                  }}
                >
                  <img
                    src={imageUrl}
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                  />
                </button>
              ) : (
                <img
                  src={imageUrl}
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                />
              )}
              <Dialog
                className=""
                open={selectedDialog === row.row.original.id}
                onClose={() => dispatch(setSelectedDialog(null))}
                sx={{
                  "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                      width: "100%",
                      maxWidth: "800px", // Set your width here
                    },
                  },
                }}
              >
                <DialogTitle>{row.row.original.name}</DialogTitle>
                <DialogContent className="grid grid-cols-2 gap-4 ">
                  {row.cell.value.map((imgUrl) => (
                    <div className="">
                      <img
                        src={`http://localhost:3000/uploads/${imgUrl}`}
                        alt=""
                        className="object-cover w-full rounded-lg"
                      />
                    </div>
                  ))}
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => dispatch(setSelectedDialog(null))}
                    color="secondary"
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </span>
          </span>
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
  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          // exportCSV={"Export CSV"}
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
