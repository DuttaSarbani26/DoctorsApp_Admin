"use client";

import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { Box } from "@mui/material";
import { useThemeContext } from "@/context/ThemeContext";

const drawerWidth = 270;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tokens } = useThemeContext();

  return (
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
            mt: "90px",
            p: { xs: 2, md: 2.5 },
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
  );
}
