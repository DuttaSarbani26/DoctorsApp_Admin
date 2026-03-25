"use client";

import { useEffect } from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GroupsIcon from "@mui/icons-material/Groups";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useSelector, useDispatch } from "react-redux";
import { useThemeContext } from "@/context/ThemeContext";
import { AppDispatch } from "@/redux/store/store";
import { getDepartmentList, doctorList as getDoctorList } from "@/redux/slice/doctorSlice";
import { appointmentList as getAppointmentList } from "@/redux/slice/appointmentSlice";

export default function DashboardStat() {
  const dispatch = useDispatch<AppDispatch>();
  const { departmentList, doctorList } = useSelector(
    (state: any) => state.doctor
  );
  const { appointmentList } = useSelector(
    (state: any) => state.appointment
  );
  const { tokens, mode } = useThemeContext();

  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getDoctorList({}));
    dispatch(getAppointmentList());
  }, [dispatch]);

  const stats = {
    doctors: doctorList?.length || 0,
    departments: departmentList?.length || 0,
    appointments: appointmentList?.length || 0,
  };

  const cards = [
    {
      label: "Total Doctors",
      value: stats.doctors,
      icon: <GroupsIcon sx={{ fontSize: 26 }} />,
      gradient: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
      lightBg: "rgba(124, 58, 237, 0.08)",
      darkBg: "rgba(124, 58, 237, 0.12)",
      iconColor: "#7c3aed",
      trend: "+12%",
    },
    {
      label: "Departments",
      value: stats.departments,
      icon: <LocalHospitalIcon sx={{ fontSize: 26 }} />,
      gradient: "linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)",
      lightBg: "rgba(225, 29, 72, 0.08)",
      darkBg: "rgba(225, 29, 72, 0.12)",
      iconColor: "#e11d48",
      trend: "+5%",
    },
    {
      label: "Appointments",
      value: stats.appointments,
      icon: <EventNoteIcon sx={{ fontSize: 26 }} />,
      gradient: "linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)",
      lightBg: "rgba(8, 145, 178, 0.08)",
      darkBg: "rgba(8, 145, 178, 0.12)",
      iconColor: "#0891b2",
      trend: "+18%",
    },
  ];

  return (
    <Grid container spacing={2.5}>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: `1px solid ${tokens.cardBorder}`,
              background: tokens.cardBg,
              backdropFilter: tokens.glassBlur,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: tokens.cardHoverShadow,
                borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
              },
            }}
          >
            {/* Gradient accent bar */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: card.gradient,
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography
                  sx={{
                    color: tokens.textMuted,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontSize: 12,
                    mb: 0.8,
                  }}
                >
                  {card.label}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 800,
                    color: tokens.text,
                    fontSize: 34,
                    lineHeight: 1,
                    mb: 1,
                  }}
                >
                  {card.value}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TrendingUpIcon sx={{ fontSize: 14, color: "#22c55e" }} />
                  <Typography sx={{ color: "#22c55e", fontWeight: 700, fontSize: 12.5 }}>
                    {card.trend}
                  </Typography>
                  <Typography sx={{ color: tokens.textMuted, fontSize: 11.5, ml: 0.3 }}>
                    this month
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2.5,
                  background: mode === "dark" ? card.darkBg : card.lightBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: card.iconColor,
                }}
              >
                {card.icon}
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}