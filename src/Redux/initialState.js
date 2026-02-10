export const initialState={
  patients: JSON.parse(localStorage.getItem("patients")) || [],
  appointments: JSON.parse(localStorage.getItem("appointments")) || [],
  doctors: JSON.parse(localStorage.getItem("doctors")) || [],
  medicines: JSON.parse(localStorage.getItem("medicines")) || [],
  bills: JSON.parse(localStorage.getItem("bills")) || [],
  purchaseHistory: JSON.parse(localStorage.getItem("purchaseHistory")) || [],
}