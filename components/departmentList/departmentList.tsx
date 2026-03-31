"use client";

import React, { useEffect, useState } from "react";
import {
  deleteDepartment,
  departmentWiseDoctor,
  getDepartmentList,
} from "@/redux/slice/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CreateDepartmentModal from "@/components/modals/createDepartmentModal";
import CreateDoctorModal from "@/components/modals/createDoctorModal";
import { AppDispatch } from "@/redux/store/store";

import {
  Box,
  Typography,
  Button,
  Paper,
  Skeleton,
  Pagination,
  Grid,
  Chip,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DoctorCreate from "../doctors/doctorCreate";
import { useThemeContext } from "@/context/ThemeContext";

export default function DepartmentList() {
  const dispatch = useDispatch<AppDispatch>();
  const { tokens } = useThemeContext();

  const { departmentList, loading } = useSelector((state: any) => state.doctor);
  const [openDepartmentModal, setOpenDepartmentModal] = useState(false);
  const [openDoctorModal, setOpenDoctorModal] = useState(false);

  const [page, setPage] = useState(1);
  const rowsPerPage = 12; // ✅ UPDATED TO 12 FOR BETTER UX

  useEffect(() => {
    dispatch(getDepartmentList());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This department will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteDepartment(id)).unwrap();
        dispatch(getDepartmentList());

        Swal.fire({
          title: "Deleted!",
          text: "Department has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete department.",
          icon: "error",
        });
      }
    }
  };

  const departments = departmentList || [];

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = departments.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = Math.ceil(departments.length / rowsPerPage);

  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [viewDoctors, setViewDoctors] = useState<any[]>([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  const handleViewDoctors = async (dept: any) => {
    setSelectedDepartment(dept);
    setOpenViewModal(true);
    setViewLoading(true);
    try {
      const res = await dispatch(departmentWiseDoctor(dept._id)).unwrap();
      const doctors = Array.isArray(res) ? res : res?.data || [];
      setViewDoctors(doctors);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch doctors.",
        icon: "error",
      });
      setViewDoctors([]);
    } finally {
      setViewLoading(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} color={tokens.text}>
            Departments
          </Typography>
          <Typography variant="body2" color={tokens.textSecondary}>
            Manage all hospital departments
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDepartmentModal(true)}
          sx={{
            background: "linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)",
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            boxShadow: "0 4px 15px rgba(225,29,72,0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #be123c 0%, #e11d48 100%)",
            },
          }}
        >
          Add Department
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: `1px solid ${tokens.cardBorder}`,
          background: tokens.cardBg,
          backdropFilter: tokens.glassBlur,
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={3} color={tokens.text}>
          All Departments ({departments.length})
        </Typography>

        <Grid container spacing={2.5} alignItems="stretch">
          {loading
            ? [...Array(8)].map((_, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: `1px solid ${tokens.cardBorder}`,
                      background: tokens.bgElevated,
                    }}
                  >
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Skeleton variant="rounded" width={40} height={40} />
                        <Skeleton
                          width={50}
                          height={24}
                          sx={{ borderRadius: 2 }}
                        />
                      </Box>
                      <Skeleton height={22} width="70%" />
                      <Skeleton height={16} width="100%" />
                      <Skeleton height={14} width="50%" />
                    </Stack>
                  </Paper>
                </Grid>
              ))
            : paginatedData.map((dept: any) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  key={dept._id}
                  sx={{ display: "flex" }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 3,
                      border: `1px solid ${tokens.cardBorder}`,
                      background: tokens.cardBg,
                      backdropFilter: tokens.glassBlur,
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: tokens.cardHoverShadow,
                        borderColor: "#f43f5e",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 4,
                        background:
                          "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      }}
                    />

                    <Box
                      sx={{
                        p: 2.5,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            background:
                              "linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <LocalHospitalIcon
                            sx={{ color: "#fff", fontSize: 22 }}
                          />
                        </Box>
                        <Chip
                          label="Active"
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: 11,
                            background: "rgba(52,211,153,0.1)",
                            color: "#34d399",
                          }}
                        />
                      </Box>

                      <Typography
                        fontWeight={700}
                        fontSize={16}
                        color={tokens.text}
                      >
                        {dept.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color={tokens.textSecondary}
                        sx={{
                          mt: 1,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          fontSize: 13,
                        }}
                      >
                        {dept.description}
                      </Typography>

                      <Typography
                        variant="caption"
                        color={tokens.textMuted}
                        sx={{ display: "block", mt: 2 }}
                      >
                        Created: {new Date(dept.createdAt).toLocaleDateString()}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: "auto",
                          pt: 2,
                          gap: 1,
                        }}
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleViewDoctors(dept)}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: 12,
                            borderColor: "#6366f1",
                            color: "#6366f1",
                            "&:hover": {
                              background: "rgba(99,102,241,0.1)",
                              borderColor: "#6366f1",
                            },
                          }}
                        >
                          View
                        </Button>

                        <IconButton
                          size="small"
                          onClick={() => handleDelete(dept._id)}
                          sx={{
                            border: `1px solid ${tokens.border}`,
                            "&:hover": {
                              background: "rgba(244,63,94,0.1)",
                              borderColor: "#f43f5e",
                            },
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 16, color: "#f43f5e" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
        </Grid>

        {!loading && totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 600,
                  color: tokens.textSecondary,
                  "&.Mui-selected": {
                    background:
                      "linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)",
                    color: "#fff",
                  },
                },
              }}
            />
          </Box>
        )}
      </Paper>

      <CreateDepartmentModal
        open={openDepartmentModal}
        handleClose={() => {
          setOpenDepartmentModal(false);
          dispatch(getDepartmentList());
        }}
      />

      <CreateDoctorModal
        open={openDoctorModal}
        onClose={() => {
          setOpenDoctorModal(false);
          setSelectedDepartment(null);
          dispatch(getDepartmentList());
        }}
      >
        <DoctorCreate
          open={openDoctorModal}
          onClose={() => {
            setOpenDoctorModal(false);
            setSelectedDepartment(null);
            dispatch(getDepartmentList());
          }}
          editDoctor={null}
          department={selectedDepartment}
        />
      </CreateDoctorModal>

      <Dialog
        open={openViewModal}
        onClose={() => {
          setOpenViewModal(false);
          setViewDoctors([]);
          setSelectedDepartment(null);
        }}
        fullWidth
        maxWidth="lg"
        BackdropProps={{
          sx: {
            backdropFilter: "blur(7px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            border: `1px solid ${tokens.border}`,
            background: "linear-gradient(145deg, #ffffff, #f7f8fb)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.65) 0%, rgba(244,63,94,0.67) 100%)",
            color: "#102f53",
            fontWeight: 700,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          }}
        >
          <span>Doctors in {selectedDepartment?.name || "Department"}</span>
          <IconButton
            onClick={() => {
              setOpenViewModal(false);
              setViewDoctors([]);
              setSelectedDepartment(null);
            }}
            sx={{ color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ p: 3, minHeight: 300, background: tokens.bgGlass }}
        >
          {viewLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 220,
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : viewDoctors.length === 0 ? (
            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
              No doctors found in this department.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {viewDoctors.map((doctor: any, index: number) => {
                const experience = doctor.experience || 15;
                const rating = doctor.rating || 4.5;
                const about =
                  doctor.about ||
                  doctor.bio ||
                  "A dedicated medical professional with a proven track record of patient care and clinical excellence.";
                const departmentName =
                  doctor.department?.name || selectedDepartment?.name || "N/A";
                const fees = doctor.fees ? `₹${doctor.fees}` : "₹500";
                const available =
                  doctor.availableSlot || "Mon-Fri 09:00 AM - 05:00 PM";

                return (
                  <Grid
                    key={doctor._id || doctor.id || index}
                    size={{ xs: 12, md: 6 }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        border: `1px solid ${tokens.border}`,
                        background: tokens.cardBg,
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 12px 24px rgba(0,0,0,0.10)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          color={tokens.text}
                        >
                          {doctor.name || doctor.fullName || "Unnamed Doctor"}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#10b981", fontWeight: 700 }}
                        >
                          {rating.toFixed?.(1) || rating} ★
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        color={tokens.textSecondary}
                        sx={{ mb: 1 }}
                      >
                        {about}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        sx={{ mb: 1 }}
                      >
                        <Chip
                          label={`Experience: ${experience} yrs`}
                          size="small"
                          color="primary"
                        />
                        <Chip
                          label={`Department: ${departmentName}`}
                          size="small"
                          color="secondary"
                        />
                        <Chip
                          label={`Fees: ${fees}`}
                          size="small"
                          sx={{ bgcolor: "#fee2e2", color: "#b91c1c" }}
                        />
                      </Stack>

                      <Typography variant="caption" color={tokens.textMuted}>
                        Available slot: {available}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
