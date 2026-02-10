import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_MEDICINE } from "../Redux/Constants";
import "../stylesheets/MedicineList.css";

export default function MedicineList() {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);

  const handleDelete = (id) => {
    dispatch({ type: DELETE_MEDICINE, payload: id });
  };

  return (
    <div className="medicine-list">
      <h2>Medicines Inventory</h2>
      {medicines.length === 0 ? (
        <p>No medicines in inventory</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.manufacturer}</td>
                <td>₹{medicine.price}</td>
                <td>
                  <span className={`quantity-badge ${medicine.quantity <= 5 ? 'low' : ''}`}>
                    {medicine.quantity}
                  </span>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(medicine.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}