"use client";

import {
  departmentWiseDoctor,
  doctorDelete,
  doctorList,
  getDepartmentList,
} from "@/redux/slice/doctorSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import DoctorCreateModal from "./doctorCreate";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  Stack,
  Skeleton,
  Paper,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import {
  Add,
  Delete,
  Visibility,
  Search,
  Close as CloseIcon,
  LocalHospital as DepartmentIcon,
  Work as ExperienceIcon,
  Star as StarIcon,
  AttachMoney as FeeIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

import { useRouter, useSearchParams } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import Swal from "sweetalert2";

export default function DoctorList() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { tokens } = useThemeContext();

  const doctors = useSelector((state: any) => state.doctor.doctorList);
  const doctorTotal = useSelector((state: any) => state.doctor.doctorTotal);
  const loading = useSelector((state: any) => state.doctor.loading);
  const departments = useSelector((state: any) => state.doctor.departmentList);

  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const [departmentId, setDepartmentId] = useState(
    searchParams.get("departmentId") || "",
  );
  const [editDoctor, setEditDoctor] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 12;
  const totalPages = Math.ceil(doctorTotal / limit);

  useEffect(() => {
    dispatch(getDepartmentList());
  }, [dispatch]);

  useEffect(() => {
    const deptIdFromUrl = searchParams.get("departmentId");
    if (deptIdFromUrl) {
      setDepartmentId(deptIdFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (departmentId) {
      dispatch(departmentWiseDoctor(departmentId));
    } else {
      dispatch(doctorList({ page, limit, search }));
    }
  }, [dispatch, page, search, departmentId]);

  const handleDeleteDoctor = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This doctor will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await dispatch(doctorDelete(id)).unwrap();
        dispatch(doctorList({ page, limit, search }));
        Swal.fire({
          title: "Deleted!",
          text: "Doctor has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete doctor.",
          icon: "error",
        });
        console.log(err);
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} color={tokens.text} sx={{ fontSize: { xs: 22, md: 32 } }}>
            Doctors
          </Typography>
          <Typography variant="body2" color={tokens.textSecondary} sx={{ fontSize: { xs: 12, md: 14 } }}>
            Manage all doctors in your hospital
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditDoctor(null);
            setShowModal(true);
          }}
          sx={{
            background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 600,
            px: { xs: 2, md: 3 },
            py: 1,
            fontSize: { xs: 12, md: 14 },
            boxShadow: "0 4px 15px rgba(124,58,237,0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
            },
          }}
        >
          Add Doctor
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, md: 2 },
          mb: 3,
          borderRadius: 3,
          border: `1px solid ${tokens.cardBorder}`,
          background: tokens.cardBg,
          backdropFilter: tokens.glassBlur,
          display: "flex",
          gap: { xs: 1, md: 2 },
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          size="small"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: (
              <Search
                sx={{ color: tokens.textMuted, mr: 1 }}
                fontSize="small"
              />
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2.5,
              color: tokens.text,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: tokens.inputBorder,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: tokens.accent,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: tokens.accent,
              },
            },
            "& .MuiInputBase-input::placeholder": { color: tokens.textMuted },
          }}
        />

        <Select
          size="small"
          value={departmentId}
          onChange={(e) => {
            setDepartmentId(e.target.value);
            setPage(1);
          }}
          displayEmpty
          sx={{
            minWidth: { xs: 150, sm: 180 },
            borderRadius: 2.5,
            color: tokens.text,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: tokens.inputBorder,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: tokens.accent,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: tokens.accent,
            },
            "& .MuiSvgIcon-root": { color: tokens.textMuted },
          }}
        >
          <MenuItem value="">All Departments</MenuItem>
          {departments?.map((dept: any) => (
            <MenuItem key={dept._id} value={dept._id}>
              {dept.name}
            </MenuItem>
          ))}
        </Select>
      </Paper>

      <Grid container spacing={2.5}>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: `1px solid ${tokens.cardBorder}`,
                  background: tokens.cardBg,
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Skeleton variant="circular" width={48} height={48} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton width="70%" height={20} />
                      <Skeleton width="50%" height={16} />
                    </Box>
                  </Stack>
                  <Skeleton width="60%" height={16} />
                  <Stack direction="row" gap={1}>
                    <Skeleton width={70} height={26} sx={{ borderRadius: 2 }} />
                  </Stack>
                  <Skeleton width="40%" height={16} />
                </Stack>
              </Paper>
            </Grid>
          ))
        ) : doctors?.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
              }}
            >
              <Search sx={{ fontSize: 48, color: tokens.textMuted, mb: 2 }} />
              <Typography fontWeight={700} fontSize={18} color={tokens.text}>
                No Doctor Found
              </Typography>
              <Typography
                variant="body2"
                color={tokens.textSecondary}
                sx={{ mt: 0.5 }}
              >
                Try adjusting your search or filters
              </Typography>
            </Box>
          </Grid>
        ) : (
          doctors?.map((doc: any) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={doc._id}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${tokens.cardBorder}`,
                  background: tokens.cardBg,
                  backdropFilter: tokens.glassBlur,
                  height: "100%",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: tokens.cardHoverShadow,
                    borderColor: tokens.accent,
                  },
                }}
              >
                <Box
                  sx={{
                    height: 4,
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                  }}
                />
                <Box sx={{ p: 2.5 }}>
                  {/* Header */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        background:
                          "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                        fontWeight: 700,
                        fontSize: 18,
                      }}
                    >
                      {doc.name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography
                        fontWeight={700}
                        fontSize={15}
                        color={tokens.text}
                      >
                        Dr. {doc.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: tokens.textSecondary, fontWeight: 600 }}
                      >
                        {doc.specialization}
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography
                    mt={2}
                    variant="body2"
                    color={tokens.textSecondary}
                    fontSize={13}
                  >
                    <strong>Dept:</strong> {doc.department?.name}
                  </Typography>

                  <Box mt={1.5}>
                    {doc.schedule?.startTime && doc.schedule?.endTime ? (
                      <Chip
                        size="small"
                        label={`${doc.schedule.startTime} - ${doc.schedule.endTime}`}
                        sx={{
                          background: "rgba(52,211,153,0.1)",
                          color: "#34d399",
                          fontWeight: 600,
                          fontSize: 11,
                        }}
                      />
                    ) : (
                      <Chip
                        size="small"
                        label="No Schedule"
                        sx={{
                          background: "rgba(244,63,94,0.1)",
                          color: "#f43f5e",
                          fontWeight: 600,
                          fontSize: 11,
                        }}
                      />
                    )}
                  </Box>

                  <Typography
                    mt={1.5}
                    fontWeight={700}
                    fontSize={16}
                    color={tokens.text}
                  >
                    ₹{doc.fees}
                  </Typography>

                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={0.5}
                    mt={2}
                  >
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedDoctor(doc);
                        setViewModalOpen(true);
                      }}
                      sx={{
                        border: `1px solid ${tokens.border}`,
                        "&:hover": {
                          background: tokens.accentGlow,
                          borderColor: tokens.accent,
                        },
                      }}
                    >
                      <Visibility
                        sx={{ fontSize: 16, color: tokens.accentLight }}
                      />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditDoctor(doc);
                        setShowModal(true);
                      }}
                      sx={{
                        border: `1px solid ${tokens.border}`,
                        "&:hover": {
                          background: "rgba(59,130,246,0.1)",
                          borderColor: "#3b82f6",
                        },
                      }}
                    >
                      ✏️
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => handleDeleteDoctor(doc._id)}
                      sx={{
                        border: `1px solid ${tokens.border}`,
                        "&:hover": {
                          background: "rgba(244,63,94,0.1)",
                          borderColor: "#f43f5e",
                        },
                      }}
                    >
                      <Delete sx={{ fontSize: 16, color: "#f43f5e" }} />
                    </IconButton>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      {!departmentId && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 600,
                color: tokens.textSecondary,
                "&.Mui-selected": {
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                  color: "#fff",
                },
              },
            }}
          />
        </Box>
      )}

      <DoctorCreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        editDoctor={editDoctor}
      />

      <Dialog
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        fullWidth
        maxWidth="sm"
        BackdropProps={{
          sx: {
            backdropFilter: "blur(7px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: 4,
            border: `1px solid ${tokens.border}`,
            background: tokens.bgElevated,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.45) 0%, rgba(167,139,250,0.47) 100%)",
            color: tokens.text,
            fontWeight: 700,
            fontSize: 20,
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            borderBottom: `1px solid ${tokens.border}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                fontWeight: 700,
                fontSize: 18,
                width: 40,
                height: 40,
              }}
            >
              {selectedDoctor?.name?.charAt(0)}
            </Avatar>
            <span>Dr. {selectedDoctor?.name}</span>
          </Box>
          <IconButton
            onClick={() => setViewModalOpen(false)}
            sx={{
              color: tokens.text,
              "&:hover": { background: "rgba(0,0,0,0.04)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3, background: tokens.bgGlass }}>
          {selectedDoctor && (
            <Stack spacing={2.5}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  border: `1px solid ${tokens.border}`,
                  background: tokens.bgElevated,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  transition: "all 0.3s ease",
                  "&:hover": { borderColor: tokens.accent },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    background: "rgba(124,58,237,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DepartmentIcon sx={{ color: tokens.accent, fontSize: 22 }} />
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="caption"
                    color={tokens.textMuted}
                    fontWeight={600}
                    display="block"
                  >
                    Department
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color={tokens.text}
                    fontSize={15}
                    sx={{ mt: 0.5 }}
                  >
                    {selectedDoctor.department?.name || "N/A"}
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  border: `1px solid ${tokens.border}`,
                  background: tokens.bgElevated,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  transition: "all 0.3s ease",
                  "&:hover": { borderColor: tokens.accent },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    background: "rgba(34,197,94,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ExperienceIcon sx={{ color: "#22c55e", fontSize: 22 }} />
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="caption"
                    color={tokens.textMuted}
                    fontWeight={600}
                    display="block"
                  >
                    Experience
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color={tokens.text}
                    fontSize={15}
                    sx={{ mt: 0.5 }}
                  >
                    {selectedDoctor.experience || 15} years
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  border: `1px solid ${tokens.border}`,
                  background: tokens.bgElevated,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  transition: "all 0.3s ease",
                  "&:hover": { borderColor: tokens.accent },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    background: "rgba(245,158,11,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StarIcon sx={{ color: "#f59e0b", fontSize: 22 }} />
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="caption"
                    color={tokens.textMuted}
                    fontWeight={600}
                    display="block"
                  >
                    Rating
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <Typography
                      fontWeight={700}
                      color={tokens.text}
                      fontSize={15}
                    >
                      {selectedDoctor.rating || 4.5}
                    </Typography>
                    <Typography sx={{ color: "#f59e0b", fontSize: 16 }}>
                      ★
                    </Typography>
                  </Stack>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  border: `1px solid ${tokens.border}`,
                  background: tokens.bgElevated,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  transition: "all 0.3s ease",
                  "&:hover": { borderColor: tokens.accent },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    background: "rgba(59,130,246,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FeeIcon sx={{ color: "#3b82f6", fontSize: 22 }} />
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="caption"
                    color={tokens.textMuted}
                    fontWeight={600}
                    display="block"
                  >
                    Consultation Fees
                  </Typography>
                  <Typography
                    fontWeight={700}
                    color={tokens.text}
                    fontSize={16}
                    sx={{ mt: 0.5 }}
                  >
                    ₹{selectedDoctor.fees || "500"}
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  border: `1px solid ${tokens.border}`,
                  background: tokens.bgElevated,
                  transition: "all 0.3s ease",
                  "&:hover": { borderColor: tokens.accent },
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      background: "rgba(168,85,247,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <InfoIcon sx={{ color: "#a855f7", fontSize: 22 }} />
                  </Box>
                  <Box flex={1}>
                    <Typography
                      variant="caption"
                      color={tokens.textMuted}
                      fontWeight={600}
                      display="block"
                      mb={1}
                    >
                      About
                    </Typography>
                    <Typography
                      variant="body2"
                      color={tokens.textSecondary}
                      sx={{ lineHeight: 1.6 }}
                    >
                      {selectedDoctor.about ||
                        selectedDoctor.bio ||
                        "A dedicated medical professional with expertise and commitment to patient care."}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
