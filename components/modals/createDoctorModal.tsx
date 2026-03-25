"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeContext } from "@/context/ThemeContext";

export default function CreateDoctorModal({
  open,
  onClose,
  title,
  children,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const { tokens } = useThemeContext();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
      PaperProps={{
        sx: {
          background: tokens.bgGlassStrong,
          backdropFilter: tokens.glassBlur,
          border: `1px solid ${tokens.border}`,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: tokens.text }}
      >
        {title}
        <IconButton onClick={onClose} sx={{ color: tokens.textSecondary }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: tokens.border }}>{children}</DialogContent>

      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}