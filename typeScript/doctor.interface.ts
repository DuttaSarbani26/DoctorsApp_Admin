
  interface Department {
    id: string;
    name: string;
  }

  interface Doctor {
    id: string;
    name: string;
    email: string;
    department: Department;
  }

  interface DoctorState {
    loading: boolean;
    department: Department | null;
    departmentId: any;
    departmentList: Department[];
    doctorList: Doctor[];
    doctorTotal: number;
    error: any;
    appointmentList: Appointment[];
  }
