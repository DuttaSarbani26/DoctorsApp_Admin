"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  departmentCreate,
  doctorList,
  getDepartmentList,
} from "@/redux/slice/doctorSlice";
import type { AppDispatch } from "@/redux/store/store";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessIcon from "@mui/icons-material/Business";
import { useThemeContext } from "@/context/ThemeContext";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Minimum 3 character")
    .required("Department name is required"),

  description: yup
    .string()
    .min(10, "Minimum 10 character")
    .required("Description is required"),
});

export default function DepartmentCreate({ closeModal }: { closeModal: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const selector = useSelector((state: any) => state.doctor);
  const { tokens } = useThemeContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const result = await dispatch(departmentCreate(data)).unwrap();

      if (result.message) {
        toast.success(result.message || "Department created successfully");
        dispatch(getDepartmentList());
        dispatch(doctorList({ page: 1, limit: 10 }));
        closeModal();
      } else {
        toast.error(result.message || "Creation failed");
      }
    } catch (err) {
      toast.error("Something Went Wrong");
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <IconButton
          onClick={() => router.push("/dashboard/departmentList")}
          sx={{ color: tokens.textSecondary }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" color={tokens.text}>
          Add New Department
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <BusinessIcon sx={{ color: tokens.accentLight }} />
        <Typography variant="h6" color={tokens.text}>
          Department Information
        </Typography>
      </Stack>

      <Typography variant="body2" color={tokens.textSecondary} mb={3}>
        Enter the details of new department
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Department Name"
          margin="normal"
          placeholder="Cardiology, Neurology"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
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
          }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          margin="normal"
          placeholder="Describe the department's focus & specialties"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
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
          }}
        />

        <Stack direction="row" spacing={2} mt={3}>
          <Button
            type="submit"
            variant="contained"
            disabled={selector.loading}
            sx={{
              background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
              },
            }}
          >
            {selector.loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Create Department"
            )}
          </Button>

          <Button
            variant="outlined"
            onClick={closeModal}
            sx={{
              borderColor: tokens.border,
              color: tokens.textSecondary,
              "&:hover": { borderColor: tokens.textMuted },
            }}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
