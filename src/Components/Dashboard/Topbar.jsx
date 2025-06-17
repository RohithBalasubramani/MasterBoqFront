import React from "react";
import styled, { useTheme } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

/* ───────── top-bar shell ───────── */
const Bar = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.spacing(1.5)} ${(p) => p.theme.spacing(3)};
  margin-bottom: ${(p) => p.theme.spacing(3)};
  border-radius: 0;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  background: ${(p) => p.theme.palette.background.paper};
`;

export default function TopBar({
  user = "User",
  onToggleTheme,
  mode = "light",
  onLogout,
}) {
  const theme = useTheme();

  // re-use your “frosted-glass” gradient
  const gradient = `linear-gradient(135deg,
    ${theme.palette.background.paper} 0%,
    ${theme.palette.background.default} 100%)`;

  return (
    <Bar elevation={0}>
      {/* title */}
      <Typography
        variant="h6"
        noWrap
        sx={{ fontWeight: 600, letterSpacing: 0.3 }}
      >
        <img
          src={require("../../Assets/LOGO.png")}
          alt="BOQ Master Logo"
          style={{ height: 38, verticalAlign: "middle", marginRight: 8 }}
        />
        {/* <Image
          src="https://www.boqmaster.com/assets/images/boqmaster-logo.png"   
          /> */}
        BOQ&nbsp;Master
      </Typography>

      {/* controls */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {/* ← updated button */}
        <Button
          component={RouterLink}
          to="/listing"
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 1.5,
            color: "#ffffff",
            background: "#273655",
            // optional: reverse gradient on hover
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          Create&nbsp;New&nbsp;BOQ
        </Button>

        {/* bell */}
        <IconButton
          size="small"
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            width: 36,
            height: 36,
          }}
        >
          <NotificationsNoneIcon fontSize="small" />
        </IconButton>

        {/* theme toggle */}
        <IconButton size="small" onClick={onToggleTheme}>
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* user menu */}
        <Button
          onClick={onLogout}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 1,
            paddingX: 1,
            gap: 1,
            minHeight: 36,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#09193D",
              width: 28,
              height: 28,
              fontSize: 14,
            }}
          >
            {user[0].toUpperCase()}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Hi,&nbsp;{user}
          </Typography>
          <KeyboardArrowDownIcon fontSize="small" />
        </Button>
      </Box>
    </Bar>
  );
}
