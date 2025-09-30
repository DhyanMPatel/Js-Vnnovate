import { Box, CssBaseline, styled } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import HeaderContainer from "../header/headerContainer";
import SidebarContainer from "../sidebar/sidebarContainer";

const drawerWidth = 280;
const collapsedWidth = 72;
const headerHeight = "64px";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "isCollapsed",
})(({ theme, isCollapsed }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: headerHeight,
  width: `calc(100vw - ${isCollapsed ? collapsedWidth : drawerWidth}px)`,
  minHeight: `calc(100vh - ${headerHeight})`,
  overflow: "auto",
  backgroundColor: "#F8FAFC",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    width: "100vw",
    padding: theme.spacing(2),
  },
}));

const SidebarWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isCollapsed",
})(({ theme, isCollapsed }) => ({
  width: isCollapsed ? "72px" : "280px",
  flexShrink: 0,
  whiteSpace: "nowrap",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const HeaderWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isCollapsed",
})(({ theme, isCollapsed }) => ({
  position: "fixed",
  width: `calc(100% - ${isCollapsed ? collapsedWidth : drawerWidth}px)`,
  height: headerHeight,
  left: isCollapsed ? collapsedWidth : drawerWidth,
  top: 0,
  zIndex: 1100,
  backgroundColor: "#FFFFFF",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  borderBottom: "1px solid #E2E8F0",
  transition: theme.transitions.create(["width", "left"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down("md")]: {
    left: 0,
    width: "100%",
  },
}));

const LayoutHOCView = ({
  isSidebarOpen = false,
  isMobile,
  handleItemClick = () => {},
  isCollapsed,
  handleToggleSidebar,
  theme,
}) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Sidebar */}
      <SidebarWrapper isCollapsed={isCollapsed && !isMobile}>
        <SidebarContainer
          isCollapsed={isCollapsed && !isMobile}
          handleToggleSidebar={handleToggleSidebar}
          handleItemClick={handleItemClick}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          theme={theme}
        />
      </SidebarWrapper>

      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1199,
          }}
          onClick={handleToggleSidebar}
        />
      )}

      {/* Header */}
      <HeaderWrapper isCollapsed={isCollapsed && !isMobile}>
        <HeaderContainer
          handleToggleSidebar={handleToggleSidebar}
          isCollapsed={isCollapsed && !isMobile}
          isMobile={isMobile}
          theme={theme}
        />
      </HeaderWrapper>

      {/* Main Content */}
      <Main isCollapsed={isCollapsed && !isMobile}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default LayoutHOCView;
