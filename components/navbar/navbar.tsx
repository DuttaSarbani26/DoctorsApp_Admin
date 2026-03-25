"use client";

import * as React from "react";
import { useThemeContext } from "@/context/ThemeContext";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const drawerWidth = 270;

export default function Navbar() {
  const { tokens } = useThemeContext();

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: `${drawerWidth}px`,
        width: `calc(100% - ${drawerWidth}px)`,
        background: "transparent",
        backdropFilter: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 90,
          px: 3,
        }}
      >
        {/* LEFT */}
        <Box display="flex" flexDirection="column" gap={0.3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                background: `linear-gradient(135deg, ${tokens.text} 0%, ${tokens.accent} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome back,
            </Typography>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: tokens.accent,
              }}
            >
              Admin
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.8}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.01em",
                background: `linear-gradient(135deg, ${tokens.textSecondary} 0%, ${tokens.accent} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Here&apos;s what&apos;s happening at your hospital today
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.03em",
                color: tokens.textMuted,
              }}
            >
              &mdash; {dateStr}
            </Typography>
          </Box>
        </Box>

        {/* RIGHT */}
        <Box display="flex" alignItems="center" gap={1.5}>
          {/* <IconButton
            sx={{
              background: tokens.cardBg,
              border: `1px solid ${tokens.border}`,
              backdropFilter: tokens.glassBlur,
              "&:hover": { background: tokens.bgElevated },
            }}
          >
            <Badge badgeContent={3} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 18, height: 18 } }}>
              <NotificationsIcon sx={{ color: tokens.textSecondary, fontSize: 20 }} />
            </Badge>
          </IconButton> */}

          <Avatar
            sx={{
              width: 38,
              height: 38,
              background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}










