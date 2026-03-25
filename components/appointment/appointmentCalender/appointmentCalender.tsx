"use client";

import {
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  Chip,
  Skeleton,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { appointmentAcceptedList } from "@/redux/slices/appointmentSlice";
import { useThemeContext } from "@/context/ThemeContext";
import { appointmentAcceptedList } from "@/redux/slice/appointmentSlice";

export default function AppointmentCalendar() {
  const { tokens, mode } = useThemeContext();
  const dispatch = useDispatch();

  const { appointmentAcceptList, loading } = useSelector(
    (state: any) => state.appointment
  );

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  // 🔥 Fetch from Redux
  useEffect(() => {
    dispatch(appointmentAcceptedList() as any);
  }, [dispatch]);

  // 🎯 Filter by date
  const filteredAppointments = appointmentAcceptList?.filter((appt: any) =>
    dayjs(appt.date).format("YYYY-MM-DD") ===
    selectedDate.format("YYYY-MM-DD")
  );

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: `1px solid ${tokens.cardBorder}`,
        background: tokens.cardBg,
        backdropFilter: tokens.glassBlur,
        overflow: "hidden",
        minHeight: 460,
        maxHeight: 460,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.2,
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          borderBottom: `1px solid ${tokens.border}`,
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            background:
              mode === "dark" ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EventAvailableIcon sx={{ color: "#22c55e", fontSize: 15 }} />
        </Box>

        <Box>
          <Typography fontWeight={700} fontSize={13} color={tokens.text} lineHeight={1.2}>
            Appointment Calendar
          </Typography>
          <Typography sx={{ fontSize: 10, color: tokens.textMuted }}>
            Confirmed appointments by date
          </Typography>
        </Box>
      </Box>

      {/* Calendar */}
      <Box sx={{ px: 0.5, pt: 0.5 }}>
        <DateCalendar
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue!)}
          sx={{
            width: "100%",
            maxHeight: 240,
            "& .MuiPickersCalendarHeader-root": { px: 1, minHeight: 32, mb: 0 },
            "& .MuiDayCalendar-header": { justifyContent: "space-around" },
            "& .MuiDayCalendar-weekContainer": { justifyContent: "space-around", mb: 0 },
            "& .MuiPickersDay-root": { width: 28, height: 28, fontSize: 12 },
            "& .MuiDayCalendar-weekDayLabel": { width: 28, height: 28, fontSize: 11 },
            "& .MuiPickersCalendarHeader-label": { fontSize: 13 },
            "& .MuiDayCalendar-slideTransition": { minHeight: 180 },
            ...(mode === "dark" && {
              color: "#e2e8f0",
              "& .MuiDayCalendar-weekDayLabel": { color: "#94a3b8", width: 28, height: 28, fontSize: 11 },
              "& .MuiPickersDay-root": {
                color: "#e2e8f0",
                width: 28,
                height: 28,
                fontSize: 12,
                "&:hover": { background: "rgba(255,255,255,0.08)" },
                "&.Mui-selected": {
                  background: "#7c3aed",
                  color: "#fff",
                  "&:hover": { background: "#6d28d9" },
                },
                "&.MuiPickersDay-today": {
                  borderColor: "#7c3aed",
                },
              },
              "& .MuiPickersCalendarHeader-label": { color: "#e2e8f0", fontSize: 13 },
              "& .MuiPickersArrowSwitcher-button": { color: "#94a3b8" },
              "& .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton": {
                color: "#e2e8f0",
                "&.Mui-selected": { background: "#7c3aed", color: "#fff" },
              },
            }),
          }}
        />
      </Box>

      {/* List */}
      <Box sx={{ px: 1.5, pb: 1.5, pt: 0.5 }}>
        <Typography
          fontWeight={600}
          fontSize={12}
          mb={0.5}
          color={tokens.text}
        >
          {selectedDate.format("DD MMM YYYY")}
        </Typography>

        {loading ? (
          <Stack spacing={1}>
            {[1, 2].map((i) => (
              <Skeleton key={i} height={32} />
            ))}
          </Stack>
        ) : filteredAppointments?.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 1.5 }}>
            <Typography sx={{ color: tokens.textMuted, fontSize: 11 }}>
              No appointments today
            </Typography>
          </Box>
        ) : (
          <Stack spacing={0.3}>
            {filteredAppointments.slice(0, 3).map((appt: any) => (
              <Box
                key={appt._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 0.8,
                  borderRadius: 1.5,
                  transition: "0.15s",
                  cursor: "pointer",
                  "&:hover": {
                    background: mode === "dark"
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.02)",
                  },
                }}
              >
                {/* Left */}
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: 12,
                      background:
                        "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
                      fontWeight: 700,
                    }}
                  >
                    {appt.name?.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography
                      fontWeight={600}
                      fontSize={12}
                      color={tokens.text}
                      lineHeight={1.2}
                    >
                      {appt.name}
                    </Typography>

                    <Typography
                      sx={{ fontSize: 10, color: tokens.textMuted }}
                    >
                      {appt.time}
                    </Typography>
                  </Box>
                </Box>

                {/* Right */}
                <Chip
                  label="Confirmed"
                  size="small"
                  sx={{
                    fontWeight: 600,
                    fontSize: 10,
                    height: 20,
                    background: "rgba(52,211,153,0.1)",
                    color: "#34d399",
                  }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Paper>
  );
}