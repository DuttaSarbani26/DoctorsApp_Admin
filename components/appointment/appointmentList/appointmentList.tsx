"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useThemeContext } from "@/context/ThemeContext";
import Swal from "sweetalert2";

import {
  appointmentList,
  confirmAppointment,
  cancelAppointment,
} from "@/redux/slice/appointmentSlice";

export default function AppointmentList() {
  const dispatch = useDispatch<AppDispatch>();
  const { tokens } = useThemeContext();

  const appointments = useSelector(
    (state: any) => state.appointment.appointmentList,
  );

  useEffect(() => {
    dispatch(appointmentList());
  }, [dispatch]);

  const handleConfirm = async (id: string) => {
    const result = await Swal.fire({
      title: "Confirm Appointment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, Confirm",
    });

    if (result.isConfirmed) {
      await dispatch(confirmAppointment(id));
      dispatch(appointmentList());
    }
  };

  const handleCancel = async (id: string) => {
    const result = await Swal.fire({
      title: "Cancel Appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, Cancel",
    });

    if (result.isConfirmed) {
      await dispatch(cancelAppointment(id));
      dispatch(appointmentList());
    }
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700} color={tokens.text} sx={{ fontSize: { xs: 22, md: 32 } }}>
          Appointments
        </Typography>
        <Typography variant="body2" color={tokens.textSecondary} sx={{ fontSize: { xs: 12, md: 14 } }}>
          Manage all appointment requests
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${tokens.cardBorder}`,
          overflow: "hidden",
          background: tokens.cardBg,
          p: { xs: 1, md: 0 },
        }}
      >
        <Stack divider={<Divider sx={{ borderColor: tokens.cardBorder }} />}>
          {appointments?.map((item: any, index: number) => (
            <Box
              key={item._id}
              sx={{
                px: { xs: 1.5, md: 2.5 },
                py: { xs: 1.5, md: 2 },
                display: "flex",
                alignItems: { xs: "flex-start", md: "center" },
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 0 },
                justifyContent: "space-between",
                transition: "all 0.25s ease",
                "&:hover": {
                  background: tokens.hoverBg || "rgba(0,0,0,0.03)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  minWidth: 180,
                }}
              >
                <Typography fontWeight={600} fontSize={14} color={tokens.text}>
                  User ID: {item.userId}
                </Typography>

                <Typography variant="caption" color={tokens.textSecondary}>
                  📅 {new Date(item.date).toLocaleDateString()}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body2"
                  color={tokens.textSecondary}
                  sx={{ fontWeight: 500 }}
                >
                  ⏰ {item.time}
                </Typography>

                <Chip
                  label={item.status}
                  size="small"
                  sx={{
                    px: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: "6px",
                    background:
                      item.status === "Pending"
                        ? "rgba(251,191,36,0.12)"
                        : "rgba(34,197,94,0.12)",
                    color: item.status === "Pending" ? "#f59e0b" : "#22c55e",
                  }}
                />
              </Box>

              {item.status === "Pending" && (
                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={() => handleConfirm(item._id)}
                    sx={{
                      borderRadius: 2,
                      border: `1px solid ${tokens.border}`,
                      transition: "0.2s",
                      "&:hover": {
                        background: "rgba(34,197,94,0.08)",
                        borderColor: "#22c55e",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <CheckCircleIcon sx={{ color: "#22c55e", fontSize: 20 }} />
                  </IconButton>

                  <IconButton
                    onClick={() => handleCancel(item._id)}
                    sx={{
                      borderRadius: 2,
                      border: `1px solid ${tokens.border}`,
                      transition: "0.2s",
                      "&:hover": {
                        background: "rgba(239,68,68,0.08)",
                        borderColor: "#ef4444",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <CancelIcon sx={{ color: "#ef4444", fontSize: 20 }} />
                  </IconButton>
                </Stack>
              )}
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
