import { useEffect, useState } from "react";

import { Button, Skeleton } from "antd";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { BiSolidGridAlt } from "react-icons/bi";
import { RiFullscreenExitLine, RiFullscreenLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import BreadcrumbCustom from "./BreadcrumbCustom";

function Header({ data, loading }) {
  useEffect(() => window.scrollTo(0, 0));
  const isLogged = localStorage.getItem("isLogged");
  const user = localStorage.getItem("user");
  const [isDarkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [fullScreen, setFullScreen] = useState(false);
  const [imageError, setImageError] = useState();

  const element = document.documentElement;

  const handleFullScreenClick = () => {
    setFullScreen(true);
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  const handleExitFullScreenClick = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    if (isDarkMode) document.body.className = "dark-theme dark";
    if (!isDarkMode) document.body.className = "light-theme light";
  }, [isDarkMode]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
      } else {
        setFullScreen(false);
      }
    });
  }, []);
  return (
    <>
      <div className="sticky top-0 z-10 flex w-full justify-between items-center py-2 pl-4 bg-headerBg dark:bg-[#1C1B20] border-b md:border-none">
        <div className="relative flex items-center">
          {isLogged && <BreadcrumbCustom />}
          <div className="md:hidden">
            <Skeleton loading={loading}>
              {data?.logo && !imageError ? (
                <img
                  className="text-white text-center mt-2 mb-1  "
                  alt="logo"
                  src={data.logo}
                  style={{ width: "180PX", height: "70px" }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <h2
                  className="text-gray-300 text-center mt-2 mb-1 flex items-center justify-center gap-2"
                  style={{ fontSize: "25px" }}
                >
                  POS
                  <strong style={{ color: "#55F	", fontWeight: "bold" }}>
                    OS
                  </strong>
                </h2>
              )}
            </Skeleton>
          </div>
        </div>

        <div className="flex items-center mr-[1rem] gap-1 md:gap-4">
          <button
            onClick={() => navigate("/admin/pos")}
            className="hidden md:flex bg-primary py-1 px-2 text-white items-center gap-1"
          >
            <BiSolidGridAlt size={20} /> <span>POS</span>
          </button>
          {isLogged && (
            <div>
              {fullScreen ? (
                <RiFullscreenExitLine
                  onClick={handleExitFullScreenClick}
                  size={22}
                  className="cursor-pointer dark:text-white"
                />
              ) : (
                <RiFullscreenLine
                  onClick={handleFullScreenClick}
                  size={22}
                  className="cursor-pointer dark:text-white"
                />
              )}
            </div>
          )}

          {isLogged && (
            <span className="pb-1 relative group">
              <UserOutlined className="text-xl" />
              <div className="hidden z-[9999] absolute -right-3  p-2 group-hover:block w-[200px]">
                <div className="bg-white shadow-lg select-none  p-1  min-w-[150px] rounded-lg">
                  <p className="flex items-center gap-1  px-3 py-2  hover:bg-slate-200 rounded-lg">
                    <UserOutlined style={{ fontSize: "16px" }} />{" "}
                    <span className="logout-text uppercase font-weight-bold me-2 ms-1">
                      {user}
                    </span>
                  </p>
                  <Link
                    to="/admin/auth/logout"
                    className="flex items-center gap-1 px-3 py-2 hover:bg-slate-200 rounded-lg"
                  >
                    <LogoutOutlined className=" text-red-500" />
                    <span className="logout-text font-weight-bold">
                      Log Out
                    </span>
                  </Link>
                </div>
              </div>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
