"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { authSignIn } from "@/redux/slice/authSlice";
import type { AppDispatch } from "@/redux/store/store";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useThemeContext } from "@/context/ThemeContext";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 character")
    .max(20, "Maximum 20 character")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const cookies = new Cookies();
  const dispatch = useDispatch<AppDispatch>();
  // const selector = useSelector((state) => state.auth);
  const { loading } = useSelector((state: any) => state.auth);
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
      const result = await dispatch(authSignIn(data)).unwrap();

      if (result.status === true) {
        cookies.set("token", result.token, { path: "/" });

        toast.success("Login Successful");

        router.push("/dashboard");
      } else {
        toast.error(result.message || "Login Failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: tokens.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: 420,
          p: 2,
          background: tokens.bgGlassStrong,
          backdropFilter: tokens.glassBlur,
          border: `1px solid ${tokens.border}`,
        }}
      >
        <CardContent>
          <Stack alignItems="center" spacing={1} mb={3}>
            <MedicalServicesIcon
              sx={{ fontSize: 50, color: tokens.accentLight }}
            />

            <Typography variant="h5" fontWeight="bold" color={tokens.text}>
              Welcome Back
            </Typography>

            <Typography variant="body2" color={tokens.textSecondary}>
              Sign in to manage doctors & departments
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
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
                "& .MuiInputLabel-root.Mui-focused": {
                  color: tokens.accentLight,
                },
              }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
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
                "& .MuiInputLabel-root.Mui-focused": {
                  color: tokens.accentLight,
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                height: 45,
                background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
