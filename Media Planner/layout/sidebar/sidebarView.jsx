import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import "./sidebarStyle.scss";

const getIcon = (iconName, isSelected = false) => {
  const iconStyle = {
    fontSize: "1.25rem",
    color: isSelected ? "#ffffff" : "inherit",
  };

  switch (iconName) {
    case "dashboard":
      return <DashboardOutlinedIcon style={iconStyle} />;
    case "people":
      return <PeopleAltOutlinedIcon style={iconStyle} />;
    case "campaign":
      return <CampaignOutlinedIcon style={iconStyle} />;
    case "assessment":
      return <AccountBalanceWalletOutlinedIcon style={iconStyle} />;
    case "analytics":
      return <AssessmentOutlinedIcon style={iconStyle} />;
    case "settings":
      return <SettingsOutlinedIcon style={iconStyle} />;
    case "logout":
      return <LogoutOutlinedIcon style={iconStyle} />;
    default:
      return null;
  }
};

const SidebarView = ({
  isCollapsed,
  handleToggleSidebar,
  selectedItem,
  menuItems = [],
  isMobile,
  handleItemClick,
  isSidebarOpen,
  theme,
}) => {
  const mainMenuItems = menuItems.filter(
    (item) => !["Settings", "Logout"].includes(item.text)
  );

  const footerMenuItems = menuItems.filter((item) =>
    ["Settings", "Logout"].includes(item.text)
  );

  const renderMenuItems = (items) => (
    <List>
      {items.map((item, index) => {
        const isSelected = selectedItem?.path === item.path;
        return (
          <ListItem
            key={index}
            disablePadding
            className={isSelected ? "Mui-selected" : ""}
            onClick={() => handleItemClick(item)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isCollapsed ? "center" : "flex-start",
                px: 2.5,
              }}
            >
              <ListItemIcon>
                {getIcon(item.icon, isSelected)}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: isCollapsed ? 0 : 1,
                  color: isSelected ? "primary.main" : "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      sx={{
        "& .MuiDrawer-paper": {
          width: isCollapsed ? "72px" : "280px",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
      open={isMobile ? isSidebarOpen : true}
      onClose={handleToggleSidebar}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
    >
      <Toolbar className={`${isMobile ? "sidebar-toolbar" : ""}`}>
        <div className="logo-container">
          {isCollapsed ? (
            <div className="logo">MP</div>
          ) : (
            <span className="logo-text">
              <span className="logo-text-highlight">Media</span> Planner
            </span>
          )}
        </div>
        {isMobile && (
          <IconButton
            onClick={handleToggleSidebar}
            size="small"
            sx={{
              color: "#94a3b8",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Toolbar>
      <div className="menu-container">
        <div className="menu-items">{renderMenuItems(mainMenuItems)}</div>
      </div>

      <Divider sx={{ my: 2 }} />
      <List sx={{ mt: "auto" }}>
        {footerMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={selectedItem === item.text}
            onClick={() => onItemClick(item.text)}
            sx={{
              minHeight: 48,
              justifyContent: isCollapsed ? "center" : "flex-start",
              px: 2.5,
              borderRadius: "8px",
              mx: 1,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              },
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? "auto" : 3,
                justifyContent: "center",
                color: selectedItem === item.text ? "#ffffff" : "inherit",
              }}
            >
              {getIcon(item.icon)}
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: selectedItem === item.text ? "medium" : "regular",
                  color: selectedItem === item.text ? "#ffffff" : "inherit",
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarView;
