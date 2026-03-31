"use client";

import { createLocation } from "@/redux/slice/locationSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { useEffect } from "react";
import { useThemeContext } from "@/context/ThemeContext";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
  IconButton,
  Divider,
  InputAdornment,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const schema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  phone: yup.string().required(),
  lat: yup.number().typeError("Latitude must be a number").required(),
  lng: yup.number().typeError("Longitude must be a number").required(),
});

export default function LocationPage() {
  const dispatch = useDispatch<any>();
  const selector = useSelector((state: any) => state.location);
  const { tokens } = useThemeContext();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        lat: Number(data.lat),
        lng: Number(data.lng),
      };

      const result = await dispatch(createLocation(payload)).unwrap();

      if (result?.status) {
        toast.success("Location created successfully");
        reset();
      } else {
        toast.error(result?.message || "Failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (selector?.data?.status) {
      reset();
    }
  }, [selector.data]);

  return (
    <Box display="flex" justifyContent="center" p={3}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 700,
          borderRadius: 4,
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          border: `1px solid ${tokens.border}`,
          background: tokens.bgElevated,
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            color: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <LocationOnIcon />
          <Box>
            <Typography fontWeight={700}>Add Location</Typography>
            <Typography fontSize={12} sx={{ opacity: 0.8 }}>
              Create diagnostic center location
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 4, background: tokens.bgElevated }}>
          <Stack spacing={3}>
            <TextField
              label="Center Name"
              fullWidth
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
                "& .MuiInputBase-input::placeholder": {
                  color: tokens.textMuted,
                },
                "& .MuiInputLabel-root": { color: tokens.textMuted },
              }}
            />

            <TextField
              label="Address"
              fullWidth
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
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
                "& .MuiInputBase-input::placeholder": {
                  color: tokens.textMuted,
                },
                "& .MuiInputLabel-root": { color: tokens.textMuted },
              }}
            />

            <TextField
              label="Phone Number"
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
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
                "& .MuiInputBase-input::placeholder": {
                  color: tokens.textMuted,
                },
                "& .MuiInputLabel-root": { color: tokens.textMuted },
              }}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                label="Latitude"
                fullWidth
                {...register("lat")}
                error={!!errors.lat}
                helperText={errors.lat?.message}
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
                  "& .MuiInputBase-input::placeholder": {
                    color: tokens.textMuted,
                  },
                  "& .MuiInputLabel-root": { color: tokens.textMuted },
                }}
              />

              <TextField
                label="Longitude"
                fullWidth
                {...register("lng")}
                error={!!errors.lng}
                helperText={errors.lng?.message}
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
                  "& .MuiInputBase-input::placeholder": {
                    color: tokens.textMuted,
                  },
                  "& .MuiInputLabel-root": { color: tokens.textMuted },
                }}
              />
            </Box>

            <Button
              startIcon={<MyLocationIcon />}
              onClick={() => {
                navigator.geolocation.getCurrentPosition((pos) => {
                  setValue("lat", pos.coords.latitude);
                  setValue("lng", pos.coords.longitude);
                });
              }}
              sx={{
                alignSelf: "flex-start",
                textTransform: "none",
                color: tokens.accent,
              }}
            >
              Use Current Location
            </Button>

            <Divider sx={{ borderColor: tokens.border }} />

            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={() =>
                  reset({
                    name: "",
                    address: "",
                    phone: "",
                    lat: 0,
                    lng: 0,
                  })
                }
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  borderColor: tokens.border,
                  color: tokens.text,
                  "&:hover": {
                    borderColor: tokens.accent,
                    background: tokens.accentGlow,
                  },
                }}
              >
                Reset
              </Button>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={selector.loading}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  color: "#fff",
                }}
              >
                {selector.loading ? "Creating..." : "+ Create"}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
