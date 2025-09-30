import React from "react";
import HeaderView from "./headerView";

const HeaderContainer = ({ handleToggleSidebar, isCollapsed, isMobile }) => {
  const handleNotificationClick = () => {
    // console.log("Notifications clicked");
  };

  const handleLanguageClick = () => {
    // console.log("Language clicked");
  };

  const handleProfileClick = () => {
    // console.log("Profile clicked");
  };

  return (
    <HeaderView
      onMenuClick={handleToggleSidebar}
      onNotificationClick={handleNotificationClick}
      onLanguageClick={handleLanguageClick}
      onProfileClick={handleProfileClick}
      isCollapsed={isCollapsed}
      isMobile={isMobile}
    />
  );
};

export default HeaderContainer;
