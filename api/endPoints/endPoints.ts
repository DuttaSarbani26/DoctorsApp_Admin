import { appointmentList } from "@/redux/slice/doctorSlice"
import { create } from "domain"

export const endPoints = {
    auth:{
        signIn: `/admin/auth/login`,
        logOut: `/admin/logout`,
    },
    doctor: {
        department: `/admin/doctor/department`,
        departmentList: `/admin/departments/list`,
        doctorCreate:`/admin/doctor/create`,
        departmentDelete: `/admin/department/delete`,
        doctorList:`/admin/doctor/list`,
        doctorEdit:`/admin/doctor/update`,
        doctorDelete:`/admin/doctor/delete`,
        departmentWiseDoctor:`/admin/departments/:departmentId/doctors`,
        appointmentList: `/admin/doctor/appointment/list`,
        confirmAppointment: `/admin/doctor/appointment/:id`,
        rejectAppointment: `/admin/doctor/appointment/cancelld/:id`,
        appointmentAcceptList: `/admin/appointment/acceptedlist`,
    },
    diagnostics: {
        createCenter: `/admin/diagnostic/create`,

    }
}

export const points = [
    endPoints.auth.signIn,
    endPoints.doctor.department,
    endPoints.doctor.departmentList,
    endPoints.doctor.doctorCreate,
    endPoints.doctor.departmentDelete,
    endPoints.doctor.doctorList,
    endPoints.doctor.doctorEdit,
    endPoints.doctor.doctorDelete,
    endPoints.doctor.departmentWiseDoctor,
    endPoints.doctor.appointmentList,
    endPoints.doctor.confirmAppointment,
    endPoints.doctor.rejectAppointment,
    endPoints.doctor.appointmentAcceptList,
    endPoints.diagnostics.createCenter,

]