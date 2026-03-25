"use client";

import DashboardStat from "@/components/dashboardStat/dashboardStat";

import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Grid,
  Stack,
  Skeleton,
  Button,
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import AppointmentCalendar from "@/components/appointment/appointmentCalender/appointmentCalender";
import dayjs from "dayjs";
import { appointmentAcceptedList } from "@/redux/slice/appointmentSlice";
import { useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

export default function DashboardPage() {
  const { departmentList, doctorList, loading } = useSelector(
    (state: any) => state.doctor
  );
  const { appointmentAcceptList } = useSelector(
    (state: any) => state.appointment
  );

  const router = useRouter();
  const { tokens, mode } = useThemeContext();
  const dispatch = useDispatch();

  // Fetch accepted appointments
  useEffect(() => {
    dispatch(appointmentAcceptedList() as any);
  }, [dispatch]);

  // Upcoming 7 days accepted appointments
  const today = dayjs().startOf("day");
  const next7 = today.add(7, "day");
  const upcoming7Days = appointmentAcceptList
    ?.filter((appt: any) => {
      const d = dayjs(appt.date);
      return d.isAfter(today.subtract(1, "day")) && d.isBefore(next7);
    })
    ?.sort((a: any, b: any) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
    ?.slice(0, 6) || [];

  const deptColors = [
    { gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)", bg: mode === "dark" ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0.08)" },
    { gradient: "linear-gradient(135deg, #e11d48, #f43f5e)", bg: mode === "dark" ? "rgba(225,29,72,0.12)" : "rgba(225,29,72,0.08)" },
    { gradient: "linear-gradient(135deg, #0891b2, #22d3ee)", bg: mode === "dark" ? "rgba(8,145,178,0.12)" : "rgba(8,145,178,0.08)" },
    { gradient: "linear-gradient(135deg, #ea580c, #fb923c)", bg: mode === "dark" ? "rgba(234,88,12,0.12)" : "rgba(234,88,12,0.08)" },
    { gradient: "linear-gradient(135deg, #16a34a, #4ade80)", bg: mode === "dark" ? "rgba(22,163,74,0.12)" : "rgba(22,163,74,0.08)" },
    { gradient: "linear-gradient(135deg, #ca8a04, #facc15)", bg: mode === "dark" ? "rgba(202,138,4,0.12)" : "rgba(202,138,4,0.08)" },
  ];

  const monthlyPerformance = (() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const m = today.subtract(5 - i, "month");
      return {
        key: m.format("YYYY-MM"),
        month: m.format("MMM"),
        count: 0,
      };
    });

    const monthIndex = months.reduce((acc, item, idx) => {
      acc[item.key] = idx;
      return acc;
    }, {} as Record<string, number>);

    appointmentAcceptList?.forEach((appt: any) => {
      const key = dayjs(appt.date).format("YYYY-MM");
      if (key in monthIndex) {
        months[monthIndex[key]].count += 1;
      }
    });

    return months;
  })();

  const getDoctorName = (appt: any) => {
    return (
      appt?.doctorId?.name ||
      appt?.doctorName ||
      appt?.doctor?.name ||
      appt?.doctorName?.name ||
      appt?.doctorId?.doctorName ||
      "Unknown"
    );
  };

  return (
    <Box sx={{ fontSize: 15 }}>
      {/* Stats */}
      <DashboardStat />

      {/* Main Content */}
      <Grid container spacing={3} sx={{ mt: 0.5, alignItems: "stretch" }}>

        {/* Recent Doctors */}
        <Grid size={{ xs: 12, lg: 6 }} sx={{ minHeight: 410, maxHeight: 460, overflow: "hidden" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${tokens.cardBorder}`,
              overflow: "hidden",
              background: tokens.cardBg,
              backdropFilter: tokens.glassBlur,
              minHeight: 410,
              maxHeight: 460,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${tokens.border}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Box
                  sx={{
                    width: 30,
                    height: 60,
                    borderRadius: 1.5,
                    background: mode === "dark" ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GroupsIcon sx={{ color: "#7c3aed", fontSize: 16 }} />
                </Box>
                <Box>
                  <Typography fontWeight={700} fontSize={16} color={tokens.text} lineHeight={1.2}>
                    Recent Doctors
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: tokens.textMuted }}>
                    {doctorList?.length || 0} total
                  </Typography>
                </Box>
              </Box>

              <Button
                size="small"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 12 }} />}
                onClick={() => router.push("/dashboard/doctors")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 13,
                  color: tokens.accent,
                  borderRadius: 2,
                  px: 1,
                  minWidth: 0,
                  "&:hover": { background: tokens.accentGlow },
                }}
              >
                View All
              </Button>
            </Box>

            {/* Body */}
            <Box sx={{ p: 1 }}>
              {loading ? (
                <Stack spacing={0.5}>
                  {[1, 2, 3].map((i) => (
                    <Box key={i} sx={{ display: "flex", gap: 1, p: 1 }}>
                      <Skeleton variant="circular" width={32} height={32} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton width="50%" height={14} />
                        <Skeleton width="30%" height={12} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              ) : doctorList?.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <GroupsIcon sx={{ fontSize: 36, color: tokens.textMuted, mb: 0.5 }} />
                  <Typography color={tokens.textSecondary} fontSize={14}>
                    No doctors yet
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={0}>
                  {doctorList?.slice(0, 4).map((doc: any) => (
                    <Box
                      key={doc._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 0.8,
                        px: 1,
                        borderRadius: 1.5,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        "&:hover": {
                          background: mode === "dark"
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(0,0,0,0.02)",
                        },
                      }}
                      onClick={() => router.push(`/dashboard/doctors/${doc._id}`)}
                    >
                      <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                            fontSize: 15,
                            fontWeight: 700,
                          }}
                        >
                          {doc.name?.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography fontWeight={600} fontSize={16} color={tokens.text} lineHeight={1.2}>
                            Dr. {doc.name}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: tokens.textMuted }}>
                            {doc.specialization || doc.department?.name}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography sx={{ fontWeight: 700, fontSize: 15, color: tokens.text }}>
                        ₹{doc.fees}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Calendar */}
        <Grid size={{ xs: 12, lg: 6 }} sx={{ minHeight: 410, maxHeight: 460, overflow: "hidden" }}>
          <AppointmentCalendar />
        </Grid>

        {/* Upcoming 7 Days Appointments */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 0 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${tokens.cardBorder}`,
              background: tokens.cardBg,
              backdropFilter: tokens.glassBlur,
              overflow: "hidden",
              minHeight: 360,
              maxHeight: 360,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${tokens.border}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 30,
                    borderRadius: 1.5,
                    background: mode === "dark" ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarMonthIcon sx={{ color: "#22c55e", fontSize: 16 }} />
                </Box>
                <Box>
                  <Typography fontWeight={700} fontSize={17} color={tokens.text} lineHeight={1.2}>
                    Upcoming Confirmed (Next 7 Days)
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: tokens.textMuted }}>
                    {upcoming7Days.length} confirmed
                  </Typography>
                </Box>
              </Box>

              <Button
                size="small"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                onClick={() => router.push("/dashboard/appointment")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 14,
                  color: tokens.accent,
                  borderRadius: 2,
                  px: 1.5,
                  "&:hover": { background: tokens.accentGlow },
                }}
              >
                View All
              </Button>
            </Box>

            <Box sx={{ p: 1.5, flex: 1, overflowY: "auto" }}>
              {upcoming7Days.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 2 }}>
                  <CalendarMonthIcon sx={{ fontSize: 32, color: tokens.textMuted, mb: 0.5 }} />
                  <Typography sx={{ color: tokens.textMuted, fontSize: 14 }}>
                    No upcoming appointments in the next 7 days
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={0.8}>
                  {upcoming7Days.map((appt: any) => {
                    const apptDate = dayjs(appt.date);
                    const isToday = apptDate.isSame(today, "day");
                    return (
                      <Box
                        key={appt._id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 1,
                          borderRadius: 2,
                          border: `1px solid ${isToday ? (mode === "dark" ? "rgba(34,197,94,0.3)" : "rgba(34,197,94,0.25)") : tokens.cardBorder}`,
                          background: isToday
                            ? (mode === "dark" ? "rgba(34,197,94,0.08)" : "rgba(34,197,94,0.05)")
                            : tokens.bgSurface,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography fontWeight={700} fontSize={14} color={tokens.text}>
                            {appt.name}
                          </Typography>
                          <Typography fontSize={12} color={tokens.textMuted}>
                            Dr. {getDoctorName(appt)} · {apptDate.format("DD MMM")}{appt.time ? ` · ${appt.time}` : ""}
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label={isToday ? "Today" : apptDate.format("DD MMM")}
                          sx={{
                            fontWeight: 600,
                            fontSize: 11,
                            background: isToday ? "rgba(34,197,94,0.15)" : tokens.bgGlass,
                            color: isToday ? "#22c55e" : tokens.text,
                            ml: 1,
                          }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Monthly Appointment Performance */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${tokens.cardBorder}`,
              background: tokens.cardBg,
              backdropFilter: tokens.glassBlur,
              overflow: "hidden",
              p: 1.5,
              minHeight: 360,
              maxHeight: 360,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography fontWeight={700} fontSize={16} color={tokens.text} mb={0.5}>
              Monthly Appointment Performance
            </Typography>
            <Typography sx={{ fontSize: 12, color: tokens.textMuted, mb: 1.5 }}>
              Last 6 months
            </Typography>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyPerformance} margin={{ top: 10, right: 5, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={tokens.accent} stopOpacity={0.95} />
                    <stop offset="100%" stopColor={tokens.accentLight} stopOpacity={0.35} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={tokens.border} />
                <XAxis dataKey="month" stroke={tokens.textSecondary} tick={{ fontSize: 12, fill: tokens.textSecondary }} />
                <YAxis stroke={tokens.textSecondary} tick={{ fontSize: 12, fill: tokens.textSecondary }} allowDecimals={false} width={25} />
                <Tooltip
                  contentStyle={{
                    background: tokens.cardBg,
                    borderRadius: 8,
                    border: `1px solid ${tokens.border}`,
                    color: tokens.text,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="count" position="top" fill={tokens.text} fontSize={11} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Departments */}
        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${tokens.cardBorder}`,
              background: tokens.cardBg,
              backdropFilter: tokens.glassBlur,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${tokens.border}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: 1.5,
                    background: mode === "dark" ? "rgba(225,29,72,0.15)" : "rgba(225,29,72,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FolderSpecialIcon sx={{ color: "#e11d48", fontSize: 16 }} />
                </Box>
                <Box>
                  <Typography fontWeight={700} fontSize={16} color={tokens.text} lineHeight={1.2}>
                    Departments
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: tokens.textMuted }}>
                    {departmentList?.length || 0} active
                  </Typography>
                </Box>
              </Box>

              <Button
                size="small"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                onClick={() => router.push("/dashboard/departmentList")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 14,
                  color: tokens.accent,
                  borderRadius: 2,
                  px: 1.5,
                  "&:hover": { background: tokens.accentGlow },
                }}
              >
                View All
              </Button>
            </Box>

            {/* Body */}
            <Box sx={{ p: 1.5 }}>
              <Grid container spacing={1}>
                {departmentList?.slice(0, 6).map((dept: any, i: number) => {
                  const color = deptColors[i % deptColors.length];
                  return (
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={dept._id}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          background: color.bg,
                          textAlign: "center",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          border: `1px solid transparent`,
                          "&:hover": {
                            transform: "translateY(-2px)",
                            borderColor: tokens.cardBorder,
                          },
                        }}
                        onClick={() =>
                          router.push(`/dashboard/doctors?departmentId=${dept._id}`)
                        }
                      >
                        <Box
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: 1.5,
                            background: color.gradient,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 0.8,
                          }}
                        >
                          <LocalHospitalIcon sx={{ color: "#fff", fontSize: 15 }} />
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: 15,
                            color: tokens.text,
                            lineHeight: 1.3,
                          }}
                        >
                          {dept.name}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}