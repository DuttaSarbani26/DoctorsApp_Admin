"use client";

import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DepartmentCreate from "../doctorsDepartment/department";
import { useThemeContext } from "@/context/ThemeContext";


export default function CreateDepartmentModal({ open, handleClose }: { open: boolean; handleClose: () => void }) {
  const { tokens } = useThemeContext();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          background: tokens.bgGlassStrong,
          backdropFilter: tokens.glassBlur,
          border: `1px solid ${tokens.border}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          color: tokens.text,
        }}
      >
        Create Department

        <IconButton onClick={handleClose} sx={{ color: tokens.textSecondary }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <DepartmentCreate closeModal={handleClose} />
      </DialogContent>
    </Dialog>
  );
}