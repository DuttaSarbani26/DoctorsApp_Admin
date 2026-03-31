"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

import {
  doctorCreate,
  doctorEdit,
  doctorList,
  getDepartmentList,
} from "@/redux/slice/doctorSlice";

import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { toast } from "sonner";
import { AppDispatch } from "@/redux/store/store";
import CreateDoctorModal from "../modals/createDoctorModal";
import { useThemeContext } from "@/context/ThemeContext";

const cookie = new Cookies();

export default function DoctorCreate({
  open,
  onClose,
  editDoctor,
  department,
}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { tokens } = useThemeContext();

  const departmentList = useSelector(
    (state: any) => state.doctor.departmentList,
  );

  const [form, setForm] = useState({
    name: "",
    fees: "",
    departmentId: "",
  });

  const [schedule, setSchedule] = useState({
    startTime: "",
    endTime: "",
    slotDuration: "",
  });
  const resetForm = () => {
    setForm({
      name: "",
      fees: "",
      departmentId: "",
    });

    setSchedule({
      startTime: "",
      endTime: "",
      slotDuration: "",
    });
  };

  useEffect(() => {
    dispatch(getDepartmentList());
  }, [dispatch]);

  useEffect(() => {
    if (department?._id && !editDoctor) {
      setForm((prev) => ({
        ...prev,
        departmentId: department._id,
      }));
    }
  }, [department, editDoctor]);
  useEffect(() => {
    if (open && !editDoctor) {
      resetForm();
    }
  }, [open, editDoctor]);

  useEffect(() => {
    if (editDoctor) {
      setForm({
        name: editDoctor.name || "",
        fees: editDoctor.fees || "",
        departmentId: editDoctor.department?._id || "",
      });

      if (editDoctor?.schedule) {
        setSchedule({
          startTime: editDoctor.schedule.startTime || "",
          endTime: editDoctor.schedule.endTime || "",
          slotDuration: editDoctor.schedule.slotDuration || "",
        });
      }
    }
  }, [editDoctor]);

  const handleDepartment = (e: any) => {
    const id = e.target.value;

    setForm({ ...form, departmentId: id });
    cookie.set("departmentId", id, { path: "/" });
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      fees: form.fees,
      departmentId: form.departmentId,
      schedule: {
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        slotDuration: Number(schedule.slotDuration),
      },
    };

    try {
      if (editDoctor) {
        const res = await dispatch(
          doctorEdit({
            id: editDoctor._id,
            data: payload,
          }),
        ).unwrap();

        toast.success(res.message);
      } else {
        const res = await dispatch(doctorCreate(payload)).unwrap();
        toast.success(res.message);
      }

      setTimeout(() => {
        dispatch(doctorList({ page: 1, limit: 12, search: "" }));
      }, 300);

      dispatch(getDepartmentList());

      onClose();
      resetForm();
    } catch (error) {
      console.log("Doctor error:", error);
    }
  };

  return (
    <CreateDoctorModal
      open={open}
      onClose={onClose}
      title={editDoctor ? "Edit Doctor" : "Add Doctor"}
      actions={
        <>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderColor: tokens.border,
              color: tokens.textSecondary,
              "&:hover": { borderColor: tokens.textMuted },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
              },
            }}
          >
            {editDoctor ? "Update" : "Create"}
          </Button>
        </>
      }
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          "& .MuiOutlinedInput-root": {
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
          "& .MuiInputLabel-root": { color: tokens.textSecondary },
          "& .MuiInputLabel-root.Mui-focused": { color: tokens.accentLight },
          "& .MuiSvgIcon-root": { color: tokens.textSecondary },
        }}
      >
        <TextField
          label="Doctor Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          fullWidth
        />

        <TextField
          label="Consultation Fees"
          value={form.fees}
          onChange={(e) => setForm({ ...form, fees: e.target.value })}
          fullWidth
        />

        <TextField
          select
          label="Department"
          value={form.departmentId || ""}
          onChange={handleDepartment}
          fullWidth
        >
          {departmentList?.map((dep: any) => (
            <MenuItem key={dep._id} value={dep._id}>
              {dep.name}
            </MenuItem>
          ))}
        </TextField>

        <Box>
          <Typography variant="subtitle2" mb={1} color={tokens.text}>
            Schedule
          </Typography>

          <Stack direction="row" spacing={1} mb={1}>
            <TextField
              type="time"
              label="Start Time"
              value={schedule.startTime}
              onChange={(e) =>
                setSchedule({ ...schedule, startTime: e.target.value })
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              type="time"
              label="End Time"
              value={schedule.endTime}
              onChange={(e) =>
                setSchedule({ ...schedule, endTime: e.target.value })
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>

          <TextField
            type="number"
            label="Slot Duration (minutes)"
            value={schedule.slotDuration}
            onChange={(e) =>
              setSchedule({ ...schedule, slotDuration: e.target.value })
            }
            fullWidth
          />
        </Box>
      </Box>
    </CreateDoctorModal>
  );
}
