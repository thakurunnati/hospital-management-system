import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_APPOINTMENT, ADD_BILL } from "../Redux/Constants";
import "../stylesheets/BillGeneration.css";

export default function BillGeneration({ appointment, onClose }) {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);
  const doctors = useSelector((state) => state.doctors);
  const patients = useSelector((state) => state.patients);
  
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const doctor = doctors.find((d) => d.id === appointment.doctorId);
  const patient = patients.find((p) => p.id === appointment.patientId);

  const handleMedicineSelect = (medicineId) => {
    if (selectedMedicines.includes(medicineId)) {
      setSelectedMedicines(selectedMedicines.filter((id) => id !== medicineId));
    } else {
      setSelectedMedicines([...selectedMedicines, medicineId]);
    }
  };

  const calculateTotal = () => {
    let total = doctor?.fee || 0;
    selectedMedicines.forEach((medId) => {
      const medicine = medicines.find((m) => m.id === medId);
      if (medicine) total += medicine.price;
    });
    return total;
  };

  const handleGenerateBill = () => {
    const billData = {
      id: Date.now(),
      appointmentId: appointment.id,
      patientName: patient?.name,
      patientId: appointment.patientId,
      doctorName: doctor?.name,
      doctorId: appointment.doctorId,
      doctorFee: doctor?.fee || 0,
      medicines: selectedMedicines.map((medId) => {
        const medicine = medicines.find((m) => m.id === medId);
        return {
          id: medicine.id,
          name: medicine.name,
          price: medicine.price,
        };
      }),
      totalAmount: calculateTotal(),
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
    };

    dispatch({ type: ADD_BILL, payload: billData });
    dispatch({
      type: UPDATE_APPOINTMENT,
      payload: { ...appointment, visited: true },
    });

    alert("Bill generated successfully!");
    onClose();
  };

  return (
    <div className="bill-generation">
      <div className="bill-modal">
        <div className="bill-header">
          <h2>Generate Bill</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="bill-content">
          <div className="patient-doctor-info">
            <div className="info-block">
              <label>Patient:</label>
              <p>{patient?.name}</p>
            </div>
            <div className="info-block">
              <label>Doctor:</label>
              <p>Dr. {doctor?.name}</p>
            </div>
          </div>

          <div className="bill-section">
            <h3>Doctor Consultation</h3>
            <div className="fee-item">
              <span>{doctor?.name} Consultation</span>
              <span className="price">₹{doctor?.fee}</span>
            </div>
          </div>

          <div className="bill-section">
            <h3>Select Medicines</h3>
            {medicines.length === 0 ? (
              <p className="no-medicines">No medicines available</p>
            ) : (
              <div className="medicines-list">
                {medicines.map((medicine) => (
                  <div key={medicine.id} className="medicine-item">
                    <input
                      type="checkbox"
                      id={`med-${medicine.id}`}
                      checked={selectedMedicines.includes(medicine.id)}
                      onChange={() => handleMedicineSelect(medicine.id)}
                    />
                    <label htmlFor={`med-${medicine.id}`} className="medicine-info">
                      <span className="medicine-name">{medicine.name}</span>
                      <span className="medicine-price">₹{medicine.price}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bill-summary">
            <div className="summary-row">
              <span>Doctor Fee:</span>
              <span>₹{doctor?.fee}</span>
            </div>
            {selectedMedicines.length > 0 && (
              <div className="summary-row">
                <span>Medicines:</span>
                <span>
                  ₹{selectedMedicines.reduce((sum, medId) => {
                    const med = medicines.find((m) => m.id === medId);
                    return sum + (med?.price || 0);
                  }, 0)}
                </span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>

          <div className="bill-actions">
            <button className="btn-generate" onClick={handleGenerateBill}>
              Generate Bill
            </button>
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}