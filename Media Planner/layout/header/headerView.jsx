import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import "./headerStyle.scss";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: theme.palette.text.primary,
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  height: "64px",
  display: "flex",
  justifyContent: "center",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: "64px",
  padding: "0 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "0 12px",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  backgroundColor: "#f5f7fa",
  marginLeft: theme.spacing(2),
  width: "300px",
  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  [theme.breakpoints.down("sm")]: {
    width: "200px",
    marginLeft: theme.spacing(1),
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.secondary,
  width: "100%",
  padding: "8px 0",
  "& .MuiInputBase-input": {
    padding: "0 8px",
    fontSize: "0.875rem",
  },
}));

const HeaderView = ({
  onMenuClick,
  onNotificationClick,
  onLanguageClick,
  onProfileClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar disableGutters>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            sx={{
              marginRight: "12px",
              color: theme.palette.text.primary,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            onClick={onNotificationClick}
            sx={{
              margin: "0 8px",
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.primary.main,
              },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              variant="dot"
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  top: 6,
                  right: 6,
                },
              }}
            >
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </IconButton>

          <Button
            color="inherit"
            onClick={handleLanguageMenuOpen}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              textTransform: "none",
              color: theme.palette.text.primary,
              margin: "0 8px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <LanguageIcon sx={{ marginRight: "8px", fontSize: "1.2rem" }} />
            <Typography
              variant="body2"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              English
            </Typography>
          </Button>

          <Button
            color="inherit"
            onClick={handleProfileMenuOpen}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              textTransform: "none",
              color: theme.palette.text.primary,
              marginLeft: "8px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Avatar
              alt="Admin User"
              sx={{
                width: 32,
                height: 32,
                marginRight: "8px",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              AU
            </Avatar>
            <Box
              sx={{ textAlign: "left", display: { xs: "none", sm: "block" } }}
            >
              <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                Moni Roy
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Admin
              </Typography>
            </Box>
          </Button>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            style: {
              width: 200,
              marginTop: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ color: "error.main" }}>
              Logout
            </ListItemText>
          </MenuItem>
        </Menu>

        {/* Language Menu */}
        <Menu
          anchorEl={languageAnchorEl}
          open={Boolean(languageAnchorEl)}
          onClose={handleLanguageMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            style: {
              width: 150,
              marginTop: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          }}
        >
          <MenuItem onClick={handleLanguageMenuClose}>English</MenuItem>
          <MenuItem onClick={handleLanguageMenuClose}>Español</MenuItem>
          <MenuItem onClick={handleLanguageMenuClose}>Français</MenuItem>
          <MenuItem onClick={handleLanguageMenuClose}>Deutsch</MenuItem>
        </Menu>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default HeaderView;
