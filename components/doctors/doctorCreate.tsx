






// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { Cookies } from "react-cookie";
// import { doctorCreate, doctorEdit, doctorList, getDepartmentList } from "@/redux/slice/doctorSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faStethoscope, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "sonner";

// const cookie = new Cookies();

// export default function DoctorCreateModal({ setShowModal, editDoctor }: any) {

//     const dispatch = useDispatch();

//     const departmentList = useSelector(
//         (state: any) => state.doctor.departmentList
//     );

//     const [form, setForm] = useState({
//         name: "",
//         fees: "",
//         departmentId: ""
//     });

//     // multiple slots
//     const [slots, setSlots] = useState([
//         { date: "", time: "" }
//     ]);

//     useEffect(() => {
//         dispatch(getDepartmentList());
//     }, [dispatch]);

//     useEffect(() => {

//         if (editDoctor) {

//             setForm({
//                 name: editDoctor.name || "",
//                 specialization: editDoctor.specialization || "",
//                 fees: editDoctor.fees || "",
//                 departmentId: editDoctor.department?._id || ""
//             });

//             if (editDoctor.availableSlots?.length) {

//                 setSlots(
//                     editDoctor.availableSlots.map((slot: any) => ({
//                         date: slot.date.split("T")[0],
//                         time: slot.time
//                     }))
//                 );

//             }

//         } else {

//             // reset form when adding new doctor
//             setForm({
//                 name: "",
//                 fees: "",
//                 departmentId: ""
//             });

//             setSlots([{ date: "", time: "" }]);

//         }

//     }, [editDoctor]);

//     // add slot
//     const addSlot = () => {
//         setSlots([...slots, { date: "", time: "" }]);
//     };

//     // remove slot
//     const removeSlot = (index: number) => {
//         const updated = [...slots];
//         updated.splice(index, 1);
//         setSlots(updated);
//     };

//     // update slot values
//     const handleSlotChange = (index: number, field: string, value: string) => {

//         const updatedSlots = [...slots];
//         updatedSlots[index][field] = value;
//         setSlots(updatedSlots);

//     };

//     const handleDepartment = (e: any) => {

//         const id = e.target.value;

//         setForm({
//             ...form,
//             departmentId: id
//         });

//         cookie.set("departmentId", id, { path: "/" });

//     };

//     const handleSubmit = async () => {

//         const payload = {
//             name: form.name,
//             fees: form.fees,
//             departmentId: form.departmentId,
//             availableSlots: slots
//                 .filter((slot) => slot.date && slot.time)
//                 .map((slot) => ({
//                     date: slot.date,
//                     time: slot.time
//                 }))
//         };

//         try {

//             let res;

//             if (editDoctor) {

//                 res = await dispatch(
//                     doctorEdit({
//                         id: editDoctor._id,
//                         data: payload
//                     })
//                 ).unwrap();

//                 console.log("Doctor update response:", res);
//                 toast.success(res.message)


//             } else {

//                const response = await dispatch(doctorCreate(payload)).unwrap();

//                 console.log("Doctor create response:", response);
                
//                     toast.success(response.message)
                

//             }

//             dispatch(doctorList({ page: 1, limit: 6 }));

//             setShowModal(false);

//         } catch (error) {

//             console.log("Doctor error:", error);

//         }

//     };

//     return (

//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

//             {/* Background Blur */}
//             <div
//                 className="absolute inset-0 bg-blue-900/10 backdrop-blur-md"
//                 onClick={() => setShowModal(false)}
//             />

//             <div className="relative w-full max-w-md">

//                 {/* Glow effect */}
//                 <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200/50 to-indigo-200/30 blur-xl" />

//                 {/* Modal */}
//                 <div className="relative bg-white border border-blue-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

//                     {/* Top gradient */}
//                     <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 sticky top-0" />

//                     {/* Header */}
//                     <div className="px-6 pt-6 pb-4 border-b border-blue-100 bg-white">

//                         <div className="flex items-center justify-between">

//                             <div className="flex items-center gap-3">

//                                 <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30">

//                                     <FontAwesomeIcon icon={faStethoscope} className="text-white text-sm" />

//                                 </div>

//                                 <div>
//                                     <h3 className="text-slate-800 text-[15px] font-semibold">
//                                         {editDoctor ? "Edit Doctor" : "Add New Doctor"}                                    </h3>
//                                     <p className="text-slate-500 text-xs">
//                                         Fill in the doctor's details
//                                     </p>
//                                 </div>

//                             </div>

//                             <button
//                                 onClick={() => setShowModal(false)}
//                                 className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
//                             >
//                                 <FontAwesomeIcon icon={faXmark} />
//                             </button>

//                         </div>

//                     </div>

//                     {/* Form */}
//                     <div className="px-6 py-5 space-y-4">

//                         {/* Doctor Name */}
//                         <div>

//                             <label className="text-slate-500 text-[11px] uppercase tracking-wider block mb-2">
//                                 Doctor Name
//                             </label>

//                             <input
//                                 placeholder="Dr. John Smith"
//                                 value={form.name}
//                                 onChange={(e) =>
//                                     setForm({ ...form, name: e.target.value })
//                                 }
//                                 className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                             />

//                         </div>

//                         {/* Specialization */}
//                         {/* <div>

//                             <label className="text-slate-500 text-[11px] uppercase tracking-wider block mb-2">
//                                 Specialization
//                             </label>

//                             <input
//                                 placeholder="e.g. Cardiologist"
//                                 value={form.specialization}
//                                 onChange={(e) =>
//                                     setForm({ ...form, specialization: e.target.value })
//                                 }
//                                 className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                             />

