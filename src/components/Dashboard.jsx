import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import DoctorForm from "./DoctorForm";
import DoctorList from "./DoctorList";
import MedicineForm from "./MedicineForm";
import MedicineList from "./MedicineList";
import MedicineShop from "./MedicineShop";
import PurchaseHistory from "./PurchaseHistory";
import Inventory from "./Inventory";

export default function Dashboard({ activeModule }) {
  if (activeModule === "patients") {
    return (
      <div className="dashboard">
        <PatientForm />
        <PatientList />
      </div>
    );
  }
   if (activeModule === "appointments") {
     return (
       <div className="dashboard">
        <AppointmentForm/>
        <AppointmentList/>
       </div>
     );
   }
    if (activeModule === "doctors") {
     return (
       <div className="dashboard">
        <DoctorForm/>
        <DoctorList/>
       </div>
     );
    }

    if (activeModule === "inventory") {
      return (
       <div className="dashboard">
         <MedicineForm/>
         <MedicineList/>
         </div>
     );
    }
    if (activeModule === "medicine-shop") {
      return (
       <div className="dashboard">
         <MedicineShop/>
         </div>
     );
    }
    if (activeModule === "purchase-history") {
      return (
       <div className="dashboard">
         <PurchaseHistory/>
         </div>
     );
    }
   
}