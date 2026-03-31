"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";

import {
  Box,
  Drawer,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
  Switch,
  Stack,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GroupsIcon from "@mui/icons-material/Groups";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Swal from "sweetalert2";

const drawerWidth = 270;

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  {
    label: "Departments",
    path: "/dashboard/departmentList",
    icon: <LocalHospitalIcon />,
  },
  { label: "Doctors", path: "/dashboard/doctors", icon: <GroupsIcon /> },
  {
    label: "Appointments",
    path: "/dashboard/appointment",
    icon: <EventNoteIcon />,
  },
  { label: "Location", path: "/dashboard/location", icon: <LocationOnIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { tokens, mode, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the admin panel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          background: tokens.sidebarBg,
          backdropFilter: tokens.sidebarGlass,
          borderRight: `1px solid ${tokens.border}`,
        },
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
          py: 4,
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          component="img"
          src="/flower-icon.png"
          alt="logo"
          sx={{
            width: 48,
            height: 48,
            filter: "brightness(0) invert(1)",
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontFamily: "serif",
            fontWeight: 600,
            letterSpacing: 1,
            color: "#fff",
          }}
        >
          Soulbless
        </Typography>
        <Typography
          variant="caption"
          sx={{
            letterSpacing: 4,
            fontSize: 10,
            color: "rgba(255,255,255,0.7)",
            textTransform: "uppercase",
          }}
        >
          General Hospital
        </Typography>
      </Box>

      <Box sx={{ px: 2, mt: 3, flex: 1 }}>
        <Typography
          variant="overline"
          sx={{
            px: 1.5,
            color: tokens.textMuted,
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: 1.5,
          }}
        >
          Main Menu
        </Typography>

        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => {
            const active = pathname === item.path;

            return (
              <ListItemButton
                key={item.label}
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: 2.5,
                  mb: 0.5,
                  py: 1.2,
                  px: 2,
                  background: active
                    ? "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)"
                    : "transparent",
                  color: active ? "#fff" : tokens.textSecondary,
                  boxShadow: active
                    ? "0 4px 15px rgba(124,58,237,0.3)"
                    : "none",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: active
                      ? "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)"
                      : tokens.accentGlow,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? "#fff" : tokens.textMuted,
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active ? 700 : 500,
                    fontSize: 14,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Box sx={{ px: 2, mb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.2,
            borderRadius: 2.5,
            background: tokens.cardBg,
            backdropFilter: tokens.glassBlur,
            border: `1px solid ${tokens.border}`,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            {mode === "dark" ? (
              <DarkModeIcon sx={{ fontSize: 18, color: tokens.accentLight }} />
            ) : (
              <LightModeIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
            )}
            <Typography fontSize={13} fontWeight={600} color={tokens.text}>
              {mode === "dark" ? "Dark Mode" : "Light Mode"}
            </Typography>
          </Stack>
          <Switch
            checked={mode === "dark"}
            onChange={toggleTheme}
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#7c3aed",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#7c3aed",
              },
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ mx: 2, borderColor: tokens.border }} />

      <Box
        sx={{
          p: 2,
          mx: 1,
          mb: 1,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderRadius: 3,
          background: tokens.cardBg,
          backdropFilter: tokens.glassBlur,
          border: `1px solid ${tokens.border}`,
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          A
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography fontSize={13} fontWeight={700} color={tokens.text}>
            Admin Portal
          </Typography>
          <Typography fontSize={11} color={tokens.textMuted}>
            admin@gmail.com
          </Typography>
        </Box>
        <IconButton
          onClick={handleLogout}
          size="small"
          sx={{
            color: "#f43f5e",
            "&:hover": { background: "rgba(244,63,94,0.1)" },
          }}
        >
          <LogoutIcon fontSize="small" />
        </IconButton>
      </Box>
    </Drawer>
  );
}
