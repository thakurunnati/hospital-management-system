import React from 'react'
import "../stylesheets/Sidebar.css" 
export default function Sidebar({setActiveModule}) {
  return (
    <div className='sidebar'>   
      <button onClick={() => setActiveModule("patients")}>Patients</button>
      <button onClick={() => setActiveModule("appointments")}>Appointments</button>
      <button onClick={() => setActiveModule("doctors")}>Doctors</button>
      <button onClick={() => setActiveModule("inventory")}>Inventory</button>
      <button onClick={() => setActiveModule("medicine-shop")}>Buy Medicine</button>
      <button onClick={() => setActiveModule("purchase-history")}>Purchase History</button>
      </div>
  )
}