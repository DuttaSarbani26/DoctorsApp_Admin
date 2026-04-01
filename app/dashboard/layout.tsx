"use client";

import Navbar from "@/components/navbar/navbar";
import Sidebar, { SidebarContext } from "@/components/sidebar/sidebar";
import { Box } from "@mui/material";
import { useThemeContext } from "@/context/ThemeContext";
import { useState } from "react";

const drawerWidth = 270;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tokens } = useThemeContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ mobileOpen, setMobileOpen }}>
      <Box sx={{
        display: "flex",
        minHeight: "100vh",
        background: tokens.bg,
        transition: "background 0.3s ease",
        overflow: "hidden",
      }}>
        <Sidebar />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Navbar />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              mt: { xs: "70px", md: "90px" },
              p: { xs: 1.5, sm: 2, md: 2.5 },
              overflowY: "auto",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
}
