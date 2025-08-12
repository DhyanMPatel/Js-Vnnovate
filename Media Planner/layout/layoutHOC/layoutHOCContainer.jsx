import { useMediaQuery, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutHOCView from "./layoutHOCView";

const LayoutHOCContainer = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      handleToggleSidebar();
    }
  }, [location.pathname]);

  const handleToggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }

    if (propOnToggleSidebar) {
      propOnToggleSidebar();
    }
  }, [isMobile, isCollapsed]);

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <LayoutHOCView
      isSidebarOpen={isSidebarOpen}
      isMobile={isMobile}
      handleToggleSidebar={handleToggleSidebar}
      handleItemClick={handleItemClick}
      children={children}
      theme={theme}
      isCollapsed={isCollapsed}
    />
  );
};

export default LayoutHOCContainer;