//                         </div> */}

//                         {/* Fees */}
//                         <div>

//                             <label className="text-slate-500 text-[11px] uppercase tracking-wider block mb-2">
//                                 Consultation Fees
//                             </label>

//                             <input
//                                 placeholder="e.g. 1500"
//                                 value={form.fees}
//                                 onChange={(e) =>
//                                     setForm({ ...form, fees: e.target.value })
//                                 }
//                                 className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                             />

//                         </div>

//                         {/* Department */}
//                         <div>

//                             <label className="text-slate-500 text-[11px] uppercase tracking-wider block mb-2">
//                                 Department
//                             </label>

//                             <select
//                                 value={form.departmentId}
//                                 onChange={handleDepartment}
//                                 className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                             >

//                                 <option>Select Department</option>

//                                 {departmentList?.map((dep: any) => (
//                                     <option key={dep._id} value={dep._id}>
//                                         {dep.name}
//                                     </option>
//                                 ))}

//                             </select>

//                         </div>

//                         {/* Slots */}

//                         <div>

//                             <label className="text-slate-500 text-[11px] uppercase tracking-wider block mb-2">
//                                 Available Slots
//                             </label>

//                             {slots.map((slot, index) => (

//                                 <div key={index} className="flex gap-2 mb-2">

//                                     <input
//                                         type="date"
//                                         value={slot.date}
//                                         onChange={(e) =>
//                                             handleSlotChange(index, "date", e.target.value)
//                                         }
//                                         className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-3 py-2 text-sm"
//                                     />

//                                     <input
//                                         type="time"
//                                         value={slot.time}
//                                         onChange={(e) =>
//                                             handleSlotChange(index, "time", e.target.value)
//                                         }
//                                         className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-3 py-2 text-sm"
//                                     />

//                                     {slots.length > 1 && (

//                                         <button
//                                             onClick={() => removeSlot(index)}
//                                             className="text-red-500 px-2"
//                                         >
//                                             <FontAwesomeIcon icon={faXmark} />
//                                         </button>

//                                     )}

//                                 </div>

//                             ))}

//                             <button
//                                 onClick={addSlot}
//                                 className="text-blue-600 text-sm mt-1 flex items-center gap-1"
//                             >
//                                 <FontAwesomeIcon icon={faPlus} />
//                                 Add Slot
//                             </button>

//                         </div>

//                     </div>

//                     {/* Footer */}
//                     <div className="px-6 pb-6 flex gap-3">

//                         <button
//                             onClick={() => setShowModal(false)}
//                             className="flex-1 py-2.5 rounded-2xl border border-blue-300 text-slate-600 text-sm hover:border-blue-400"
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             onClick={handleSubmit}
//                             className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
//                         >
//                             <FontAwesomeIcon icon={faPlus} />
//                             {editDoctor ? "Edit Doctor" : "Add New Doctor"}
//                         </button>

//                     </div>

//                 </div>

//             </div>

//         </div>

//     );

// }


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
  // resetForm,
  editDoctor,
  department,
}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { tokens } = useThemeContext();

  const departmentList = useSelector(
    (state: any) => state.doctor.departmentList
  );

  const [form, setForm] = useState({
    name: "",
    fees: "",
    departmentId: "",
  });

  // const [slots, setSlots] = useState([{ date: "", time: "" }]);
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

  // get departments
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
          })
        ).unwrap();

        toast.success(res.message);
      } else {
        const res = await dispatch(doctorCreate(payload)).unwrap();
        toast.success(res.message);
      }

      // Refetch with page 1 to see the newly created doctor
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
          <Button onClick={onClose} variant="outlined" sx={{ borderColor: tokens.border, color: tokens.textSecondary, "&:hover": { borderColor: tokens.textMuted } }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
              "&:hover": { background: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)" },
            }}
          >
            {editDoctor ? "Update" : "Create"}
          </Button>
        </>
      }
    >
      <Box display="flex" flexDirection="column" gap={2} sx={{
        "& .MuiOutlinedInput-root": {
          color: tokens.text,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: tokens.inputBorder },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: tokens.accent },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: tokens.accent },
        },
        "& .MuiInputLabel-root": { color: tokens.textSecondary },
        "& .MuiInputLabel-root.Mui-focused": { color: tokens.accentLight },
        "& .MuiSvgIcon-root": { color: tokens.textSecondary },
      }}>
        {/* Name */}
        <TextField
          label="Doctor Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          fullWidth
        />

        {/* Fees */}
        <TextField
          label="Consultation Fees"
          value={form.fees}
          onChange={(e) =>
            setForm({ ...form, fees: e.target.value })
          }
          fullWidth
        />

        {/* Department */}
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

        {/* Slots */}
        {/* <Box>
          <Typography variant="subtitle2" mb={1} color={tokens.text}>
            Schedule
          </Typography>

          {slots.map((slot, index) => (
            <Stack direction="row" spacing={1} key={index} mb={1}>
              <TextField
                type="date"
                value={slot.date}
                onChange={(e) =>
                  handleSlotChange(index, "date", e.target.value)
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                type="time"
                value={slot.time}
                onChange={(e) =>
                  handleSlotChange(index, "time", e.target.value)
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              {slots.length > 1 && (
                <IconButton
                  color="error"
                  onClick={() => removeSlot(index)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Stack>
          ))}

          <Button startIcon={<AddIcon />} onClick={addSlot} sx={{ color: tokens.accentLight }}>
            Add Slot
          </Button>
        </Box> */}


        {/* Schedule */}
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