import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsDownloading } from "../../pages/reports/store/downloadSlice";
import Axios from "../../services/api";
import { toast } from "react-toastify";
import { downloadCSV } from "../../pages/reports/store/downloadSlice";

const DownloadCSV = () => {
  const dispatch = useDispatch();

  const { isDownloading } = useSelector((state) => state.downloadCsv);

  // Handle downloaded CSV
  const handleDownloadCsv = async () => {
    try {
      const response = await Axios.get("report/download-csv", {
        responseType: "blob",
        headers: {
          "Content-Type": "text/csv",
        },
      });

      if (!response.data) {
        toast.error("Failed to Download CSV!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      const blob = await response.data;
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Failed to Download CSV", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      dispatch(setIsDownloading(false));
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn btn-primary flex gap-2 justify-center"
          onClick={handleDownloadCsv}
          disabled={isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download CSV"}
          <Icon icon="heroicons-outline:arrow-down-tray" width="20px" />
        </button>
      </div>
    </>
  );
};

export default DownloadCSV;
