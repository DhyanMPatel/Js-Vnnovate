import React from "react";
import SidebarView from "./sidebarView";
import { useLocation } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: "dashboard", path: "dashboard" },
  { text: "User Management", icon: "people", path: "user-management" },
  {
    text: "Campaign Management",
    icon: "campaign",
    path: "campaign-management",
  },
  { text: "Finance & Sage", icon: "assessment", path: "finance-sage" },
  {
    text: "Reports & Analytics",
    icon: "analytics",
    path: "reports-analytics",
  },
  { text: "Settings", icon: "settings", path: "settings" },
  { text: "Logout", icon: "logout", path: "logout" },
];

const SidebarContainer = ({
  isCollapsed,
  handleToggleSidebar,
  handleItemClick,
  isMobile,
  isSidebarOpen,
  theme,
}) => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1] || "dashboard";

  // Find the currently selected item based on the current path
  const selectedItem =
    menuItems.find((item) => item.path === currentPath) || menuItems[0];
  return (
    <SidebarView
      isCollapsed={isCollapsed}
      handleToggleSidebar={handleToggleSidebar}
      selectedItem={selectedItem}
      menuItems={menuItems}
      isMobile={isMobile}
      handleItemClick={handleItemClick}
      isSidebarOpen={isSidebarOpen}
      theme={theme}
    />
  );
};

export default SidebarContainer;
