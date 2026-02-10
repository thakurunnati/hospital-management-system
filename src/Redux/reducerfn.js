import { ADD_PATIENT, DELETE_PATIENT, ADD_APPOINTMENT, DELETE_APPOINTMENT, UPDATE_APPOINTMENT, ADD_DOCTOR, DELETE_DOCTOR, ADD_MEDICINE, DELETE_MEDICINE, UPDATE_MEDICINE, ADD_BILL, DELETE_BILL, PURCHASE_MEDICINE, ADD_PURCHASE_HISTORY } from "./Constants";
import { initialState } from "./initialState";

export default  function reducerfn(state=initialState,action){
switch(action.type){

case ADD_PATIENT:
      const added = [...state.patients, action.payload];
      localStorage.setItem("patients", JSON.stringify(added));
      return { ...state, patients: added };

    case DELETE_PATIENT:
      const filteredPatients = state.patients.filter((p) => p.id !== action.payload);
      const filteredAppointmentsByPatient = state.appointments.filter((a) => a.patientId !== action.payload);
      localStorage.setItem("patients", JSON.stringify(filteredPatients));
      localStorage.setItem("appointments", JSON.stringify(filteredAppointmentsByPatient));
      return { ...state, patients: filteredPatients, appointments: filteredAppointmentsByPatient };

    case ADD_APPOINTMENT:
      const appointmentAdded = [...state.appointments, action.payload];
      localStorage.setItem("appointments", JSON.stringify(appointmentAdded));
      return { ...state, appointments: appointmentAdded };

    case DELETE_APPOINTMENT:
      const appointmentFiltered = state.appointments.filter((a) => a.id !== action.payload);
      localStorage.setItem("appointments", JSON.stringify(appointmentFiltered));
      return { ...state, appointments: appointmentFiltered };

    case UPDATE_APPOINTMENT:
      const updatedAppointments = state.appointments.map((a) => 
        a.id === action.payload.id ? action.payload : a
      );
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      return { ...state, appointments: updatedAppointments };

    case ADD_DOCTOR:
      const doctorAdded = [...state.doctors, action.payload];
      localStorage.setItem("doctors", JSON.stringify(doctorAdded));
      return { ...state, doctors: doctorAdded };

    case DELETE_DOCTOR:
      const doctorFiltered = state.doctors.filter((d) => d.id !== action.payload);
      localStorage.setItem("doctors", JSON.stringify(doctorFiltered));
      return { ...state, doctors: doctorFiltered };

    case ADD_MEDICINE:
      const medicineAdded = [...state.medicines, action.payload];
      localStorage.setItem("medicines", JSON.stringify(medicineAdded));
      return { ...state, medicines: medicineAdded };

    case DELETE_MEDICINE:
      const medicineFiltered = state.medicines.filter((m) => m.id !== action.payload);
      localStorage.setItem("medicines", JSON.stringify(medicineFiltered));
      return { ...state, medicines: medicineFiltered };

    case ADD_BILL:
      const billAdded = [...state.bills, action.payload];
      localStorage.setItem("bills", JSON.stringify(billAdded));
      return { ...state, bills: billAdded };

    case DELETE_BILL:
      const billFiltered = state.bills.filter((b) => b.id !== action.payload);
      localStorage.setItem("bills", JSON.stringify(billFiltered));
      return { ...state, bills: billFiltered };

    case UPDATE_MEDICINE:
      const updatedMedicines = state.medicines.map((m) =>
        m.id === action.payload.id ? action.payload : m
      );
      localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
      return { ...state, medicines: updatedMedicines };

    case ADD_PURCHASE_HISTORY:
      const historyAdded = [...state.purchaseHistory, action.payload];
      localStorage.setItem("purchaseHistory", JSON.stringify(historyAdded));
      return { ...state, purchaseHistory: historyAdded };
      
    default:
      return state;
}
 }