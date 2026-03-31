
  interface Appointment {
    id: string;
    patientName: string;
    doctorId: string;
    date: string;
    status: string;
  }

  interface AppointmentState {
    loading: boolean;
    appointmentList: Appointment[];
    appointmentAcceptList: Appointment[];
    error: any;
  }
