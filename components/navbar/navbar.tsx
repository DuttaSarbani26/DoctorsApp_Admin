"use client";

import * as React from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { useSidebar } from "../sidebar/sidebar";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 270;

export default function Navbar() {
  const { tokens } = useThemeContext();
  const { mobileOpen, setMobileOpen } = useSidebar();

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
        ml: { xs: 0, md: `${drawerWidth}px` },
        width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
        background: "transparent",
        backdropFilter: "none",
        boxShadow: "none",
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: { xs: 70, md: 90 },
          px: { xs: 1.5, md: 3 },
          gap: 1,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {setMobileOpen && (
            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ display: { xs: "flex", md: "none" }, color: tokens.text }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box display="flex" flexDirection="column" gap={0.3}>
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <Typography
                sx={{
                  fontSize: { xs: 13, sm: 16, md: 22 },
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
                  fontSize: { xs: 13, sm: 16, md: 22 },
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: tokens.accent,
                }}
              >
                Admin
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.8} flexWrap="wrap">
              <Typography
                sx={{
                  fontSize: { xs: 10, sm: 11, md: 13 },
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  background: `linear-gradient(135deg, ${tokens.textSecondary} 0%, ${tokens.accent} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Here&apos;s what&apos;s happening today
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 9, sm: 10, md: 12 },
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  color: tokens.textMuted,
                  display: { xs: "none", sm: "block" },
                }}
              >
                &mdash; {dateStr}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={{ xs: 1, md: 1.5 }}>
          <Avatar
            sx={{
              width: { xs: 32, md: 38 },
              height: { xs: 32, md: 38 },
              background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
              fontWeight: 700,
              fontSize: { xs: 12, md: 14 },
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
