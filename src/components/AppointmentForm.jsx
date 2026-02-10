import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_APPOINTMENT } from '../Redux/Constants';
import '../stylesheets/AppointmentForm.css'
export default function AppointmentForm() {
const dispatch=  useDispatch();
const patients=  useSelector((state) => state.patients);
const doctors=  useSelector((state) => state.doctors);
const appointments=  useSelector((state) => state.appointments);

const [form, setForm]= useState({
  patientId:"",
  patientName:"",
  doctorId:"",
  doctorName:"",
  date:"",
  time:"",
  reason:"",
});

const[error, setError]=useState("")
const handlePatientChange = (e) =>{
  const patientId= e.target.value;
  const patient= patients.find((p) => p.id.toString() === patientId );
  setForm({
    ...form,
    patientId,
    patientName: patient? patient.name : "",
  });
};

const handleDoctorChange =(e)=>{
const doctorId= e.target.value;
const doctor = doctors.find((d) => d.id.toString() === doctorId);
setForm({
  ...form,
  doctorId,
  doctorName: doctor ? doctor.name : "",
});
setError("");
};

const isSlotBooked = ()=>{
return appointments.some(
  (apt) => apt.doctorId === form.doctorId &&
          apt.date === form.date &&
          apt.time === form.time
);
};

const handleSubmit = (e) =>{
  e.preventDefault();

  if(!form.patientId) {
    setError("please select a patient");
    return;
  }
  if(!form.doctorId){
    setError("please select a doctor");
    return;
  }

  if(!form.date || form.time){
    setError("please select date and time");
    return;
  }
  if(isSlotBooked()){
    setError(`Dr. ${form.doctorName} is not available at ${form.time} on ${form.date}`)
    return;
  }

  dispatch({
    type: ADD_APPOINTMENT,
    payload: {id: Date.now(), ...form}
  });
  
  setForm({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    date: "",
    time: "",
    reason: "",
});
setError("");
alert("Appointment booked successfully!");
};
  return (
    <form className='appointment-form' onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>

      {error && <div className='error-message'>{error}</div>}

<div className='form-group'> 
  <label>Select Patient</label>
  <select value={form.patientId}
  onChange={handlePatientChange}
  required
  >
    <option value="">--select Patient--</option>
    {patients.map((patient) => (
      <option key={patient.id} value= {patient.id}>
        {patient.name} (Age: (patient.age))
      </option>
    )) }
  </select>
</div>

<div className='form-group'>
  <label>select doctor</label>
  <select 
  value={form.doctorId}
  onChange={handleDoctorChange}
  required
  >
<option value="">--select Doctor</option>
{doctors.map((doctor)=> (
  <option key={doctor.id} value={doctor.id}>
    Dr.{doctor.name} ({doctor.speciality})
  </option>
))}
  </select>
</div>

<div className='form-group'>
  <label>Appointment Date</label>
  <input 
  type='date'
  value={form.date}
  onChange={(e)=>{
    setForm({...form, date: e.target.value})
    setError("")
  }}
  required
  />
</div>
<div className='form-group'>
  <label> Appointment Time</label>
  <input type="time"
  value={form.time}
  onChange={(e)=>{
 setForm({...form, time:e.target.value})
 setError("")
  }}
  required
  />
</div>

<div className='form-group'> 
  <label>Reason for Appointment</label>
  <textarea 
  placeholder='reason for appointment'
  value={form.reason}
  onChange={(e) => ({...form, reason: e.target.value})}
  rows='3'
  required
  >
</textarea>
</div>

    </form>
  );
}
