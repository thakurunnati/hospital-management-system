import {ADD_PATIENT, DELETE_PATIENT} from "./Constants"

export const addPatient= (patient)=> ({
    type: ADD_PATIENT,
    payload: patient,
});

export const deletePatient = (id) =>({
    type: DELETE_PATIENT,
    payload: id
})