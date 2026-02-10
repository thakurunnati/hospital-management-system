import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_APPOINTMENT } from "../Redux/Constants";
import BillGeneration from "./BillGeneration";
import "../stylesheets/AppointmentList.css";

export default function AppointmentList({ doctorFilter = null }) {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);
  const patients = useSelector((state) => state.patients);
  const doctors = useSelector((state) => state.doctors);
  const [cancelConfirm, setCancelConfirm] = useState(null);
  const [billAppointment, setBillAppointment] = useState(null);

  const filteredAppointments = doctorFilter
    ? appointments.filter((apt) => apt.doctorId === doctorFilter)
    : appointments;

  const handleCancel = (id) => {
    dispatch({ type: DELETE_APPOINTMENT, payload: id });
    setCancelConfirm(null);
    alert("Appointment cancelled successfully!");
  };

  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? patient.name : "Unknown"; // fallbacks 
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    return doctor ? doctor.name : "Unknown";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="appointment-list">
      <h2>
        {doctorFilter ? "Doctor's Appointments" : "All Appointments"}
      </h2>

      {filteredAppointments.length === 0 ? (
        <p className="no-data">
          {doctorFilter ? "No appointments for this doctor" : "No appointments booked yet"}
        </p>
      ) : (
        <div className="appointment-cards">
          {filteredAppointments.map((apt) => (
            <div key={apt.id} className="appointment-card">
              <div className="card-header">
                <div className="patient-doctor">
                  <div className="info-group">
                    <label>Patient</label>
                    <p>{getPatientName(apt.patientId)}</p>
                  </div>
                  <div className="info-group">
                    <label>Doctor</label>
                    <p>Dr. {getDoctorName(apt.doctorId)}</p>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="appointment-details">
                  <div className="detail-item">
                    <span className="label">Date:</span>
                    <span className="value">{formatDate(apt.date)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Time:</span>
                    <span className="value">{apt.time}</span>
                  </div>
                  <div className="detail-item full-width">
                    <span className="label">Reason:</span>
                    <span className="value">{apt.reason}</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                {cancelConfirm === apt.id ? (
                  <div className="confirm-cancel">
                    <p>Are you sure?</p>
                    <button
                      className="btn-confirm"
                      onClick={() => handleCancel(apt.id)}
                    >
                      Yes, Cancel
                    </button>
                    <button
                      className="btn-cancel-confirm"
                      onClick={() => setCancelConfirm(null)}
                    >
                      No, Keep
                    </button>
                  </div>
                ) : (
                  <div className="action-buttons">
                    {!apt.visited ? (
                      <button
                        className="btn-generate-bill"
                        onClick={() => setBillAppointment(apt)}
                      >
                        Generate Bill
                      </button>
                    ) : (
                      <span className="visited-badge">✓ Visited</span>
                    )}
                    <button
                      className="btn-delete"
                      onClick={() => setCancelConfirm(apt.id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {billAppointment && (
        <BillGeneration
          appointment={billAppointment}
          onClose={() => setBillAppointment(null)}
        />
      )}
    </div>
  );
}