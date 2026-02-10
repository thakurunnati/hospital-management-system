import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPatient } from '../Redux/actions';
import "../stylesheets/PatientForm.css";

export default function PatientForm() {
 const dispatch= useDispatch();
const[form, setForm]= useState({name: "", age:"", gender: ""});

const handleSubmit= (e)=>{
e.preventDefault();
dispatch(addPatient({id: Date.now(), ...form}));
setForm({name:"", age:"", gender:""});
};
  return (
    <form className='patient-form' onSubmit={handleSubmit}>
<input 
    type="text" 
    placeholder='Name' 
    value={form.name} 
    onChange={(e)=>setForm({...form, name:e.target.value})} 
    required
    />
<input
   type="number"
   placeholder='age'
   value={form.age}
   onChange={(e)=>setForm({...form, age: e.target.value})}
   required
   />
<select 
   value={form.gender}
   onChange={(e)=> setForm({...form, gender: e.target.value})}
   >
<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
   </select>
   <button type='submit'>Add Patient</button>
    </form>
    
   
  );
}
